import express from "express"
import cors from "cors"

import { getFilelist, getFiledata, uploadFileData } from './database.js'
import { upload } from "./middleware/upload.js";

const app = express()
const PORT = process.env.MAIN_PORT_NO || 3000

app.use(cors())

// Get list of uploaded files
app.get("/file/list", async (req, res) => {
    const filenames = await getFilelist()
    res.status(200).json({
        status: 200,
        files: filenames
    })
})

// Get file contents by filename
app.get("/file/:filename", async (req, res) => {
    const filename = req.params.filename
    const data = await getFiledata(filename)
    res.status(200).json({
        status: 200,
        fileData: data
    })
})

// Upload csv file and insert its contents into db
app.post("/file/upload", upload.single('file'), async (req, res) => {
    await uploadFileData(req, res)
    res.status(201).json({
        status: 201,
        message: "File uploaded successfully."
    })
})

app.listen(PORT, () => {
    console.log(`Service is running on Port ${PORT}`);
})

