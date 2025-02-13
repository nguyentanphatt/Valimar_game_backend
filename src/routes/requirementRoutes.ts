import express from 'express';
import { createRequirement, getRequirementById } from '../controllers/requirementController';
const router = express.Router();

router.post('/', createRequirement);
router.get('/:id', getRequirementById);

export default router;
