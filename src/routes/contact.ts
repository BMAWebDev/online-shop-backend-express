import { Router } from "express";
import { Contact } from "#src/controllers";

const router = Router();

router.post("/contact/create", Contact.create);

export default router;
