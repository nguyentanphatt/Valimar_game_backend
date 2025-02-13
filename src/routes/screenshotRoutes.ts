import express from 'express';
import { addScreenshot, getScreenshotsById } from '../controllers/screenshotController';
const router = express.Router();

router.post('/', addScreenshot);
router.get('/:id', getScreenshotsById);

export default router;