import express from "express";
import { 
  getConnectionsHistory, 
  getConnectionsHistoryByUserID, 
  getConnectionsHistoryByUserIDByWeek, 
  createConnectionsHistory 
} from "../controllers/connectionsHistoryController.js";

const router = express.Router();

// GET CONNECTIONS HISTORY

router.get("/", async (req, res) => {
  const connectionsHistory = await getConnectionsHistory();
  res.status(200).send(connectionsHistory);
});

router.get("/user_id", async (req, res) => {
  const user_id = req.query.user_id;
  const connectionsHistory = await getConnectionsHistoryByUserID(user_id);

  if (!connectionsHistory) {
    return res.status(400).send({message: "Connection history not found"});
  }

  res.status(200).send(connectionsHistory);
});

router.get("/week", async (req, res) => {
  const user_id = req.query.user_id;
  const week_off_set = req.query.week_off_set;
  const connectionsHistory = await getConnectionsHistoryByUserIDByWeek(user_id, week_off_set);

  if (!connectionsHistory) {
    return res.status(400).send({message: "Connection history not found for the specified week"});
  }

  res.status(200).send(connectionsHistory);
});

// POST CONNECTIONS HISTORY

router.post("/", async (req, res) => {
  const { user_id, games_played } = req.body;
  await createConnectionsHistory(user_id, games_played);

  res.status(201).send({ message: "Connection history created successfully" });
});

export default router;
