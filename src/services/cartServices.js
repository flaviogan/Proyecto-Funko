class CartService {
    static addToCart(cart, item, files, quantity = 1) {
       var cart = cart || [];
        const existingItemIndex = cart.findIndex(cartItem => cartItem.product_id === item.product_id);

        if (existingItemIndex !== -1) {
            // Si el artículo ya está en el carrito, actualiza la cantidad
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Si no está en el carrito, se agrega la cantidad solicitada
            cart.push({
                product_id: item.product_id,
                image_front: item.image_front,
                product_name: item.product_name,
                licence_name: item.licence_name,
                price: item.price,
                quantity: quantity,
                total: item.price * quantity
            });
        }

        // Retorna el carrito actualizado
        return cart;
    }
}

// Servicio para actualizar la cantidad de un producto en el carrito
const updateQuantity = async (productId, newQuantity) => {
    try {
        // Lógica para actualizar la cantidad en la base de datos
        await ItemModel.updateQuantity(productId, newQuantity);
        const response = {
            isError: false,
            message: `Cantidad actualizada exitosamente.`
        };
        return response;
    } catch (error) {
        const errorResponse = {
            isError: true,
            message: `Error al actualizar la cantidad: ${error}`
        };
        return errorResponse;
    }
};

// Servicio para eliminar un producto del carrito
const deleteCart = async (productId) => {
    try {
        // Elimina el producto del carrito en la base de datos

        // Lógica para eliminar el producto del carrito en la base de datos
        await ItemModel.deleteCart(productId);
        const response = {
            isError: false,
            message: `Producto eliminado exitosamente.`
        };
        return response;
    } catch (error) {
        const errorResponse = {
            isError: true,
            message: `Error al eliminar el producto del carrito: ${error}`
        };
        return errorResponse;
    }
};

// Configuramos la paginación de productos
const getPaginated = async (page, limit) => {
    try {
        const totalItemsResponse = await ItemModel.getAll();
        const totalItems = totalItemsResponse.data.length;

        const totalPages = Math.ceil(totalItems / limit);

        const offset = (page - 1) * limit;
        const response = await ItemModel.getPaginated(offset, limit);

        return {
            isError: false,
            data: response.data,
            totalPages
        };
    } catch (error) {
        console.error('Error en getPaginated:', error);
        return {
            isError: true,
            message: 'Error al obtener datos paginados.'
        };
    }
}

module.exports = {
    getPaginated,
    updateQuantity,
    deleteCart
};
module.exports = CartService;
