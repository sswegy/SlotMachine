import pool from "../database/database.js"

// GET GAMES

export async function getGames() {
    const [result] = await pool.query("SELECT * FROM games")
    return [result]
}

export async function getGameByID(id) {
    const [result] = await pool.query("SELECT * FROM games WHERE id = ?", [id])
    return result[0]
}

export async function getGamesByUserID(user_id) {
    const [result] = await pool.query("SELECT * FROM games WHERE user_id = ?", [user_id])
    return [result]
}

// PUT GAMES

export async function createGame(row_array, fee, reward, user_id) {
    const result = await pool.query(
        "INSERT INTO games (row_array, fee, reward, user_id) VALUES (?, ?, ?, ?)", [JSON.stringify(row_array), fee, reward, user_id])

    return result
}