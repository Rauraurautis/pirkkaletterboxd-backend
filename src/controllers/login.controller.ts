import { NextFunction, Request, Response } from "express"
import { login } from "../services/user.service"



export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokens = await login(req.body, req.get("user-agent"))
        return res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true, sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "strict", secure: true })
            .send({ accessToken: tokens.accessToken })
    } catch (error: any) {
        next(error)
    }
}


export const logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.clearCookie("refreshToken").clearCookie("accessToken").send("Logged out")
    } catch (error) {
        next(error)
    }
}