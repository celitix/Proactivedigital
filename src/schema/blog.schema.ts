import { z } from "zod";

const create = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  shortDesc: z.string().min(50).max(200),
  content: z.string().min(100),
  category: z.string().min(5),
  tags: z.string().min(1).max(160),
  publishedDate: z.date().optional(),
  seo: z.object({
    title: z.string().min(1).max(60),
    desc: z.string().min(1).max(160),
    keywords: z.string().min(1).max(160),
  }),
  status: z.enum(["draft", "published"]).default("draft"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image is required")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPG, PNG, or WEBP images are allowed",
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, "Image must be under 5MB"),
});

const update = create.partial().extend({
  id: z.uuid(),
});

export { create, update };
