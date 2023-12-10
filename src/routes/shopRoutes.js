const express = require('express');
const router = express.Router();

//const shopController = require("../controllers/shopControllers");

const shopControllers = require("../controllers/shopControllers");

  //"../controller/shopController");

//router.get("/shop", shopController.shopView); 
router.get("/", shopControllers.shopView);
router.get('/detail/:id', shopControllers.detailView);


router.post('/detail/:id/add', shopControllers.addToCart);
router.get('/cart', shopControllers.cartView);
router.post('/cart', shopControllers.checkout);

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