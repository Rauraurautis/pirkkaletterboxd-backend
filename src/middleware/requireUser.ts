import { NextFunction, Request, Response } from "express"
import { TokenPayload } from "../lib/types"

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user: TokenPayload = res.locals.user

    if (!user) {
        throw new Error("You need to be logged in")
    }
    return next()
}