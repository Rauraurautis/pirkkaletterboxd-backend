import mongoose from "mongoose";
import { UserDocument } from "./user.model";

interface ReviewInput {
    movie: {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        poster_path: { type: String, required: true },
        overview: { type: String, required: true },
        release_date: { type: String, required: true },
        original_language: { type: String, required: true },
        genre_ids: [{ type: Number, required: true }]
    }
    title: string
    rating: number
    review: string
}

export interface ReviewDocument extends mongoose.Document, ReviewInput {
    user: UserDocument["id"]
    createdAt: Date
    updatedAt: Date
}

const reviewSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        movie: {
            id: { type: Number, required: true },
            title: { type: String, required: true },
            poster_path: { type: String, required: true }
        },
        title: { type: String, required: true },
        rating: { type: Number, required: true },
        review: { type: String, required: true }
    },
    {
        timestamps: true, versionKey: false
    }
)

export const ReviewModel = mongoose.model<ReviewDocument>("Review", reviewSchema)