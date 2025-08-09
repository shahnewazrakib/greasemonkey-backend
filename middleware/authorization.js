import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const authorization = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if(!user.isActive) {
      return res.status(403).json({ message: "Your account is inactive" });
    }

    if (!user.accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (token !== user.accessToken) {
      await User.findByIdAndUpdate(user._id, { accessToken: null });
      return res.status(401).json({ message: "Unauthorized" });
    } 
 
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
