const CartService = require('../services/cartServices');
const ItemsService = require('../services/itemServices')

const cartControllers = {
    addToCart: async (req, res) => {
        try {
            const id = req.params.id;
            const item = await ItemsService.getItem(id);
            const files = req.files || []; // Asegúrate de que files esté definido y sea un array
            console.log(item.length);
            if (item.data.length > 0) {
                // Agrega el artículo al carrito y actualiza req.session.cart
                req.session.cart = CartService.addToCart(req.session.cart, item.data[0], files);
                // res.send(`Item ${item.data[0].product_name} agregado al carrito.`);
                res.redirect('/cart/cart');
            } else {
                res.send('No se encontró el item para agregar al carrito.');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al agregar el artículo al carrito.');
        }
    },

    cart: (req, res) => {
        try {
            // Renderiza la página cart.ejs con los elementos del carrito almacenados en la sesión
            const cartItems = req.session.cart || [];

            res.render('../views/cart/cart', {
                view: {
                    title: "Carrito | Funkoshop"
                },
                cart: cartItems
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener el carrito.');
        }
    },


    getCartCount: (req, res) => {
        try {
            const cart = req.session.cart || [];
            const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    
            res.json({ cartCount });
        } catch (error) {
            console.error('Error en getCartCount:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
        // Actualiza las cantidades a medida que se agregan o quitan
        updateQuantity: async (req, res) => {
          try {
              const productId = req.params.productId;
              const action = req.params.action; // 'add' o 'subtract'
    
              // Obtener la cantidad desde item
              const cart = req.session.cart || [];
              const cartItem = cart.find(item => String(item.product_id) === String(productId));
    
              if (!cartItem) {
                  console.error(`Error: No se encontró el producto con ID ${productId} en el carrito`);
                  res.status(404).send('Producto no encontrado en el carrito');
                  return;
              }
    
              // Actualizar la cantidad
              if (action === 'add') {
                  cartItem.quantity += 1;
              } else if (action === 'subtract' && cartItem.quantity > 1) {
                  cartItem.quantity -= 1;
              }
    
              // Actualizar la cantidad y el total
              cartItem.total = cartItem.price * cartItem.quantity;
              res.json({ success: true, cart, cartItem });
    
          } catch (error) {
              console.error('Error en updateQuantity:', error);
              res.status(500).send('Error interno del servidor');
          }
      },
    
      // Elimina un producto del carrito de compras
      deleteCart: async (req, res) => {
          try {
              const productId = req.params.id;
    
              // Filtrar el producto del carrito
              const cart = req.session.cart || [];
              req.session.cart = cart.filter(item => String(item.product_id) !== String(productId));
    
              // Redirigir o responder según sea necesario
              res.json({ success: true, cart, deletedProductId: productId });
          } catch (error) {
              console.error('Error en deleteCart:', error);
              res.status(500).send('Error interno del servidor');
          }
      },
    
      checkout: (req, res) => res.send('Route to receive the selected products and init the buy process'),

    // updateCartItem: (req, res) => {
    //     const itemId = req.params.id;
    //     const newQuantity = parseInt(req.body.quantity);

    //     // Verifica si el carrito está en la sesión
    //     if (!req.session.cart) {
    //         return res.status(400).send('El carrito no está disponible.');
    //     }

    //     // Busca el índice del elemento en el carrito
    //     const itemIndex = req.session.cart.findIndex(item => item.product_id === itemId);

    //     // Verifica si el artículo está en el carrito
    //     if (itemIndex === -1) {
    //         return res.status(404).send('El artículo no está en el carrito.');
    //     }

    //     // Actualiza la cantidad del artículo en el carrito
    //     if (!isNaN(newQuantity) && newQuantity > 0) {
    //         req.session.cart[itemIndex].quantity = newQuantity;
    //     } else {
    //         return res.status(400).send('La cantidad proporcionada no es válida.');
    //     }

    //     res.redirect('/cart');
    // },

    // deleteCartItem: (req, res) => {
    //     try {
    //         const itemId = req.params.id;
    //         console.log('Deleting product with ID:', itemId);

    //         if (!req.session.cart) {
    //             console.log('No hay carrito en la sesión.');
    //             return res.status(404).json({ message: 'No hay carrito en la sesión.' });
    //         }

    //         console.log('Cart before deletion:', req.session.cart);

    //         // Filtra los productos que no coinciden con el ID proporcionado
    //         req.session.cart = req.session.cart.filter(item => item.product_id !== itemId);

    //         console.log('Cart after deletion:', req.session.cart);

    //         // Retorna un mensaje de éxito junto con el carrito actualizado
    //         res.status(200).json({
    //             message: 'Producto eliminado del carrito exitosamente.',
    //             cart: req.session.cart
    //         });
    //     } catch (error) {
    //         console.error('Error al eliminar el producto del carrito:', error);
    //         res.status(500).json({ message: 'Error al eliminar el producto del carrito.' });
    //     }
    // },

    // // res.redirect('/shop/cart'); // Cambia '/cart' por '/shop/cart' si es necesario

    // checkout: (req, res) => {

    //     const data = req.body;
    //     res.send(data);
    // }
};

module.exports = cartControllers;
