import { Express, Request, Response } from "express"
import validateResource from "./middleware/validateResource"
import { createUserSchema } from "./schema/user.schema"
import { createUserHandler, editUserHandler, getSingleUserHandler, getUserDataHandler } from "./controllers/user.controller"
import { requireUser } from "./middleware/requireUser"
import { loginSchema } from "./schema/login.schema"
import { loginHandler, logoutHandler } from "./controllers/login.controller"
import { createReviewSchema } from "./schema/review.schema"
import { createReviewHandler, deleteReviewHandler, getAllReviewsForMovieHandler, getAllReviewsHandler } from "./controllers/review.controller"
import { refreshTokenHandler } from "./lib/utils/refreshTokenHandler"
import { postUserMovieHandler } from "./controllers/movie.controller"
import { postUserMovieSchema } from "./schema/userMovie.schema"
import rateLimiter from "./middleware/rateLimiter"
import upload from "./middleware/upload"

const routes = (app: Express) => {

    app.get("/healthcheck", (req: Request, res: Response) => {
        return res.json({ status: "OK" })
    })
    app.get("/refresh", refreshTokenHandler)

    // User routes
    app.post("/api/users", rateLimiter, validateResource(createUserSchema), createUserHandler)
    app.post("/api/users/:userId/movies", validateResource(postUserMovieSchema), requireUser, postUserMovieHandler)
    app.get("/api/users/:username/movies", getUserDataHandler)
    app.get("/api/users/:userId", requireUser, getSingleUserHandler)
    app.put("/api/users/:userId", upload.single("avatar"), requireUser, editUserHandler)

    // Login routes
    app.post("/api/login", validateResource(loginSchema), loginHandler)
    app.post("/api/logout", requireUser, logoutHandler)

    // Review routes
    app.get("/api/reviews", getAllReviewsHandler)
    app.get("/api/reviews/:movieId", getAllReviewsForMovieHandler)
    app.post("/api/reviews", requireUser, validateResource(createReviewSchema), createReviewHandler)
    app.delete("/api/reviews/:reviewId", requireUser, deleteReviewHandler)

    // Movie routes
    // app.get("/api/:userId/movies", getUserMoviesHandler)


}

export default routes