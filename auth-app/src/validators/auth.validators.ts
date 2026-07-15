import z from "zod";

export const registerSchema =z.object({
    name:z.string().min(2,"Name must be at least 2 character"),
    email:z.string().email("Invalid email!"),
    password:z.string().min(6,"password must br at least 6 characteristic"),
    confirmPassword:z.string()
}).refine(data =>data.password === data.confirmPassword,{
    message:"password don't match!",
    path:["confirmPasssword"]
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email!"),
    password: z.string().min(1, "Password is required!")
});