import express from "express";
import { getFilelist, getFiledata } from './database.js'

const app = express()
const PORT = process.env.MAIN_PORT_NO || 3000

// Get list of uploaded files
app.get("/file/list", async (req, res) => {
    const filenames = await getFilelist()
    res.send(filenames)
})

// Get contents of a particular file
app.get("/file/:filename", async (req, res) => {
    const filename = req.params.filename
    const data = await getFiledata(filename)
    res.send(data)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(PORT, () => {
    console.log(`Service is running on Port ${PORT}`);
})

