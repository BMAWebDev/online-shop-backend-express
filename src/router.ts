import { Router } from "express";
import { users, categories, products } from "#src/routes";

const router = Router();
export default router;

// use the router instances defined
router.use(users);
router.use(categories);
router.use(products);
