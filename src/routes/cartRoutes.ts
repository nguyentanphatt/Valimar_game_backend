import express from 'express';
import { addToCart, fetchCart, fetchCartByCartId, removeFromCart, totalCart, updateCart } from '../controllers/cartControllers';

const router = express.Router();

router.post('/addtocart', addToCart);
router.post('/removefromcart', removeFromCart)
router.post('/updatecart', updateCart)
router.get('/getcart/:userId', fetchCart)
router.get('/getcartbyid/:id', fetchCartByCartId)
router.get('/totalcart/:userId', totalCart)


export default router;