export type TokenPayload = {
    user: {
        email: string
        name: string
        _id: string
    }
    iat: number,
    exp: number
}

export type Movie = {
    id: number
    title: string
    poster_path: string
}
