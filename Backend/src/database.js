import mysql from 'mysql2'
import dotenv from 'dotenv'

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
        SELECT *
        FROM filedata
        WHERE filename = ?
        `, [filename])
        return rows
}
