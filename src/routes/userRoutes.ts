import express from 'express';
import { signup, login, userProfile, userLoginWithOath, changeSubcriptionOfUser } from '../controllers/userControllers';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/oathlogin', userLoginWithOath)
router.get('/profile/:email', userProfile);
router.post('/subscription:/:email', changeSubcriptionOfUser)

export default router;
