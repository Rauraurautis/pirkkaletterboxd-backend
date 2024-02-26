require('dotenv').config();
import express from "express"
import cors from "cors"
import routes from "./routes"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import { deserializeUser } from "./middleware/deserializeUser";
import connect from "./lib/utils/connect";
import { errorHandler } from "./middleware/errorHandler";


const app = express()

app.use(helmet())
app.use(cookieParser())
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json())
app.use(deserializeUser)


const PORT = process.env.PORT

app.listen(PORT, async () => {
    console.log(`Listening to port ${PORT}`)
    await connect()
    routes(app)
    app.use(errorHandler)
})

