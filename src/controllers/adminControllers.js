const { getAll } = require('../models/itemModel');

const ItemsService = require('../services/itemServices');
const CategoryService = require('../services/categoryService');
const LicenceService = require('../services/licenceService');
 const { conn } = require("../config/conn");
 const path = require("path");

//module.exports = {
const adminControllers = {
  adminView: async (req, res) => {
    const { data } = await ItemsService.getAllItems();
    res.render( './admin/admin',
    {
      view: {
        title: 'List of Products | Admin Funkoshop'
      },
      items: data
    });
  },
    itemsView: async (req, res) => {
        let data = await getAll();

        if (data.isError) {
            data = 'Hubo un error';
        }

        res.send(data);
    }, // *borrar
  createView:  async (req, res) =>{
    const { data: categories } = await CategoryService.getAllItemsCategories();
    const { data: licences } = await LicenceService.getAllItemsLicences();

    res.render('./admin/create', {
      view: {
        title: 'Create Product | Admin Funkoshop'
            },
            categories,
            licences
    });
  },
  createItem:  async (req, res) => {
    const item = req.body;
    const files = req.files;
    console.log('createItems');
    console.log(files);
    await ItemsService.createItem(item, files);
 
    res.redirect('/admin');
  },
   bulkCreate:  async (req, res) => {
    console.log('bulkCreate');
     const items = req.body;
     const result = await ItemsService.create(items.map(el => Object.values(el)));
     res.send(result);
   },
   
  editView:  async (req, res) => {
    const id = req.params.id;
	console.log('ID=>', id);
    const { data: categories } = await CategoryService.getAllItemsCategories();
    const { data: licences } = await LicenceService.getAllItemsLicences();
    const { data } = await ItemsService.getItem(id);
    console.log(categories, licences);
    res.render('./admin/edit', {
      view: {
        title: `Edit Product #${id} | Admin Funkoshop`
      },
      item: data[0],
      categories,
      licences
    });
  },
  editItem:  async (req, res) => {
    const id = req.params.id;
    const item = req.body;
    const files = req.files;

    await ItemsService.editItem(item, files, id);
    res.redirect('/admin');
  },
  deleteItem:  async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await ItemsService.deleteItem(id);
    res.redirect('/admin');
  },
  
  loginView:  (req, res) => res.render('./auth/login', {
    view: {
      title: 'Login | Funkoshop'
    }
  }),

  loginUser:  async (req, res) => {
    const [rows] = await conn.query("SELECT * FROM user WHERE email LIKE ?", [
      req.body.email,
    ]);
  console.log(rows.length);
    if (rows.length == 0) {
      //res.render("./auth/login", {
         res.render(path.resolve(__dirname, "../views/admin/login"), {
      // res.render("/admin/login", {
        values: req.body,
        errors: [{ msg: "El correo y/o contraseña son incorrectos" }],
        layout: "layouts/auth",
      });
    } else if (!(await req.body.password == rows[0].password)) {
      res.render("auth/login", {
        values: req.body,
        errors: [{ msg: "El correo y/o contraseña son incorrectos" }],
        layout: "layouts/auth",
      });
    } else {
      console.log('logueado!!!');
        return res.redirect("/admin?isLogged=true");
      }
  
      res.redirect("/");
    
  },


  registerView:  (req, res) => res.render('./auth/register', {
    view: {
      title: 'Register | Funkoshop'
    }
  }),
  registerUser:  (req, res) => res.send('Register Route that receive the data when user click register button'),
}

module.exports = adminControllers;