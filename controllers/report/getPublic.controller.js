import { Report } from "../../models/report.js";
import _ from "lodash";

export const getPublicReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = await Report.findOne({
      reportId: reportId,
      reportStatus: "published",
    })
      .populate("assignedTo", "-_id name profilePhoto")
      .select("-_id -userId -inspectionStatus");

    if (!report) {
      return res.status(404).json({ message: "Report is private or deleted" });
    }

    res.status(200).json({
      message: "Report retrieved",
      report: report,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
