import { hasPermission } from "../../lib/permission.js";
import { Report } from "../../models/report.js";

export const deleteReport = async (req, res) => {
  try {
    const user = req.user;
    const { reportId } = req.params;

    if (!hasPermission(user, "delete:report")) {
      return res
        .status(403)
        .json({ message: "You don't have permission to delete report" });
    }

    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report doesn't exist" });
    }

    await Report.findByIdAndDelete(reportId);

    res.status(200).json({
      message: "Report deleted",
      reportId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
