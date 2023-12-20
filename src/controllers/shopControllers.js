const path = require("path");
const ItemsService = require('../services/itemServices');


module.exports = {
  shopView:  async (req, res) => {
    const id = req.params.filter;
    console.log('id');
    console.log(id);
    const itemResponse = await ItemsService.getItem(id);
    const allItemsResponse = await ItemsService.getAllItems();

    const { data: item } = itemResponse;
    const { data: allItems } = allItemsResponse;

    let relatedItems =allItems;
    if (id > 0){

      console.log(item[0].licence_id);
   

    // Filtra los items para incluir solo aquellos de la misma licencia 
  relatedItems = allItems.filter(i => i.licence_id == id );
   //  relatedItems = allItems.filter(i => i.licence_id === item[0].licence_id);
  
  }  
    
    res.render(path.resolve(__dirname, "../views/shop/shop"), {
    // res.render( 'shop',{
      view: {
        title: "Shop | Funkoshop"
      },
      enableGlide: true,
      sliderTitle: 'Productos Relacionados',
      items: relatedItems
      
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

//   getCartCount: (req, res) => {
//     try {
//         const cart = req.session.cart || [];
//         const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

//         res.json({ cartCount });
//     } catch (error) {
//         console.error('Error en getCartCount:', error);
//         res.status(500).json({ error: 'Error interno del servidor' });
//     }
// },
//     // Actualiza las cantidades a medida que se agregan o quitan
//     updateQuantity: async (req, res) => {
//       try {
//           const productId = req.params.productId;
//           const action = req.params.action; // 'add' o 'subtract'

//           // Obtener la cantidad desde item
//           const cart = req.session.cart || [];
//           const cartItem = cart.find(item => String(item.product_id) === String(productId));

//           if (!cartItem) {
//               console.error(`Error: No se encontró el producto con ID ${productId} en el carrito`);
//               res.status(404).send('Producto no encontrado en el carrito');
//               return;
//           }

//           // Actualizar la cantidad
//           if (action === 'add') {
//               cartItem.quantity += 1;
//           } else if (action === 'subtract' && cartItem.quantity > 1) {
//               cartItem.quantity -= 1;
//           }

//           // Actualizar la cantidad y el total
//           cartItem.total = cartItem.price * cartItem.quantity;
//           res.json({ success: true, cart, cartItem });

//       } catch (error) {
//           console.error('Error en updateQuantity:', error);
//           res.status(500).send('Error interno del servidor');
//       }
//   },

//   // Elimina un producto del carrito de compras
//   deleteCart: async (req, res) => {
//       try {
//           const productId = req.params.id;

//           // Filtrar el producto del carrito
//           const cart = req.session.cart || [];
//           req.session.cart = cart.filter(item => String(item.product_id) !== String(productId));

//           // Redirigir o responder según sea necesario
//           res.json({ success: true, cart, deletedProductId: productId });
//       } catch (error) {
//           console.error('Error en deleteCart:', error);
//           res.status(500).send('Error interno del servidor');
//       }
//   },

//   checkout: (req, res) => res.send('Route to receive the selected products and init the buy process'),
};