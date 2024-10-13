import mysql from 'mysql2'
import dotenv from 'dotenv'
import csvtojson from 'csvtojson'
import fs from 'fs'

// Load environment variables
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getFilelist() {
    const [rows] = await pool.query("SELECT * FROM file_list")
    return rows
}

export async function getFiledata(filename) {
    const [rows] = await pool.query(`
        SELECT post_id, id, name, email, body
        FROM filedata
        WHERE filename = ?
        `, [filename])
        return rows
}

export async function uploadFileData(req, res) {
    const filename = req.file.originalname
    const filepath = process.env.UPLOAD_DIR + filename
    const currDateTime = new Date().toISOString()

    // Insert filename into table file_list
    await pool.query(`
        INSERT INTO file_list (name, uploaded)
        VALUES (?, ?)
        `, [filename, currDateTime])

    // Parse csv file into json object
    const jsonArray = await csvtojson().fromFile(filepath)

    // Insert file contents into db
    for (let i = 0; i < jsonArray.length; i++) {
        const postId = jsonArray[i]["postId"]
        const id = jsonArray[i]["id"]
        const name = jsonArray[i]["name"]
        const email = jsonArray[i]["email"]
        const body = jsonArray[i]["body"]
        await pool.query(`
            INSERT INTO filedata (post_id, id, filename, name, email, body)
            VALUES (?, ?, ?, ?, ?, ?)
            `, [postId, id, filename, name, email, body])
    }

    // Delete csv file after db insert query
    fs.unlink(filepath, (err) => {
        if (err) {
            console.log(`Error removing file: ${err}`)
        }
    })
}
