import { v4 as uuidv4 } from "uuid";
import { User } from "../../models/user.js";
import { PasswordResetToken } from "../../models/passwordResetToken.js";
import { ZodError } from "zod";
import { emailSchema } from "../../utils/zod.schema.js";
import { sendEmail } from "../../lib/mailer.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = emailSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await PasswordResetToken.deleteMany({ userId: user._id });

    const token = uuidv4();
    const passwordResetToken = new PasswordResetToken({
      userId: user._id,
      token,
      expiresAt: Date.now() + 30 * 60 * 1000,
    });
    await passwordResetToken.save();

    // Create reset link
    const resetLink = `${process.env.CORS_ALLOWED_ORIGIN_DASHBOARD}/reset-password/${user._id}/${token}`;

    await sendEmail(email, process.env.MAILTRAP_RESET_PASSWORD_TEMPLATE_ID, {
      name: user.name,
      resetLink,
    });

    return res
      .status(200)
      .json({
        message: "Reset link sent. It may take a few minutes to arrive.",
      });
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: "Server error" });
  }
};
