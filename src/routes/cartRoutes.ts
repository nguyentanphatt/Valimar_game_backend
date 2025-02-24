import express from 'express';
import { addToCart, fetchCart, removeFromCart, totalCart } from '../controllers/cartControllers';

const router = express.Router();

router.post('/addtocart', addToCart);
router.post('/removefromcart', removeFromCart)
router.get('/getcart/:userId', fetchCart)
router.get('/totalcart/:userId', totalCart)


export default router;