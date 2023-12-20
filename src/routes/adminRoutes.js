    const express = require('express');
const router = express.Router();
const uploadFiles = require('../middlewares/uploadFiles');

const adminControllers = require('../controllers/adminControllers');

const validateInput = require('../middlewares/validator');
const {body}= require ('express-validator')



router.get('/', adminControllers.adminView);
router.get('/create', adminControllers.createView);
router.post('/create', uploadFiles.array('images',2), adminControllers.createItem);
router.post('/create/bulk', adminControllers.bulkCreate);
router.get('/edit/:id', adminControllers.editView);
router.put('/edit/:id', adminControllers.editItem);
router.delete('/delete/:id', adminControllers.deleteItem);

router.get('/login', adminControllers.loginView);
//router.post('/login', loginValidations, validateInput, loginController.loginUser);
router.post('/login', adminControllers.loginUser);
router.get('/register', adminControllers.registerView);
router.post('/register', adminControllers.registerUser);
const login =[
    body('email')
    .isEmail()
    .withMessage('Necesito que ingrese un correo valido'),
    body('password')
    .isLength({min:6})
    .isAlphanumeric()
    .withMessage('La contraseña debe tener al menos 6 caracteres y contener letras y numeros.')
]


module.exports = router;