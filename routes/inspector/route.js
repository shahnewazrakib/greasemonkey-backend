import { Router } from "express";
import { authorization } from "../../middleware/authorization.js";
import { deleteInspector } from "../../controllers/inspector/delete.controller.js";
import { uploadAvatar } from "../../controllers/inspector/uploadAvatar.controller.js";
import { multerInstance } from "../../lib/multer.js";
import { updateInspector } from "../../controllers/inspector/update.controller.js";
import { getInspectors } from "../../controllers/inspector/get.controller.js";
import { inviteInspector } from "../../controllers/inspector/invite.controller.js";
import { acceptInvitation } from "../../controllers/inspector/accept.controller.js";

const router = Router();

router.post("/invite", authorization, inviteInspector);
router.put("/accept-invitation/:userId/:token", acceptInvitation);
router.get("/", authorization, getInspectors);
router.delete("/:userId", authorization, deleteInspector);
router.put(
  "/upload-avatar/:userId",
  authorization,
  multerInstance.single("profilePhoto"),
  uploadAvatar
);
router.put("/profile/:userId", authorization, updateInspector);

export default router;
