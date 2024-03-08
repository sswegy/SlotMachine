import pool from "../database/database.js"
import { updateUserBalanceByID, getUserByID } from "./usersController.js"

// GET USERS

export async function getTransactions() {
    const [results] = await pool.query("SELECT * FROM transactions")
    return [results]
}

export async function getTransactionById(id) {
    const [results] = await pool.query("SELECT * FROM transactions WHERE id = ?", [id])
    return results[0]
}

export async function getTransactionsByUserID(user_id) {
    const [results] = await pool.query(`SELECT * FROM transactions WHERE user_id = ? AND type IN ("deposit", "withdraw")`, [user_id])
    return [results]
}

// POST USERS

export async function createTransaction(type, user_id, amount) {
    const user = await getUserByID(user_id)
    if(!user) {
        return res.status(404).send({message: "User not found"})
    }

    if(type == "withdraw" || type == "game_fee")
        amount = -amount
    
    const newBalance = Number(user.balance) + Number(amount)
    
    const result = await pool.query("INSERT INTO transactions (type, user_id, amount) VALUES(?, ?, ?)", [type, user_id, amount])
    await updateUserBalanceByID(user_id, newBalance)
    return result
}