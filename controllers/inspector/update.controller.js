import { ZodError } from "zod";
import { User } from "../../models/user.js";
import { hasPermission } from "../../lib/permission.js";
import {
  adminPermissions,
  inspectorPermissions,
} from "../../utils/permission.js";
import { editInspectorSchema } from "../../utils/zod.schema.js";

export const updateInspector = async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params; // Updated user id

    if (!hasPermission(user, "update:inspector")) {
      return res
        .status(403)
        .json({ message: "You don't have permission to edit inspector" });
    }

    const { name, email, phone, role, isActive } =
      editInspectorSchema.parse(req.body);

    if (user._id.toString() === userId) {
      if (role !== user.role) {
        return res
          .status(400)
          .json({ message: "You can't change your own role" });
      }
      if (isActive !== user.isActive) {
        return res
          .status(400)
          .json({ message: "You can't change your own status" });
      }
    }

    // Check if the user exists
    const updatedUser = await User.findById(userId);
    if (!updatedUser) {
      return res.status(404).json({ message: "Inspector doesn't exist" });
    }

    // Check if the email is already taken by another user
    const existingUser = await User.findOne({ email, _id: { $ne: userId } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Update the user details
    updatedUser.name = name;
    updatedUser.email = email;
    updatedUser.phone = phone;
    updatedUser.role = role;
    updatedUser.isActive = isActive;
    updatedUser.permissions =
      role === "admin" ? adminPermissions : inspectorPermissions;

    // Save the updated user
    await updatedUser.save();

    res.status(200).json({
      message: "Inspector updated",
      inspector: {
        _id: userId,
        name,
        email,
        phone,
        role,
        isActive,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: "Server error" });
  }
};
