import { NextFunction, Request, Response } from "express";
import { addReview, deleteReview, getAllReviews, getAllReviewsForMovie, getAllReviewsForMovieByTitle } from "../services/review.service";

export const createReviewHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user._id
        const recipe = await addReview(req.body, user)
        return res.status(201).send(recipe)
    } catch (error: any) {
        next(error)
    }
}

// Return all reviews if no query parameter, if query parameter is present returns all results for the queried movie
export const getAllReviewsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.movie) {
            const reviews = await getAllReviewsForMovieByTitle(req.query.movie as string)
            return res.status(201).send(reviews)
        }
        const reviews = await getAllReviews()
        return res.status(201).send(reviews)
    } catch (error: any) {
        next(error)
    }
}

export const getAllReviewsForMovieHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await getAllReviewsForMovie(req.params.movieId)
        return res.status(201).send(reviews)
    } catch (error: any) {
        next(error)
    }
}


export const deleteReviewHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user._id
        const recipe = await deleteReview(req.params.reviewId, user)
        return res.status(201).send(recipe)
    } catch (error: any) {
        next(error)
    }
}

