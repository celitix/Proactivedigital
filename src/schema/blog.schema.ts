import { z } from "zod";
import { describe } from "zod/v4/core";

const blogCreate = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  shortDesc: z.string().min(50).max(200),
  content: z.string().min(100),
  category: z.string().min(5),
  tags: z.string().min(1).max(160),
  publishedDate: z.coerce.date().optional(),

  seo: z.preprocess(
    (val) => (typeof val === "string" ? JSON.parse(val) : val),
    z.object({
      title: z.string().min(1).max(60),
      desc: z.string().min(1).max(160),
      keywords: z.string().min(1).max(160),
    }),
  ),
  status: z.enum(["draft", "published"]).default("draft"),
});

const blogUpdate = blogCreate.partial().extend({
  id: z.uuid(),
  seo: z.preprocess(
    (val) => (typeof val === "string" ? JSON.parse(val) : val),
    z
      .object({
        id: z.string(),
        title: z.string().min(1).max(60),
        description: z.string().min(1).max(160),
        keywords: z.string().min(1).max(160),
      })
      .optional(),
  ),
});

export { blogCreate, blogUpdate };
