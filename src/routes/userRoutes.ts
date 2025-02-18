import express from 'express';
import { signup, login, userProfile } from '../controllers/userControllers';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', userProfile);

export default router;
