import express from 'express';
import { addScreenshot } from '../controllers/screenshotController';
const router = express.Router();

router.post('/', addScreenshot);

export default router;