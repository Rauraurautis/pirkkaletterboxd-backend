import mongoose from "mongoose"

const dbUri = process.env.MONGODB_URI

const connect = async () => {
    try {
        mongoose.set('strictQuery', false);
        const client = await mongoose.connect(dbUri)
        console.log("Connected to MongoDB")

    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

export default connect