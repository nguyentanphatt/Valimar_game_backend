import express from 'express';
import { createRequirement } from '../controllers/requirementController';
const router = express.Router();

router.post('/', createRequirement);

export default router;
