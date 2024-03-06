import express from "express"
import {getUsers, getUserByID, getUserByEmail, getUserPasswordByEmail, getUserBalanceByID, getUserByQRCode, createUser, updateUserBalanceByID, getUserByUserName} from "../controllers/usersController.js"
const router = express.Router()

// GET USERS

router.get("/", async (req, res) => {
    const users = await getUsers()
    res.status(200).send(users)
})

router.get("/id/:id", async (req, res) => {
    const id = req.params.id
    const user = await getUserByID(id)

    if(!user) {
        return res.status(404).send({message: "User not found"})
    }

    res.status(200).send(user)
})

router.get("/email/:email", async (req, res) => {
    const email = req.params.email
    const user = await getUserByEmail(email)

    if(!user) {
        return res.status(404).send({message: "User not found"})
    }
    res.status(200).send(user)
})

router.get("/qr_code/:qr_code", async (req, res) => {
    const qr_code = req.params.qr_code
    const user = await getUserByQRCode(qr_code)

    if(!user) {
        return res.status(404).send({message: "User not found"})
    }
    res.status(200).send(user)
})

router.get("/password/:email", async (req, res) => {
    const email = req.params.email
    const password = await getUserPasswordByEmail(email)

    if(!password) {
        return res.status(404).send({message: "Password not found"})
    }

    res.status(200).send(password)
})

router.get("/balance/:id", async (req, res) => {
    const id = req.params.id
    const balance = await getUserBalanceByID(id)

    if(!balance) {
        return res.status(404).send({message: "Balance not found"})
    }

    res.status(200).send(balance)
})

// POST USERS

router.post("/register", async (req, res) => {
    const {first_name, last_name, user_name, email, password} = req.body

    if(await getUserByEmail(email) || await getUserByUserName(user_name)) {
        return res.status(400).send({message: "User exists"})
    }

    await createUser(first_name, last_name, user_name, email, password)
    res.status(200).send(await getUserByEmail(email))
})

router.post("/login", async (req, res) => {
    const {email, password} = req.body
    const user = await getUserByEmail(email)

    if(!user) {
        return res.status(404).send({message: "User not found"})
    }

    const PASSWORD = await getUserPasswordByEmail(email)
    if(!password || password != PASSWORD) {
        console.log(PASSWORD)
        return res.status(400).send({message: "Wrong password"})
    }

    res.status(200).send(user)
})

// PUT USERS

router.put("/change_balance", async (req, res) => {
    const {id, balance} = req.body
    if(!await getUserByID(id)) {
        return res.status(404).send({message: "User not found"})
    }

    await updateUserBalanceByID(id, balance)
    res.status(200).send(await getUserByID(id))
})

export default router