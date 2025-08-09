import { hasPermission } from "../../lib/permission.js";
import { Report } from "../../models/report.js";

export const getOverview = async (req, res) => {
  try {
    const user = req.user;

    if (!hasPermission(user, "read:overview")) {
      return res
        .status(403)
        .json({ message: "You don't have permission to read overview" });
    }

    let overviewData = {
      processingReports: 0,
      assignedReports: 0,
      completedReports: 0,
      cancelledReports: 0,
    };
    let recentReports = [];
    let reports = [];

    if (user.role === "admin") {
      reports = await Report.find().select("reportStatus inspectionStatus");

      recentReports = await Report.find()
        .select(
          "_id reportId customer vehicle reportStatus inspectionStatus createdAt"
        )
        .populate("assignedTo", "name email profilePhoto role")
        .sort({ updatedAt: -1 })
        .limit(10);
    }

    if (user.role === "inspector") {
      reports = await Report.find({ assignedTo: user._id }).select(
        "_id status isPriority"
      );

      const reportIds = reports.map((report) => report._id);
      recentReports = await Report.find({ reportId: { $in: reportIds } })
        .select(
          "_id reportId customer vehicle reportStatus inspectionStatus createdAt"
        )
        .populate("assignedTo", "name email profilePhoto role")
        .sort({ updatedAt: -1 })
        .limit(10);
    }

    overviewData.processingReports = reports.filter(
      (report) => report.reportStatus === "processing"
    ).length;
    overviewData.assignedReports = reports.filter(
      (report) =>
        report.inspectionStatus === "processing" ||
        report.inspectionStatus === "assigned"
    ).length;
    overviewData.completedReports = reports.filter(
      (report) => report.inspectionStatus === "completed"
    ).length;
    overviewData.cancelledReports = reports.filter(
      (report) => report.inspectionStatus === "cancelled"
    ).length;

    res.status(200).json({
      message: "Overview fetched",
      ...overviewData,
      recentReports,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
