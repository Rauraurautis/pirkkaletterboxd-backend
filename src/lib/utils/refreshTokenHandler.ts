import { NextFunction, Request, Response } from "express";
import { get } from "lodash"
import { reIssueAccessToken } from "../../services/user.service";




export const refreshTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies["refreshToken"]
        console.log(refreshToken)
    
        if (!refreshToken) {
            throw new Error("Refresh token not found")
        }
        const newToken = await reIssueAccessToken({ refreshToken })

        return res.status(200).json({ token: newToken })
    } catch (error: any) {
        return next(error)
    }
}
