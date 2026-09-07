import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().trim().min(6, "Password must be at least 6 characters").max(32, "Password must be at most 32 characters"),
});

export const signupSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().optional().or(z.literal("")).transform(v => v || undefined),
    phone: z.string().trim().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    email: z.email("Please enter a valid email address"),
    password: z.string().trim().min(6, "Password must be at least 6 characters").max(32),
});

export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
