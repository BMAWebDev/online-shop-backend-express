import { Products } from "#src/controllers";
import { Router } from "express";

import { authenticate } from "#src/middleware";

const router = Router();

router.get("/products", authenticate, Products.readAll);

export default router;
