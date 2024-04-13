import { z } from 'zod'
/*
 * Zod is a TypeScript-first schema declaration and validation library designed for robust data validation and type safety. 
 * It provides a developer-friendly way to define and validate data schemas in TypeScript applications.
*/

export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid Email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
})