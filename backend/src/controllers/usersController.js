import pool from "../database/database.js"
import generateQRCode from "../utility/qr_code.js"


// GET USERS

export async function getUsers() {
    const [results] = await pool.query("SELECT * FROM users" )
    return [results]
}

export async function getUserByID(id) {
    const [result] = await pool.query("SELECT * FROM users WHERE id = ?", [id])
    return result[0]
}

export async function getUserByEmail(email) {
    const [result] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
    return result[0]
}

export async function getUserByUserName(user_name) {
    const [result] = await pool.query("SELECT * FROM users WHERE user_name = ?", [user_name])
    return result[0]
}

export async function getUserByQRCode(qr_code) {
    const [result] = await pool.query("SELECT balance FROM users WHERE qr_code = ?", [qr_code])
    return result[0]
}

export async function getUserPasswordByEmail(email) {
    const result = await getUserByEmail(email)
    return result.password
}

export async function getUserBalanceByID(id) {
    const result = await getUserByID(id)
    return Number(result.balance)
}


//POST USER

export async function createUser(first_name, last_name, user_name, email, password) {
    const credentials = first_name + last_name + user_name + email + password
    const qr_code = await generateQRCode(credentials)

    const result = await pool.query(
        "INSERT INTO users (first_name, last_name, user_name, email, password, qr_code) VALUES (?, ?, ?, ?, ?, ?)",
        [first_name, last_name, user_name, email, password, qr_code]
    )
    return result
}

//PUT USER

export async function updateUserBalanceByID(id, balance) {
    const result = await pool.query("UPDATE Users SET balance = ? WHERE id = ?", [balance, id])
    return result
}