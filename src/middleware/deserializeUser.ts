import { NextFunction, Request, Response } from "express";
import { get } from "lodash"

import { JwtPayload } from "jsonwebtoken";
import { verifyJwt } from "../lib/utils/jwt.utils";
import { reIssueAccessToken } from "../services/user.service";

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization")?.slice(7)
    const refreshToken = req.cookies["refreshToken"]

    if (!accessToken) {
        return next()
    }
    const { decoded, expired } = verifyJwt(accessToken)
    if (decoded) {
        const { user } = decoded
        res.locals.user = user
        return next()
    }
    
        if (expired && refreshToken) {
            const newAccessToken = await reIssueAccessToken({ refreshToken })
            if (newAccessToken) {
                res.setHeader("x-access-token", newAccessToken)
                const result = verifyJwt(newAccessToken)
                res.locals.user = result.decoded
                return next()
            }
            return next()
        } 
    return next()
}