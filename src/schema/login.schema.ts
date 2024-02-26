import { object, string, TypeOf } from "zod"

export const loginSchema = object({
    body: object({
        email: string({
            required_error: "email is required"
        }).email(),
        password: string({
            required_error: "Password is required"
        })
    })
})



export type LoginInput = TypeOf<typeof loginSchema>