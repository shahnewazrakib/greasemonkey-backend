import { Router } from "express";
import { login } from "../../controllers/auth/login.controller.js";
import { getUser, logout } from "../../controllers/auth/user.controller.js";
import { authorization } from "../../middleware/authorization.js";
import { forgotPassword } from "../../controllers/auth/forgotPassword.controller.js";
import { resetPassword } from "../../controllers/auth/resetPassword.controller.js";
import { changePassword } from "../../controllers/auth/changePassword.controller.js";
import { uploadProfilePhoto } from "../../controllers/auth/uploadProfilePhoto.controller.js";
import { multerInstance } from "../../lib/multer.js";
import { updatePersonalInformation } from "../../controllers/auth/updatePersonalInfo.controller.js";
const router = Router();

router.post("/login", login);
router.get("/user", authorization, getUser);
router.get("/logout", authorization, logout);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:userId/:token", resetPassword);
router.put("/change-password", authorization, changePassword);
router.put("/personal-information", authorization, updatePersonalInformation);
router.put(
  "/upload-profile-picture",
  authorization,
  multerInstance.single("profilePhoto"),
  uploadProfilePhoto
);

export default router;
