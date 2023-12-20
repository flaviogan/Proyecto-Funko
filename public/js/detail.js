document.addEventListener("DOMContentLoaded", function () {
    console.log('script items.js');
  const add = document.querySelector("#add");
  const substract = document.querySelector("#substract");
  const quantity = document.querySelector("#quantity");

  add.addEventListener('click', () => quantity.value = Number(quantity.value) + 1);

  subtract.addEventListener('click', () => {
      const currentQuantity = Number(quantity.value);
      if (currentQuantity > 1) {
          quantity.value = currentQuantity - 1;
      } else {
          quantity.value = 1;
      }
  });
});