import { Analytics } from "#src/controllers";
import { Router } from "express";

const router = Router();

router.get("/analytics", Analytics.readAll);
router.get("/analytics/orders", Analytics.readOrders);

export default router;
