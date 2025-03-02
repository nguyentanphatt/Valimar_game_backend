import express from "express";
import { checkPromocode } from "../controllers/promocodeController";
const router = express.Router();
router.post('/', checkPromocode)
export default router;