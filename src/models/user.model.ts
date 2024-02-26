import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { ReviewDocument } from "./review.model";
import { MovieDocument } from "./userMovie.model";

export interface UserInput {
    email: string;
    name: string;
    password: string;
}

export interface Movie {
    id: number
    title: string
    release_date: string
    poster_path: string
}


export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
    avatar_path: string
    reviews: ReviewDocument[]
    userMovies: MovieDocument[]
}


const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
        avatar_path: { type: String },
        userMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserMovie" }]
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {

    // @ts-ignore
    let user = this as UserDocument

    if (!user.isModified("password")) {
        return next()
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hashSync(user.password, salt)
    user.password = hash
    return next()
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument

    const passwordComparison = await bcrypt.compare(candidatePassword, user.password)
    return passwordComparison
}

export const UserModel = mongoose.model<UserDocument>("User", userSchema)

