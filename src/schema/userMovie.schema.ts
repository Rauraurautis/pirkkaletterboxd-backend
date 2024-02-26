import { object, string, TypeOf, number, boolean } from "zod"



export const postUserMovieSchema = object({
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
        watched: boolean({ required_error: "Watched (true or false) is required" })

    })
})

export type UserMovieInput = TypeOf<typeof postUserMovieSchema>