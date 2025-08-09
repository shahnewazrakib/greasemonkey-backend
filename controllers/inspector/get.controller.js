import { User } from "../../models/user.js";
import { hasPermission } from "../../lib/permission.js";

export const getInspectors = async (req, res) => {
  try {
    const user = req.user;

    // Check if the requested person has the permission
    if (!hasPermission(user, "read:inspector")) {
      return res
        .status(403)
        .json({ message: "You don't have permission to read inspector" });
    }

    const inspectors = await User.find()
      .select("_id name email phone role isActive profilePhoto createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Inspectors fetched",
      inspectors,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
