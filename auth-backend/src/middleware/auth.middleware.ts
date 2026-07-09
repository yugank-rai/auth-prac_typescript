import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthRequest } from "../types/auth.types";
import type { JwtPayload } from "jsonwebtoken";

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

            req.user = decoded as JwtPayload;

            next();
        } catch(err) {
            res.status(401).json({ message: "Invalid token!" });
        }
    } else {
        res.status(401).json({ message: "No token found!" });
    }
};

export default authMiddleware;