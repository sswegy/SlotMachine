import express from "express"
import usersRoute from "./src/routes/usersRoute.js"
import transactionsRoute  from "./src/routes/transactionsRoute.js"
import gamesRoute from "./src/routes/gamesRoute.js"
import connectionHistoryRoute from "./src/routes/connectionsHistoryRoute.js"
import cors from "cors";

const app = express()
const port = 5000

app.use(cors());
app.use(express.json())
app.use("/users", usersRoute)
app.use("/transactions", transactionsRoute)
app.use("/games", gamesRoute)
app.use("/connections_history", connectionHistoryRoute)

app.listen(port, () => {
    console.log(`Server Working on Port:${port}...`)
})