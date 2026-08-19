import { z } from "zod";

export const projectOrderSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(100, { message: "Full name is too long" }),
  telegram: z
    .string()
    .min(2, { message: "Telegram handle or link is required" })
    .regex(/^@?[a-zA-Z0-9_]{3,}$/, {
      message: "Please enter a valid Telegram username (e.g. @username)",
    }),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 7,
      "Phone number should be at least 7 digits if provided"
    ),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().optional(),
  projectType: z.string().min(1, { message: "Project type is required" }),
  selectedServices: z.array(z.string()).default([]),
  estimatedBudget: z.string().min(1, { message: "Budget estimation is required" }),
  deadline: z.string().min(1, { message: "Timeline/deadline is required" }),
  description: z
    .string()
    .min(10, { message: "Please provide at least 10 characters describing your project" })
    .max(2000, { message: "Description exceeds maximum length" }),
});

export const quickContactSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name is too long" }),
  telegramOrEmail: z
    .string()
    .min(3, { message: "Telegram username or email is required" }),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1500, { message: "Message is too long" }),
});
