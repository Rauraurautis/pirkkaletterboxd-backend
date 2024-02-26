import mongoose from "mongoose";
import { Movie, UserDocument } from "./user.model";

export interface MovieInput {
    movie: Movie
    watched: boolean
}

export interface MovieDocument extends mongoose.Document, MovieInput {
    user: UserDocument["id"]
    createdAt: Date
    updatedAt: Date
}

const userMovieSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        movie: {
            id: { type: Number, required: true },
            title: { type: String, required: true },
            poster_path: { type: String, required: true },
            overview: { type: String, required: true },
            release_date: { type: String, required: true },
            original_language: { type: String, required: true },
            genre_ids: [{ type: Number, required: true }]

        },
        watched: { type: Boolean, required: true },
    },
    {
        timestamps: true, versionKey: false
    }
)

export const UserMovieModel = mongoose.model<MovieDocument>("UserMovie", userMovieSchema)