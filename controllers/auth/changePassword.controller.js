import { ZodError } from "zod";
import { User } from "../../models/user.js";
import bcrypt from "bcryptjs";
import { changePasswordSchema } from "../../utils/zod.schema.js";

export const changePassword = async (req, res) => {
  try {
    const user = req.user;
    const { currentPassword, newPassword, confirmNewPassword } =
      changePasswordSchema.parse(req.body);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).json({ message: "Password changed" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: "Server error" });
  }
};
