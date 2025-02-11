import express from "express";
import { getAllGames, createGame } from "../controllers/gameControllers";
const router = express.Router();

router.get("/", getAllGames);
router.post("/", createGame);

export default router;