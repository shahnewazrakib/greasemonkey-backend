import { Router } from "express";
import { authorization } from "../../middleware/authorization.js";
import { createReport } from "../../controllers/report/create.controller.js";
import { multerInstance } from "../../lib/multer.js";
import { uploadMultipleMedia } from "../../controllers/report/uploadMultipleMedia.controller.js";
import { getSingleReport } from "../../controllers/report/getSingle.controller.js";
import { updateReport } from "../../controllers/report/update.controller.js";
import { getAllReport } from "../../controllers/report/get.controller.js";
import { updateReportStatus } from "../../controllers/report/updateReportStatus.controller.js";
import { deleteReport } from "../../controllers/report/delete.controller.js";
import { getPublicReport } from "../../controllers/report/getPublic.controller.js";
import { downloadReport } from "../../controllers/report/download.controller.js";
import { updateTaskStatus } from "../../controllers/report/updateTaskStatus.controller copy.js";
import { assignReport } from "../../controllers/report/assign.controller.js";
const router = Router();

router.post("/", authorization, createReport);
router.get("/", authorization, getAllReport);
router.get("/:reportId", authorization, getSingleReport);
router.get("/public/:reportId", getPublicReport);
router.get("/download/:reportId", authorization, downloadReport);
router.put("/:reportId", authorization, updateReport);
router.put("/status/task/:reportId", authorization, updateTaskStatus);
router.put("/status/:reportId", authorization, updateReportStatus);
router.put("/assign/:reportId/:assignTo", authorization, assignReport);
router.delete("/:reportId", authorization, deleteReport);
router.post("/media/multiple", authorization, multerInstance.array("media", 20), uploadMultipleMedia);

export default router;