import { Request, Response,NextFunction } from "express";

export class AppError extends Error {
    statusCode:number;

    constructor(message :string,statusCode:number) {
        super(message);
        this.statusCode = statusCode;

    }
}

export function errorHandler(
    err:AppError,
    req:Request,
    res:Response,
    next:NextFunction

):void {
    const statusCode=err.statusCode || 500;
    const message =err.message || "something went wrong";

    console.error(`Error:${message}`);

    res.status(statusCode).json({
        success:false,
        message,
        stack:process.env.NODE_ENV === "development" ? err.stack : undefined

    });

}