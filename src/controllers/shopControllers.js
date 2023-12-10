const path = require("path");
const ItemsService = require('../services/itemServices');


module.exports = {
  shopView:  async (req, res) => {
    const items = await ItemsService.getAllItems();
    //console.log(items);
    const { data } = items;
    res.render(path.resolve(__dirname, "../views/shop/shop"), {
    // res.render( 'shop',{
      view: {
        title: "Shop | Funkoshop"
      },
      enableGlide: true,
      sliderTitle: 'Productos Relacionados',
      items: data
      
    });
  },
  detailView: async (req, res) => {
    // const id = req.params.id;
    // const item = await ItemsService.getItem(id);

    const id = req.params.id;
    const itemResponse = await ItemsService.getItem(id);
    const allItemsResponse = await ItemsService.getAllItems();

    const { data: item } = itemResponse;
    const { data: allItems } = allItemsResponse;

       //console.log('Estoy en shop-controler');
      //  if (!itemResponse[0]) {
      //   res.status(404).send('El producto con el ID seleccionado no existe o fue eliminado');
      //  }
   // Filtra los items para incluir solo aquellos de la misma licencia que el item individual
   const relatedItems = allItems.filter(i => i.licence_id === item[0].licence_id && i.product_id !== item[0].product_id);


    res.render(path.resolve(__dirname, "../views/shop/detail"), {
   // res.render('./shop/detail', {

        view: {
            title: "Items | Funkoshop"
        },
        item: item[0],
        enableGlide: true,
        sliderTitle: 'Productos Relacionados',
        items: relatedItems
      });
},
//addToCart: (req, res) => res.send('Route to add a item to cart'),
addToCart:  async (req, res) => {
  const id = req.params.id;
  const item = await ItemsService.getItem(id);
  const { data } = item;
  console.log('Estoy en addToCart shop-controler');
  if (!data[0]) {
    res.status(404).send('El producto con el ID seleccionado no existe o fue eliminado');
  }
  res.render(path.resolve(__dirname, "../views/shop/cart"), {
 // res.render('./shop/detail', {
  
    view: {
      title: "cart | Funkoshop"
    },
    item: data[0]
  });
},

  // cartView: (req, res) => res.send('Cart View Route'),
  cartView:  async (req, res) => {
    const id = req.params.id;
    const item = await ItemsService.getItem(id);
    const { data } = item;
    //console.log('Estoy en shop-controler');
    if (!data[0]) {
      res.status(404).send('El producto con el ID seleccionado no existe o fue eliminado');
    }
    res.render(path.resolve(__dirname, "../views/shop/cart"), {
   // res.render('./shop/detail', {
    
      view: {
        title: "Item | Funkoshop"
      },
      item: data[0]
    });
  },
  checkout: (req, res) => res.send('Route to receive the selected products and init the buy process'),
};