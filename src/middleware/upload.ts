import multer, { FileFilterCallback } from "multer"
import { Request } from "express"
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Set the file name
    },
});


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image file'))
        }
        cb(null, true)
    }, storage: storage
},)

export default upload