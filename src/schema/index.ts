import  * as z from "zod";

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }), 
    password: z.string().min(8, {
        message: "Password must be at least 8 characters"
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters"
    }),
    username: z.string().min(1, {
        message: "Please enter your username"
    }),
    firstname: z.string().min(1, { 
        message: "Please enter your first name"
    }),
    lastname: z.string().min(1, {
        message: "Please enter your last name"
    }),
    gender: z.enum(["Male", "Female"], {
        message: "Please enter your gender"
    }),
    birthdate: z.date()
});