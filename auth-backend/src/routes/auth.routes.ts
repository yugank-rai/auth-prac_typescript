import express, { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { RegisterBody, LoginBody } from "../types/auth.types";
import { registerSchema, loginSchema } from "../validators/auth.validators";

const router: Router = express.Router();

router.post("/register", async (req: Request<{}, {}, RegisterBody>, res: Response, next: NextFunction) => {
    try {
       
        const result = registerSchema.safeParse(req.body);
        if(!result.success) {
            res.status(400).json({
                message: "Validation failed!",
                errors: result.error.issues 
            });
            return;
        }

        const { name, email, password } = result.data;

        const userExists = await User.findOne({ email });
        if(userExists) {
            res.status(400).json({ message: "User already exists!" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch(error) {
        next(error); 
    }
});

router.post("/login", async (req: Request<{}, {}, LoginBody>, res: Response,next: NextFunction) => {
    try {


        const result =loginSchema.safeParse(req.body);

        if(!result.success){
           res.status(400).json({
                message: "Validation failed!",
                errors: result.error
              
            });
              return;
        }
        const { email, password } = result.data;

        const user = await User.findOne({ email });
        if(!user) {
            res.status(401).json({ message: "Invalid email or password!" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(401).json({ message: "Invalid email or password!" });
            return;
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch(error) {
       next(error);
    }
});

export default router;