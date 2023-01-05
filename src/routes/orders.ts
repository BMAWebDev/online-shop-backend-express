import { Router } from "express";
import { Orders } from "#src/controllers";

const router = Router();

router.post("/orders/create", Orders.create);

export default router;
