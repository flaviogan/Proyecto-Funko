const express = require('express');
const router = express.Router();

const cartControllers = require('../controllers/cartControllers');

router.post('/cart/:id/add', cartControllers.addToCart);
router.get('/cart', cartControllers.cart);
router.post('/cart/updateQuantity/:productId/:action', cartControllers.updateQuantity);
router.post('/cart', cartControllers.checkout);
router.delete('/cart/:id/delete', cartControllers.deleteCart);

module.exports = router;