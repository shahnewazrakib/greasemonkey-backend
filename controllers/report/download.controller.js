import puppeteer from "puppeteer";
import { reportTemplate } from "../../template/report.js";
import { footer } from "../../template/footer.js";
import { header } from "../../template/header.js";
import { hasPermission } from "../../lib/permission.js";
import { Report } from "../../models/report.js";
import moment from "moment";
import _ from "lodash";
import {
  conditionalParts,
  HISTORY_CHECKS,
  partsLookup,
  weights,
} from "../../utils/constant.js";

const generateStars = (rating) => {
  const fullStar = `<i class="fa-solid fa-star"></i>`;
  const halfStar = `<i class="fa-solid fa-star-half-stroke"></i>`;
  const emptyStar = `<i class="fa-regular fa-star"></i>`;
  const fullStarsCount = Math.floor(rating);
  const halfStarsCount = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStarsCount = 5 - fullStarsCount - halfStarsCount;
  return (
    fullStar.repeat(fullStarsCount) +
    halfStar.repeat(halfStarsCount) +
    emptyStar.repeat(emptyStarsCount)
  );
};

const calculateAvgRating = (dataObject) => {
  const ratings = Object.entries(dataObject)
    .filter(([key, value]) => {
      if (conditionalParts.includes(key) && !value.isAvailable) return false;
      return true;
    })
    .map(([key, value]) => value?.rating);

  return parseFloat(
    (ratings.reduce((sum, val) => sum + val, 0) / ratings.length).toFixed(1)
  );
};

const calculateOverallRating = (components) => {
  // Create an object with avrage ratings for each component
  const avgRatings = components.reduce((acc, component) => {
    acc[component.key] = component.avgRating;
    return acc;
  }, {});
  const weightedSum = Object.entries(weights).reduce((sum, [key, weight]) => {
    const r = avgRatings[key] ?? 0;
    return sum + r * weight;
  }, 0);

  // Step 2: Apply critical component penalties
  let penalty = 0;
  const criticalComponents = ["engine", "brake", "gearbox"];
  criticalComponents.forEach((component) => {
    const r = avgRatings[component] ?? 0;
    if (r < 3) {
      penalty += (3 - r) * 0.6;
    } else if (r < 4) {
      penalty += (4 - r) * 0.3;
    }
  });

  // Step 3: Apply penalty
  const penalizedRating = Math.max(0, weightedSum - penalty);

  // Step 4: Cap overall rating based on lowest critical component
  const lowestCriticalRating = Math.min(
    ...criticalComponents.map((comp) => avgRatings[comp] ?? 0)
  );

  // Overall rating cannot exceed lowest critical component by more than 1 point
  const cappedRating = Math.min(penalizedRating, lowestCriticalRating + 1);

  // Ensure rating stays within 0-5 bounds
  return Math.max(0, Math.min(5, cappedRating));
};

const generateInspectionResults = (components) => {
  return components
    .map((component) => {
      return `<div class="component" id="${component.key}">
              <div class="title-bar">
                <h5 class="heading-3 clear-margin">${component.title}</h5>
                <h5 class="heading-3 clear-margin">
                  Avg Rating ${
                    component.avgRating
                  } <i class="fa-solid fa-star"></i>
                </h5>
              </div>

            ${Object.entries(component.data)
              .map(([key, value]) => {
                const isConditionalPart = conditionalParts.includes(key);
                return `<div class="parts">
                <p class="paragraph"><strong>${partsLookup[key]}</strong></p>
                <div class="rating">
                  ${
                    isConditionalPart && !value.isAvailable
                      ? ""
                      : `<div class="stars">${generateStars(value.rating)}</div>
                      <p class="paragraph"><strong>${value.rating}</strong></p>`
                  }
                </div>

                ${
                  isConditionalPart && !value.isAvailable
                    ? "<p class='paragraph'>N/A</p>"
                    : `<p class="paragraph">${value.comment}</p>`
                }
                
              ${
                isConditionalPart && !value.isAvailable
                  ? ""
                  : value.photos && value.photos.length > 0
                  ? `<div class="images">
                  ${value.photos
                    .map((photo) => {
                      return `<img src="${photo}"/>`;
                    })
                    .join("")}
                </div>`
                  : ""
              }
            </div>`;
              })
              .join("")}
          </div>`;
    })
    .join("");
};

const getCriticalParts = (components) => {
  const poorParts = [];

  components.forEach((component) => {
    Object.entries(component.data).forEach(([key, value]) => {
      // Skip conditional parts that are not available
      if (conditionalParts.includes(key) && !value.isAvailable) {
        return;
      }

      if (value.rating < 3) {
        poorParts.push({
          partName: partsLookup[key] || key,
          rating: value.rating,
          comment: value.comment,
          photos: value.photos || [],
        });
      }
    });
  });

  return poorParts;
};

export const downloadReport = async (req, res) => {
  let browser = null;

  try {
    const { reportId } = req.params;
    const user = req.user;

    if (!hasPermission(user, "read:report")) {
      return res
        .status(403)
        .json({ message: "You don't have permission to read report" });
    }

    const report = await Report.findById(reportId)
      .select("-_id -__v -createdAt -updatedAt")
      .populate("assignedTo", "name profilePhoto")
      .lean();

    if (!report) {
      return res.status(404).json({ message: "Report doesn't exist" });
    }

    if (
      user.role === "inspector" &&
      report.assignedTo._id.toString() !== user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You don't have permission to read this report" });
    }

    const components = [
      {
        key: "engine",
        title: "Engine",
        data: {
          ..._.omit(report.engine, ["fuelType"]),
        },
        avgRating: calculateAvgRating({
          ..._.omit(report.engine, ["fuelType"]),
        }),
      },
      {
        key: "fluid",
        title: "Fluids",
        data: report.fluid,
        avgRating: calculateAvgRating(report.fluid),
      },
      {
        key: "gearbox",
        title: "Transmission",
        data: {
          ..._.omit(report.gearbox, ["transmissionType"]),
        },
        avgRating: calculateAvgRating({
          ..._.omit(report.gearbox, ["transmissionType"]),
        }),
      },
      {
        key: "differential",
        title: "Differential",
        data: report.differential,
        avgRating: calculateAvgRating(report.differential),
      },
      {
        key: "suspension",
        title: "Suspension",
        data: report.suspension,
        avgRating: calculateAvgRating(report.suspension),
      },
      {
        key: "brake",
        title: "Brakes",
        data: report.brake,
        avgRating: calculateAvgRating(report.brake),
      },
      {
        key: "tyre",
        title: "Tyres & Wheels",
        data: report.tyre,
        avgRating: calculateAvgRating(report.tyre),
      },
      {
        key: "exhaust",
        title: "Exhaust",
        data: report.exhaust,
        avgRating: calculateAvgRating(report.exhaust),
      },
      {
        key: "light",
        title: "Lights & Electrical",
        data: report.light,
        avgRating: calculateAvgRating(report.light),
      },
      {
        key: "interior",
        title: "Interior",
        data: report.interior,
        avgRating: calculateAvgRating(report.interior),
      },
      {
        key: "exterior",
        title: "Exterior Components",
        data: report.exterior,
        avgRating: calculateAvgRating(report.exterior),
      },
      {
        key: "chassis",
        title: "Chassis & Body",
        data: report.chassis,
        avgRating: calculateAvgRating(report.chassis),
      },
    ];

    // Prepare the template
    let reportHtmlTemplate = reportTemplate
      .replace("{{make}}", report.vehicle.make || "N/A")
      .replace("{{model}}", report.vehicle.model || "N/A")
      .replace("{{year}}", report.vehicle.modelYear || "N/A")
      .replace("{{vin}}", report.vehicle.vin || "N/A")
      .replace(
        "{{odometer}}",
        report.odometer ? `${report.odometer.toLocaleString()} Km` : "N/A"
      )
      .replace("{{transmission}}", report.gearbox.transmissionType || "N/A")
      .replace("{{fuelType}}", report.engine.fuelType || "N/A")
      .replace(
        "{{inspectionDate}}",
        report.inspectionDate
          ? moment(report.inspectionDate).format("Do MMMM, YYYY")
          : "N/A"
      );

    const exteriorImages = `<div class="exterior-images">
      ${report.vehicle.featuredPhotos.map((photo) => `<img src="${photo}"/>`).join("")}
    </div>`;

    reportHtmlTemplate = reportHtmlTemplate.replace(
      "{{exteriorImages}}",
      report.vehicle.featuredPhotos.length > 0 ? exteriorImages : ""
    );

    const historySnapshot = `<div class="components">
    ${HISTORY_CHECKS.map((check) => {
      const historyData = report.history?.[check.key];

      // Special logic for serviceCheck - reverse the success/error mapping
      const isServiceCheck = check.key === "serviceCheck";

      // Determine paragraph class
      let paragraphClass;
      if (isServiceCheck) {
        paragraphClass =
          historyData.status === "yes"
            ? "success-text"
            : historyData.status === "no"
            ? "error-text"
            : "default-text";
      } else {
        paragraphClass =
          historyData.status === "yes"
            ? "error-text"
            : historyData.status === "no"
            ? "success-text"
            : "default-text";
      }

      // Determine badge class
      let badgeClass;
      if (isServiceCheck) {
        badgeClass =
          historyData.status === "yes"
            ? "success"
            : historyData.status === "no"
            ? "error"
            : "default";
      } else {
        badgeClass =
          historyData.status === "yes"
            ? "error"
            : historyData.status === "no"
            ? "success"
            : "default";
      }

      return `<div class="card">
            <div class="inner-card">
              <div class="icon">
                ${check.icon}
              </div>
              <div>
                <h5 class="heading-3 clear-margin">${check.label}</h5>
                <p class="paragraph ${paragraphClass}">
                  ${
                    historyData.status === "yes"
                      ? check.yesMessage
                      : historyData.status === "no"
                      ? check.noMessage
                      : check.unknownMessage
                  }
                </p>
                ${
                  historyData.status === "yes" &&
                  (historyData.comment || historyData.photos.length > 0)
                    ? `<a href="#${check.key}">View more</a>`
                    : ""
                }
              </div>
            </div>
            <div class="badge ${badgeClass}">${
        historyData.status === "yes"
          ? "Yes"
          : historyData.status === "no"
          ? "No"
          : "N/A"
      }</div>
          </div>`;
    }).join("")}
    </div>`;

    reportHtmlTemplate = reportHtmlTemplate.replace(
      "{{historySnapshot}}",
      historySnapshot
    );

    const overallRating = calculateOverallRating(components);
    const overallRatingStars = generateStars(overallRating);

    reportHtmlTemplate = reportHtmlTemplate
      .replace("{{overallRating}}", overallRating.toFixed(1))
      .replace("{{overallRatingStars}}", overallRatingStars);

    reportHtmlTemplate = reportHtmlTemplate
      .replace(
        "{{componentsRatings}}",
        components
          .map((component) => {
            return `<div class="card">
            <div class="title-bar">
              <h5 class="heading-3 clear-margin">${component.title}</h5>
              <h5 class="heading-3 clear-margin">${component.avgRating}</h5>
            </div>
            <div class="stars">
              ${generateStars(component.avgRating)}
            </div>
            <p class="paragraph">
              <a href="#${component.key}">View more</a>
            </p>
          </div>`;
          })
          .join("")
      )

    reportHtmlTemplate = reportHtmlTemplate
      .replace("{{inspectorComment}}", report.inspectorComment || "")
      .replace("{{inspectorName}}", report.assignedTo.name || "N/A")
      .replace(
        "{{inspectorAvatar}}",
        report.assignedTo.profilePhoto
          ? `<img src="${report.assignedTo.profilePhoto}" class="avatar" />`
          : '<img src="https://report.rideinspect.com.au/inspector.png"/>'
      );

    const criticalParts = getCriticalParts(components);
    reportHtmlTemplate = reportHtmlTemplate.replace(
      "{{poorParts}}",
      criticalParts.length > 0
        ? `<div class="page-break poor-parts">
          <h4 class="section-title">Attention Needed</h4>
          
          <div class="components">
            ${criticalParts
              .map((part) => {
                return `<div class="parts">
                <p class="paragraph"><strong>${part.partName}</strong></p>
                <div class="rating">
                  <div class="stars">
                    ${generateStars(part.rating)}
                  </div>
                  <p class="paragraph"><strong>${part.rating}</strong></p>
                </div>
                <p class="paragraph">${part.comment}</p>
                ${
                  part.photos && part.photos.length > 0
                    ? `<div class="images">
                        ${part.photos
                          .map((photo) => {
                            return `<img src="${photo}" alt="" />`;
                          })
                          .join("")}
                      </div>`
                    : ""
                }
              </div>`;
              })
              .join("")}
          </div>
        </div>`
        : ""
    );

    reportHtmlTemplate = reportHtmlTemplate.replace(
      "{{inspectionResults}}",
      generateInspectionResults(components)
    );

    const filteredHistoryChecks = HISTORY_CHECKS.filter((check) => {
      const historyData = report?.history?.[check.key];
      return (
        historyData?.status === "yes" &&
        (historyData?.comment || historyData.photos.length > 0)
      );
    });

    reportHtmlTemplate = reportHtmlTemplate.replace(
      "{{vehicleHistoryDetails}}",
      filteredHistoryChecks.length > 0
        ? `<div class="page-break history-details">
          <h4 class="section-title">Vehicle History Details</h4>
          
          <div class="components">
            ${filteredHistoryChecks
              .map((historyItem) => {
                const historyData = report.history[historyItem.key];
                const isServiceCheck = historyItem.key === "serviceCheck";

                // Determine badge class with reversed logic for serviceCheck
                const badgeClass = isServiceCheck
                  ? historyData?.status === "yes"
                    ? "success"
                    : historyData?.status === "no"
                    ? "error"
                    : "default"
                  : historyData?.status === "yes"
                  ? "error"
                  : historyData?.status === "no"
                  ? "success"
                  : "default";

                const badgeLabel =
                  historyData?.status === "yes"
                    ? "Yes"
                    : historyData?.status === "no"
                    ? "No"
                    : "N/A";

                return `<div class="card" id="${historyItem.key}">
                  <div class="title-bar">
                    <div class="title">
                      ${historyItem.icon}
                      <h5 class="heading-3 clear-margin">${
                        historyItem.label
                      }</h5>
                    </div>
                    <div class="badge ${badgeClass}">${badgeLabel}</div>
                  </div>

                  <div class="details">
                    <div>
                      <p class="paragraph"><strong>Status:</strong></p>
                      <p class="paragraph">
                        ${
                          historyData.status === "yes"
                            ? historyItem.yesMessage
                            : historyData.status === "no"
                            ? historyItem.noMessage
                            : historyItem.unknownMessage
                        }
                      </p>
                    </div>

                    ${
                      historyData.comment
                        ? `<div>
                      <p class="paragraph"><strong>Comment:</strong></p>
                      <p class="paragraph">${historyData.comment}</p>
                    </div>`
                        : ""
                    }
                  </div>

                  ${
                    historyData.photos && historyData.photos.length > 0
                      ? `<div class="images">
                        ${historyData.photos
                          .map((photo) => {
                            return `<img src="${photo}" />`;
                          })
                          .join("")}
                      </div>`
                      : ""
                  }
                </div>`;
              })
              .join("")}
          </div>
          <p class="disclaimer-paragraph">
            Information is sourced from the PPSR, third-party databases,
            diagnostic tools, and available service records at the time of
            inspection. Company uses advanced equipment to assess the
            vehicle, where applicable, at the time of inspection. While every
            effort is made, we do not guarantee the accuracy, completeness, or
            future condition of the vehicle.
          </p>
        </div>`
        : ""
    );

    // Launch puppeteer
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: "/opt/render/.cache/puppeteer/chrome/linux-138.0.7204.168/chrome-linux64/chrome",
    });

    const page = await browser.newPage();

    // Generate PDF from the starter template
    await page.setContent(reportHtmlTemplate, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      footerTemplate: footer.replace("{{reportId}}", report.reportId),
      headerTemplate: header,
      printBackground: true,
      margin: {
        top: "80px",
        bottom: "50px",
      },
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfBuffer.length,
      "Content-Disposition": `attachment; filename="report.pdf"`,
    });

    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Can't generate PDF" });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
