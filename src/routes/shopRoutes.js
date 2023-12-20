const express = require('express');
const router = express.Router();

const shopControllers = require("../controllers/shopControllers");
const cartControllers = require('../controllers/cartControllers');
  //"../controller/shopController");

//router.get("/shop", shopController.shopView); 
router.get("/", shopControllers.shopView);
router.get('/:filter', shopControllers.shopView);
router.get('/detail/:id', shopControllers.detailView);

router.post('/detail/:id/add', cartControllers.addToCart);
// router.get('/cart', cartControllers.cart);
// router.post('/cart/updateQuantity/:productId/:action', cartControllers.updateQuantity);
// router.post('/cart', cartControllers.checkout);
// router.delete('/cart/:id/delete', cartControllers.deleteCart);

// router.post('/detail/:id/add', shopControllers.addToCart);
// router.get('/cart', shopControllers.cartView);
// router.post('/cart', shopControllers.checkout);

// const {
//   shopView,
//   // itemView, 
//   addItemToCart,
//   cartView,
//   checkout,
// } = require('../controllers/shopControllers');


// router.get('/', shopView);
// // router.get('/item/:id', itemView);
// router.post('/item/:id/add', addItemToCart);
// router.get('/cart', cartView);
// router.post('/cart', checkout);

module.exports = router;