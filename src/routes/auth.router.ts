import express from "express";
import { validateBody } from "../middleware/schemaValidator";
import { createUserSchema } from "../schema/auth.schema";
import { register } from "../controller/auth.controller";
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({ message: "Auth routes" });
});

router.post("/register", validateBody(createUserSchema), register);

export default router;
