import express from "express"
import { getTransactions, getTransactionById, getTransactionsByUserID, createTransaction } from "../controllers/transactionsController.js"
import { getUserByID, updateUserBalanceByID } from "../controllers/usersController.js"
const router = express.Router()

// GET TRANSACTION

router.get("/", async (req, res) => {
    const transactions = await getTransactions()
    res.status(200).send(transactions)
})

router.get("/id/:id", async (req, res) => {
    const id = req.params.id
    const transaction = await getTransactionById(id)

    if(!transaction) {
        return res.status(404).send({message: "Transaction not found"})
    }
    res.status(200).send(transaction)
})

router.get("/user_id/:user_id", async (req, res) => {
    const user_id = req.params.user_id
    const transactions = await getTransactionsByUserID(user_id)

    if(!transactions) {
        return res.status(404).send({message: "Transactions not found"})
    }
    res.status(200).send(transactions)
})

// POST TRANSACTION

router.post("/", async(req, res) => {
    var {type, user_id, amount} = req.body
    const user = await getUserByID(user_id)

    if(!user) {
        return res.status(404).send({message: "User not found"})
    }

    if(type == "withdraw" || type == "game_fee")
        amount = -amount
    
    const newBalance = Number(user.balance) + Number(amount)
    if(newBalance < 0) {
        return res.status(400).send({message: "Not enough balance"})
    }

    await createTransaction(type, user_id, amount)
    await updateUserBalanceByID(user_id, newBalance)
    res.status(200).send({message: "Transaction successful"})
})

export default router