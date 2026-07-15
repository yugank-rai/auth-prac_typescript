import express, { Router, Response } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { AuthRequest } from "../types/auth.types";
import User from "../models/User";
import { registerSchema,loginSchema } from "../validators/auth.validators";

const router: Router = express.Router();

router.get("/profile", authMiddleware, async (req: AuthRequest, res: Response) => {
   try {
    const user = await User.findById(req.user?.userId).select("-password");
    if(!req.user) {
        res.status(401).json({ message: "Unauthorized!" });
        return;
    }
    res.json(user);
   } catch(error) {
    res.status(500).json({message:"server error!"});
   }
});

router.get("/dashboard", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user?.userId).select("-password");
        res.json({
            message: `Welcome ${user?.name}!`,  
            user: user                           
        });
    } catch(error) {
        res.status(500).json({ message: "Server error!" });
    }
});


export default router;