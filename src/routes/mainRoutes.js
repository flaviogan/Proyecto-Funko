const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers');
const {
  homeView,
  sliderView,
  contactView,
  aboutView,
  faqsView } = require('../controllers/mainControllers');

router.get('/', homeView);
router.get('/slider', sliderView);
router.get('/contact', contactView);
router.get('/about', aboutView);
router.get('/faqs', faqsView);

module.exports = router;