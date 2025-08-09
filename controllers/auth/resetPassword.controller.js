import { ZodError } from "zod";
import { PasswordResetToken } from "../../models/passwordResetToken.js";
import { User } from "../../models/user.js";
import bcrypt from "bcryptjs";
import { forgotPasswordSchema } from "../../utils/zod.schema.js";

export const resetPassword = async (req, res) => {
  try {
    const { userId, token } = req.params;
    const { newPassword } = forgotPasswordSchema.parse(req.body);

    const passwordResetToken = await PasswordResetToken.findOne({
      userId,
      token,
    });

    if (!passwordResetToken) {
      return res.status(400).json({ message: "Link is not valid" });
    }

    if (passwordResetToken.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Link has been expired" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    await PasswordResetToken.deleteMany({ userId });
    return res.status(200).json({ message: "Password has been updated" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    return res.status(500).json({ message: "Server error"});
  }
};
