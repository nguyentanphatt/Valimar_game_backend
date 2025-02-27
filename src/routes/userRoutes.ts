import express from 'express';
import { signup, login, userProfile, userLoginWithOath, changeSubcriptionOfUser, getUserById } from '../controllers/userControllers';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/oathlogin', userLoginWithOath)
router.post('/subscription', changeSubcriptionOfUser)
router.get('/userdetail/:userId', getUserById);
router.get('/profile/:email', userProfile);


export default router;
