import { hasPermission } from "../../lib/permission.js";
import { Report } from "../../models/report.js";

export const getAllReport = async (req, res) => {
  try {
    const user = req.user;

    // Check if the requested person has the permission
    if (!hasPermission(user, "read:report")) {
      return res
        .status(403)
        .json({ message: "You don't have permission to read report" });
    }

    let reports = [];

    if (user.role === "admin") {
      // Fetch all the reports
      reports = await Report.find()
        .select(
          "_id reportId customer vehicle reportStatus inspectionStatus createdAt"
        )
        .populate("assignedTo", "name email profilePhoto role")
        .sort({ createdAt: -1 });
    }

    if (user.role === "inspector") {
      reports = await Report.find({ assignedTo: user._id })
        .select(
          "_id reportId customer vehicle reportStatus inspectionStatus createdAt"
        )
        .populate("assignedTo", "name email profilePhoto role")
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      message: "Reports fetched",
      reports,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
