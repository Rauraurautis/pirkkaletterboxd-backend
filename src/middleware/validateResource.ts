import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects } from "zod";

const validate = (schema: ZodEffects<AnyZodObject> | AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({body: req.body})
        next()
    } catch (error: any) {
        next(error)
    }
}

export default validate