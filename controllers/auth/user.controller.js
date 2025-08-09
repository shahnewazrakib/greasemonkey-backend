import { User } from "../../models/user.js";

export const getUser = async (req, res) => {
  try {
    const user = req.user;
    res
      .status(200)
      .json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          profilePhoto: user.profilePhoto,
        },
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const user = req.user;
    await User.findByIdAndUpdate(user._id, { accessToken: null });
    res.clearCookie("__rideinspect_session_token");
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
