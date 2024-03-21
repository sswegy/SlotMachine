import express from "express"
import { getTransactions, getTransactionById, getTransactionsByUserID, createTransaction } from "../controllers/transactionsController.js"
const router = express.Router()

// GET TRANSACTION

router.get("/", async (req, res) => {
    const transactions = await getTransactions()
    res.status(200).send(transactions)
})

router.get("/id/:id", async (req, res) => {
    const id = req.params.id
    const transaction = await getTransactionById(id)

    if (!transaction) {
        return res.status(404).send({ message: "Transaction not found" })
    }
    res.status(200).send(transaction)
})

router.get("/user_id/:user_id", async (req, res) => {
    const user_id = req.params.user_id
    const transactions = await getTransactionsByUserID(user_id)

    if (!transactions) {
        return res.status(404).send({ message: "Transactions not found" })
    }
    res.status(200).send(transactions)
})

// POST TRANSACTION

router.post("/", async (req, res) => {
    var { type, user_id, amount } = req.body
    const result = await createTransaction(type, user_id, amount);

    if (result == null){
        return res.status(400).send({ message: "Not enough balance" })
    }
    if (result.success == false) {
        return res.status(404).send({ message: result.message });
    }

    res.status(200).send({ message: "Transaction successful" })
})

export default router