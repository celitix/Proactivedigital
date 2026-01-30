import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.email("Invalid email address"),
  age: z.number().int().min(0).optional(),
  role: z.enum(["admin", "user"]).default("user"),
  mobile: z.string().min(10).max(10),
  gender: z.enum(["male", "female", "other"]).optional(),
});

export { createUserSchema };
