import { Router } from "express";
import {
  users,
  categories,
  products,
  orders,
  contact,
  analytics,
} from "#src/routes";

const router = Router();
export default router;

// use the router instances defined
router.use(users);
router.use(categories);
router.use(products);
router.use(orders);
router.use(contact);
router.use(analytics);
