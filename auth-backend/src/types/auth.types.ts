import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export interface RegisterBody {
    name: string;
    email: string;
    password: string;
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface JwtPayLoad {
    userId: string;
    email: string;
}

export interface AuthRequest extends Request {
    user?: JwtPayload | JwtPayLoad;
}