import { Products } from "#src/controllers";
import { Router } from "express";

import { authenticate } from "#src/middleware";

const router = Router();

router.get("/products", Products.readAll);
router.post("/products/create", authenticate, Products.create);

router.get("/products/:id", Products.readOne);
router.delete("/products/:id", authenticate, Products.remove);
router.patch("/products/:id", authenticate, Products.update);

export default router;
