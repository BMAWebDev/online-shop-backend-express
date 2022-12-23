import { Users } from "#src/controllers";
import { Router } from "express";

import { authenticate } from "#src/middleware";

const router = Router();

router.post("/register", Users.register);
router.post("/verify-user", Users.verify);
router.post("/login", Users.login);
router.get("/users/:id", authenticate, Users.readOne);

export default router;
