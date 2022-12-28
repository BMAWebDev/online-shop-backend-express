import { Categories } from "#src/controllers";
import { Router } from "express";

import { authenticate } from "#src/middleware";

const router = Router();

router.get("/categories", authenticate, Categories.readAll);

export default router;
