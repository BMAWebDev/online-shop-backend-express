import { Categories } from "#src/controllers";
import { Router } from "express";

import { authenticate } from "#src/middleware";

const router = Router();

router.get("/categories", authenticate, Categories.readAll);
router.post("/categories/create", authenticate, Categories.create);
router.delete("/categories/:id", authenticate, Categories.remove);

export default router;
