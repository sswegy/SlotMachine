import express from "express"
import usersRoute from "./src/routes/usersRoute.js"
import transactionsRoute  from "./src/routes/transactionsRoute.js"
import gamesRoute from "./src/routes/gamesRoute.js"

const app = express()
const port = 5000

app.use(express.json())
app.use("/users", usersRoute)
app.use("/transactions", transactionsRoute)
app.use("/games", gamesRoute)

app.listen(port, () => {
    console.log(`Server Working on Port:${port}...`)
})