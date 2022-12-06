import { Router } from "express";
import { users } from "#src/routes";

const router = Router();
export default router;

// use the router instances defined
router.use(users);
