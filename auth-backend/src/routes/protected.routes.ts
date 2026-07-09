import express, { Router, Response } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { AuthRequest } from "../types/auth.types";

const router: Router = express.Router();

router.get("/profile", authMiddleware, (req: AuthRequest, res: Response) => {
    if(!req.user) {
        res.status(401).json({ message: "Unauthorized!" });
        return;
    }
    res.json({
        userId: req.user.userId,
        email: req.user.email
    });
});

router.get("/dashboard", authMiddleware, (req: AuthRequest, res: Response) => {
    if(!req.user) {
        res.status(401).json({ message: "Unauthorized!" });
        return;
    }
    res.json({
        message: `Welcome ${req.user.email}!`,  
        userId: req.user.userId
    });
});

export default router;