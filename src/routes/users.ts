import { Users } from "#src/controllers";
import { Router } from "express";

const router = Router();

router.post("/register", Users.register);
router.post("/verify-user", Users.verify);

export default router;
