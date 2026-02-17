import { z } from "zod";

const createJobSchema = z.object({
  title: z.string().min(1),
  location: z.string().min(1),
  type: z.string().min(1),
  jobDesc: z.string().min(1),
  responsibilities: z.string().min(1),
  qualifications: z.string().min(1),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

const updateJobSchema = createJobSchema.partial().extend({
  id: z.uuid(),
});

export { createJobSchema, updateJobSchema };
