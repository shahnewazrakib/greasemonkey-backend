import { hasPermission } from "../../lib/permission.js";
import { Report } from "../../models/report.js";
import { generateReportgId } from "../../utils/helper.js";

export const createReport = async (req, res) => {
  try {
    const user = req.user;

    if (!hasPermission(user, "create:report")) {
      return res
        .status(403)
        .json({ message: "You don't have permission to create report" });
    }

    if (user.role === "inspector") {
      return res.status(403).json({
        message: "You don't have permission to create report",
      });
    }

    const reportId = await generateReportgId();

    const report = new Report({
      reportId: `GMI-${reportId}`,
      userId: user._id,
      assignedTo: user._id,
    });
    await report.save();

    res.status(201).json({
      message: "Report created",
      reportId: report._id,
    });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
