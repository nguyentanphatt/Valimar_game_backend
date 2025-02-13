import express from "express";
import { getAllGames, createGame, getGameByName, getGameById } from "../controllers/gameControllers";
const router = express.Router();

router.get("/", getAllGames);
router.post("/", createGame);
router.get("/:name", getGameByName);
router.get("/gamedetails/:id", getGameById);

export default router;