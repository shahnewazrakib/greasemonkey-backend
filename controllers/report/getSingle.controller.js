import { hasPermission } from "../../lib/permission.js";
import { Report } from "../../models/report.js";
import _ from "lodash";

export const getSingleReport = async (req, res) => {
  try {
    const user = req.user;
    const { reportId } = req.params;

    if (!hasPermission(user, "read:report")) {
      return res
        .status(403)
        .json({ message: "You don't have permission to read report" });
    }

    const report = await Report.findById(reportId).select(
      "-_id -__v -createdAt -updatedAt -userId -assignedTo -inspectionStatus -reportStatus"
    );
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

    res.status(200).json({
      message: "Report retrieved",
      report,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
