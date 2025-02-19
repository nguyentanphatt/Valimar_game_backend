import express from "express";
import {
  getAllGames,
  createGame,
  getGameByName,
  getGameById,
  getGameWithDiscount,
  getGameNewRelease,
  getGameRelevantByGenre,
} from "../controllers/gameControllers";
const router = express.Router();

router.get("/", getAllGames);
router.post("/", createGame);
router.get("/discount", getGameWithDiscount);
router.get("/newrelease", getGameNewRelease)

router.get("/:name", getGameByName);
router.get("/gamedetails/:id", getGameById);
router.get("/relevant/:firstGenre", getGameRelevantByGenre)


export default router;
