// const more1 = document.querySelector('#more1');
// const less1 = document.querySelector('#less1');
// const quantity1 = document.querySelector('#quantity1');
// const price1 = document.querySelector('#price1');

// more1.addEventListener('click', () => {
//     quantity1.value = Number(quantity1.value) + 1;

//     price1.innerHTML = "$ " + Number(quantity1.value) * 1799.99;
// });

// less1.addEventListener('click', () => {
//     if (quantity1.value != 0) {
//         quantity1.value = Number(quantity1.value) - 1;

//         price1.innerHTML = "$ " + Number(quantity1.value) * 1799.99;
//     }
// });

// more2.addEventListener('click', () => {
//     quantity2.value = Number(quantity2.value) + 1;

//     price2.innerHTML = "$ " + Number(quantity2.value) * 1799.99;
// });

// less2.addEventListener('click', () => {
//     if (quantity2.value != 0) {
//         quantity2.value = Number(quantity2.value) - 1;

//         price2.innerHTML = "$ " + Number(quantity2.value) * 1799.99;
//     }
// });

function deleteItem(productId) {
    console.log('Deleting product with ID:', productId);
    fetch(`/cart/cart/${productId}/delete`, {
        method: 'DELETE',
        credentials: 'same-origin',  // Esto es importante para manejar cookies correctamente
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                // Actualizar la interfaz después de la eliminación exitosa
                console.log('Producto eliminado exitosamente.');
                location.reload();
            } else {
                console.error('Error al eliminar el producto del carrito.');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud fetch:', error);
        });
}

