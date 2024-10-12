import multer from 'multer'

const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes("csv")) {
        cb(null, true);
    } else {
        cb("Please upload only .csv files.", false);
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_DIR)
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

export const upload = multer({
    storage: storage,
    fileFilter: csvFilter
})
