import { hasPermission } from "../../lib/permission.js";
import { ZodError } from "zod";
import { Report } from "../../models/report.js";
import { reportStatus } from "../../utils/zod.schema.js";

export const updateReportStatus = async (req, res) => {
  try {
    const user = req.user;

    if (!hasPermission(user, "update:report")) {
      return res
        .status(403)
        .json({ message: "You don't have permission to update report" });
    }

    const { reportId } = req.params;
    const { status } = reportStatus.parse(req.body);

    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (
      user.role === "inspector" &&
      report.assignedTo._id.toString() !== user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You don't have permission to update this report" });
    }

    // Update main report
    await Report.findByIdAndUpdate(reportId, {
      reportStatus: status,
    });

    res.status(200).json({
      message: "Status updated",
      report: {
        _id: report._id,
        reportStatus: status,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
