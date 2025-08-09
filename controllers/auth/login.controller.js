import { User } from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import { authSchema } from "../../utils/zod.schema.js";

export const login = async (req, res) => {
  try {
    const { email, password } = authSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Incorrect email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    if (!user.isActive) {
      return res.status(400).json({ message: "Account is not active" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(user._id, { accessToken: token });

    res.status(200).json({
      message: "Logged in",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePhoto: user.profilePhoto,
      },
      token,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: "Server error" });
  }
};
