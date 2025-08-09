import { Router } from "express";
import { authorization } from "../../middleware/authorization.js";
import { getOverview } from "../../controllers/overview/get.controller.js";
const router = Router();

router.get("/", authorization, getOverview);
export default router;
