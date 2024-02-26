require('dotenv').config();
import jwt from "jsonwebtoken"
import { TokenPayload } from "../types"

const privateKey = process.env.PRIVATE_KEY || ""
const publicKey = process.env.PUBLIC_KEY || ""

export const signJWT = (object: Object, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(object, privateKey, { ...(options && options), algorithm: "RS256" })
}

export const verifyJwt = (token: string) => {
    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded: decoded as TokenPayload
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null
        }
    }

} 