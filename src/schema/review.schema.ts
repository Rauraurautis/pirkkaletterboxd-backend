import { object, string, TypeOf, array, number } from "zod"



export const createReviewSchema = object({
    body: object({
        movie: object({
            id: number({ required_error: "Movie id required" }),
            title: string({ required_error: "Movie title required" }),
            poster_path: string({ required_error: "Movie poster path required" }),
            overview: string({ required_error: "Movie poster path required" }),
            release_date: string({ required_error: "Movie poster path required" }),
            original_language: string({ required_error: "Movie poster path required" }),
            genre_ids: number({ required_error: "Movie poster path required" }).array(),
        }),
        title: string({ required_error: "Title for review is required" }).min(5, "Too short of a title - minimum 5 characters!"),
        rating: number({ required_error: "Rating required" }),
        review: string({
            required_error: "Review is required"
        }).min(25, "Too short of a review - minimum 25 characters!"),
    })
})

export type CreateReviewInput = TypeOf<typeof createReviewSchema>