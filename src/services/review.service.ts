import { ReviewDocument, ReviewModel } from "../models/review.model"
import { UserModel } from "../models/user.model"

export const addReview = async (input: Omit<ReviewDocument, "createdAt" | "updatedAt">, userId: string) => {
    const user = await UserModel.findOne({ _id: userId })
    if (user) {
        const recipe = await ReviewModel.create({ ...input, user: userId })
        user.reviews = user.reviews.concat(recipe._id)
        await user.save()
        return recipe
    }
}

export const getAllReviews = async () => {
    const reviews = await ReviewModel.find({}).populate("user", { name: 1, _id: 1 })
    return reviews
}

export const getAllReviewsForMovie = async (movieId: string) => {
    const reviews = await ReviewModel.find({ "movie.id": movieId }).populate("user", { name: 1, _id: 1 })
    return reviews
}

export const getAllReviewsForMovieByTitle = async (title: string) => {
    const regex = new RegExp(title, "i")
    const reviews = await ReviewModel.find({ "movie.title": { $regex: regex } }).populate("user", { name: 1, _id: 1 })
    return reviews
}




export const deleteReview = async (reviewId: string, userId: string) => {
    const user = await UserModel.findOne({ _id: userId })
    if (user) {
        const review = await ReviewModel.findById(reviewId)
        const removed = await review.deleteOne()
        return review
    }
}
