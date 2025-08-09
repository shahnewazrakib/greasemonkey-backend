import { sendEmail } from "../../lib/mailer.js";
import { hasPermission } from "../../lib/permission.js";
import { Report } from "../../models/report.js";
import { User } from "../../models/user.js";

export const assignReport = async (req, res) => {
  try {
    const user = req.user;
    const { reportId, assignTo } = req.params;

    // Check permission
    if (!hasPermission(user, "assign:report")) {
      return res.status(403).json({
        message: "You don't have permission to assign report",
      });
    }

    // Check if report exists
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report doesn't exist" });
    }

    // Check if the assginee exists
    const assignee = await User.findById(assignTo);
    if (!assignee) {
      return res.status(404).json({ message: "Inspector doesn't exist" });
    }

    // Check if the report is already assigned to the same assignee
    if (report.assignedTo.toString() === assignTo) {
      return res.status(400).json({
        message: "Report is already assigned to the same inspector",
      });
    }

    // Assign the report
    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      {
        assignedTo: assignTo,
        reportStatus: report?.reportStatus === "processing" ? "assigned" : report.reportStatus,
      },
      { new: true }
    );

    // Send the email to the assignee
    await sendEmail(
      assignee.email,
      process.env.MAILTRAP_REPORT_ASSIGN_TEMPLATE_ID,
      {
        name: assignee.name,
        reportId: report.reportId,
      }
    );

    res.status(200).json({
      message: "Report assigned",
      report: {
        _id: reportId,
        assignedTo: {
          name: assignee.name,
          profilePhoto: assignee.profilePhoto,
          role: assignee.role,
        },
        inspectionStatus: updatedReport.inspectionStatus,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
