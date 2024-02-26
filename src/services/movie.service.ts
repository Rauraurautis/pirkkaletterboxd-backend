import { AppError } from "../lib/utils/AppError"
import { UserModel } from "../models/user.model"

import { MovieInput, UserMovieModel } from "../models/userMovie.model"


export const postUserMovie = async (movieDetails: MovieInput, userId: string, user: string) => {
    if (userId !== user) {
        throw Error("The users do not match!")
    }
    const foundUser = await UserModel.findOne({ _id: userId }).populate("userMovies", { movie: 1, watched: 1 })
    const userMovies = foundUser.userMovies
    const existingMovie = userMovies.find((movie) => movie.movie.id === movieDetails.movie.id)
    if (existingMovie) {
        existingMovie.watched = !existingMovie.watched
        existingMovie.save()
        return existingMovie
    }

    const userMovie = await UserMovieModel.create({ ...movieDetails, user: userId })
    foundUser.userMovies = foundUser.userMovies.concat(userMovie._id)
    await foundUser.save()
    return userMovie
}

export const getUserMovies = async (username: string) => {
    const foundUser = await UserModel.findOne({ name: username }).populate("userMovies", { movie: 1, watched: 1 })
    if (!foundUser) {
        throw new AppError("User not found!", 404, 404)
    }
    const userMovies = foundUser.userMovies
    return userMovies
}
