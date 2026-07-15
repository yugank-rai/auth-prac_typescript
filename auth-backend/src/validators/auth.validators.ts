import z from "zod";

export const registerSchema = z.object({
    name:z.string()
        .min(2,"Name must be at leat 2 character")
        .max(50,"name too long!"),

    email:z.string()
        .email("invalid email format"),
    
    password:z.string()
    .min(6,"must be atleast 6 character")
    .max(20,"password too long!")    
    
});

export const loginSchema= z.object({
    email:z.string()
    .email("invalid email format!"),

    password:z.string()
    .min(1,"password is required")
});

export type ResgisterInput=z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

