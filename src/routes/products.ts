import { Products } from "#src/controllers";
import { Router } from "express";

import { authenticate } from "#src/middleware";

const router = Router();

router.get("/products", authenticate, Products.readAll);
router.post("/products/create", authenticate, Products.create);

export default router;
