import { NextFunction, Request, Response } from "express"
import { omit } from "lodash"
import { createUser, editUser, getUser, getUserData } from "../services/user.service"
import { UserInput } from "../models/user.model"
import { JwtPayload } from "jsonwebtoken"
import { ReviewModel } from "../models/review.model"

export const createUserHandler = async (req: Request<{}, {}, UserInput>, res: Response, next: NextFunction) => {
    try {
        const user = await createUser(req.body)
        return res.send(omit(user.toJSON(), "password"))
    } catch (error: any) {
        if (error.code === 11000) {
            next(new Error("Email or username already exists"))
        }
        return next(error)
    }
}

export const getSingleUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user as JwtPayload
        const foundUser = await getUser(req.params.userId, user._id)
        return res.send(omit(foundUser.toJSON(), "password"))
    } catch (error: any) {
        return next(error)
    }
}

export const getUserDataHandler = async (req: Request<{ username: string }, {}, {}>, res: Response, next: NextFunction) => {
    try {
        const movies = await getUserData(req.params.username)
        return res.send(movies)
    } catch (error: any) {
        return next(error)
    }
}

export const editUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const avatarFilePath = req.file.path
        if (req.file.path) req.body = { ...req.body, avatar_path: `http://localhost:1337/${avatarFilePath}` }
        const user = res.locals.user as JwtPayload
        const foundUser = await editUser(req.params.userId, user._id, req.body)
        return res.send(omit(foundUser.toJSON(), "password"))
    } catch (error: any) {
        return next(error)
    }
}