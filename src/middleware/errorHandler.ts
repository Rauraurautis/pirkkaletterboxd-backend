import { NextFunction, Response, Request } from "express";
import multer from "multer";
import { AppError } from "../lib/utils/AppError";

export const errorHandler = async (error: any, req: Request, res: Response, next: NextFunction) => {

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode })
    }

    if (error instanceof multer.MulterError) {

    }

    if (error.name === "ZodError") {
        return res.status(401).json({ error: error.name })
    }

    return res.status(400).json(error)
}