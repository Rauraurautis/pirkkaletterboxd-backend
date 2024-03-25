import { FilterQuery } from "mongoose"
import { UserDocument, UserModel, UserInput } from "../models/user.model"
import { get, omit } from "lodash"
import { signJWT, verifyJwt } from "../lib/utils/jwt.utils"
import { JwtPayload } from "jsonwebtoken"
import { AppError } from "../lib/utils/AppError"

const accessTokenTtl = "30m"
const refreshTokenTtl = "30d"

export const login = async (loginDetails: { email: string, password: string }, userAgent: string) => {
    const user = await validatePassword(loginDetails)
    
    if (!user) {
        throw new AppError("Wrong username or password", 500, 500)
    }
    const accessToken = signJWT({ user }, { expiresIn: accessTokenTtl })
    const refreshToken = signJWT({ user }, { expiresIn: refreshTokenTtl })

    return { accessToken, refreshToken }
}

export const createUser = async (input: UserInput) => {
    const user = await UserModel.create({ ...input, avatar_path: null })
    return omit(user, "password")
}

export const validatePassword = async ({ email, password }: { email: string, password: string }) => {
    const user = await UserModel.findOne({ email }, {reviews: 0, userMovies: 0})
    if (!user) {
        return false
    }
    const passwordMatch = await user.comparePassword(password)
    if (!passwordMatch) {
        return false
    }
    return omit(user.toJSON(), "password")
}

export const getUser = async (userId: string, user: string) => {
    if (userId !== user) {
        throw new Error("Users do not match")
    }
    const queriedUser = (await UserModel.findById(userId)).populate("userMovies", { movie: 1, watched: 1 })
    return queriedUser
}

export const getUserData = async (username: string) => {
    const foundUser = await UserModel.findOne({ name: username }).populate("userMovies", { movie: 1, watched: 1 }).populate("reviews", { movie: 1, title: 1, rating: 1, review: 1 })
    if (!foundUser) {
        throw new AppError("User not found!", 404, 404)
    }
    const userMovies = { movies: foundUser.userMovies, avatar_path: foundUser.avatar_path, reviews: foundUser.reviews }
    return userMovies
}


export const editUser = async (userId: string, user: string, userData: UserDocument) => {
    if (userId !== user) {
        throw new Error("Users do not match")
    }
    
    const queriedUser = await UserModel.findById(userId)
    queriedUser.email = userData.email
    queriedUser.name = userData.name
    queriedUser.avatar_path = userData.avatar_path
    console.log(queriedUser)

    await queriedUser.save()

    return queriedUser
}


export const findUser = async (query: FilterQuery<UserDocument>) => {
    const user = await UserModel.findById(query._id).lean()
    console.log(user)
    return user
}

export const reIssueAccessToken = async ({ refreshToken }: { refreshToken: string }) => {
    const { decoded } = verifyJwt(refreshToken) as JwtPayload
    const userId = get(decoded?.user, "_id")

    if (!decoded || !userId) {
        return false
    }


    let user = await findUser(decoded.user)



    if (!user) return false

    const accessTokenTtl = "5m"
    const accessToken = signJWT({ user: { email: user.email, name: user.name, _id: user._id } }, { expiresIn: accessTokenTtl })
    return accessToken
}