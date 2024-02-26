import { NextFunction, Request, Response } from "express"
import { getUserMovies, postUserMovie } from "../services/movie.service"
import { MovieInput } from "../models/userMovie.model"
import { JwtPayload } from "jsonwebtoken"

export const postUserMovieHandler = async (req: Request<{ userId: string }, {}, MovieInput>, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user as JwtPayload
        const movie = await postUserMovie(req.body, req.params.userId, user._id)
        return res.send(movie)
    } catch (error: any) {
        return next(error)
    }
}

export const getUserMoviesHandler = async (req: Request<{ username: string }, {}, {}>, res: Response, next: NextFunction) => {
    try {
        const movies = await getUserMovies(req.params.username)
        return res.send(movies)
    } catch (error: any) {
        return next(error)
    }
}