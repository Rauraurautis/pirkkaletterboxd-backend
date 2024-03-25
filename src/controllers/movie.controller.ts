import { NextFunction, Request, Response } from "express"
import { postUserMovie } from "../services/movie.service"
import { MovieInput } from "../models/userMovie.model"
import { JwtPayload } from "jsonwebtoken"
import { getUserData } from "../services/user.service"

export const postUserMovieHandler = async (req: Request<{ userId: string }, {}, MovieInput>, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user as JwtPayload
        const movie = await postUserMovie(req.body, req.params.userId, user._id)
        return res.send(movie)
    } catch (error: any) {
        return next(error)
    }
}
