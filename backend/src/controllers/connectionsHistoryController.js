import pool from "../database/database.js"

// GET GAMES

export async function getConnectionsHistory() {
    const [result] = await pool.query("SELECT * FROM connections_history")
    return [result]
}

export async function getConnectionsHistoryByID(id) {
    const [result] = await pool.query("SELECT * FROM connections_history WHERE id = ?", [id])
    return result[0]
}

export async function getConnectionsHistoryByUserID(user_id) {
    const [result] = await pool.query("SELECT * FROM connections_history WHERE user_id = ?", [user_id])
    return [result]
}

export async function getConnectionsHistoryByUserIDByWeek(user_id, week_off_set) {
    const query = `
    SELECT 
      DAYNAME(DATE_ADD(NOW(), INTERVAL -WEEKDAY(NOW()) DAY) + INTERVAL daynum DAY) AS day,
      COALESCE(COUNT(connections_history.date), 0) AS connections,
      COALESCE(SUM(connections_history.games_played), 0) AS total_games_played
    FROM
      (SELECT 0 AS daynum UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 
      UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6) AS days
    LEFT JOIN connections_history
      ON DAYNAME(connections_history.date) = DAYNAME(DATE_ADD(NOW(), INTERVAL -WEEKDAY(NOW()) DAY) + INTERVAL daynum DAY)
      AND user_id = ?
      AND YEARWEEK(connections_history.date) = YEARWEEK(NOW()) - ?
    GROUP BY daynum
  `
    const [result] = await pool.query(query, [user_id, week_off_set])
    return [result]
}

export async function createConnectionsHistory(user_id, games_played) {
    const result = await pool.query(
        "INSERT INTO connections_history (user_id, games_played) VALUES (?, ?)", [user_id, games_played])

    return result
}