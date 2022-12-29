import { Categories } from "#src/controllers";
import { Router } from "express";

import { authenticate } from "#src/middleware";

const router = Router();

router.get("/categories", authenticate, Categories.readAll);
router.post("/categories/create", authenticate, Categories.create);

router.get("/categories/:id", authenticate, Categories.readOne);
router.delete("/categories/:id", authenticate, Categories.remove);
router.patch("/categories/:id", authenticate, Categories.update);

export default router;
