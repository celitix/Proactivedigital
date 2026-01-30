import {  z } from "zod";

const contactEnquiry = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email("Invalid email address"),
  mobile: z.string().min(10).max(10),
  companyName: z.string().min(1).max(100),
  service: z.string().min(10).max(10),
  message: z.string().min(30).max(500),
  source: z.enum(["contact", "book-demo"]).optional(),
});

const carreerEnquiry = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email("Invalid email address"),
  mobile: z.string().min(10).max(10),
  designation: z.string().min(1).max(100),
  expInYears: z.string().min(1).max(100),
  jobTitle: z.string().min(1).max(100),
  resumeUrl: z.string().min(1).max(100),
  message: z.string().min(30).max(500).optional(),
});

export { contactEnquiry, carreerEnquiry };
