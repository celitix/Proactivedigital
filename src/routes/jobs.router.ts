import express from "express";
import { validateBody } from "../middleware/schemaValidator";
import { checkIsAuth } from "../middleware/checkIsAuth";
import { createJobSchema, updateJobSchema } from "../schema/job.schema";
import {
  create,
  getAllJobs,
  updateJobStatus,
} from "../controller/job.controller";
const router = express.Router();
router.post("/create", checkIsAuth, validateBody(createJobSchema), create);
router.get("/", checkIsAuth, getAllJobs);
router.patch(
  "/update",
  checkIsAuth,
  validateBody(updateJobSchema),
  updateJobStatus,
);

export default router;
