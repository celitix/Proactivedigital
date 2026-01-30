import express from "express";
import { validateBody } from "../middleware/schemaValidator";
import { carreerEnquiry, contactEnquiry } from "../schema/enquiry.schema";
import { career, contact } from "../controller/enquiry.controller";
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({ message: "Auth routes" });
});

router.post("/contact", validateBody(contactEnquiry), contact);
router.post("/career", validateBody(carreerEnquiry), career);

export default router;
