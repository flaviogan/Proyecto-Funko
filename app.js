const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const initSession = require('./src/utils/session');
//const cors = require('cors');
require('dotenv').config();
//seteamos las variables de entorno
//dotenv.config({path: './env/.env'}); 


//const multer = require('multer');

//const cookieParser = require('cookie-parser')


// Routes import
const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
// const userRoutes = require('./src/routes/userRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
//const { isLogged } = require('./src/middlewares/login');
const cartRoutes = require('./src/routes/cartRoutes');
// const upload = multer({ dest: '../../public/img' });

// //Config la carpta public
//const publicPath = path.resolve(__dirname, './public');
//const publico = path.resolve(__dirname, './publico');
app.use(express.static(path.resolve(__dirname, './public')));
// app.use(express.static(publicPath));
app.keys= ['dieueyf7huienejnfef'];
app.use(initSession());
app.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    next();
});
app.use(methodOverride('_method'))

// Configuración de EJS (del motor de vistas)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

//para procesar datos enviados desde el formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));



//app.use(session({
//	secret: 'secret',
//	resave: true,
//	saveUninitialized: true
//}));


//cookieParser.set
app.set('cookieParser', 'dev');


// Routers

app.use('/', mainRoutes);
 
app.use('/shop',shopRoutes);
app.use('/admin', adminRoutes);
app.use('/cart',cartRoutes);
app.get('/admin', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});


app.use((req, res, next) => {
    res.status(404).render('404')
})


// app.use(isLogged);
// {
//   isLogged: req.isLogged
// }

const PORT = process.env.APP_PORT || 3001;  

// Iniciar el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log('Servidor activo en el puerto 3000');
  console.log(`http://localhost:${PORT}`);
});

