import { Analytics } from "#src/controllers";
import { Router } from "express";

const router = Router();

router.get("/analytics", Analytics.readAll);

export default router;
