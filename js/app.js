
const products = document.querySelectorAll(".product-card");
const btnRegisterVote = document.querySelector(".vote-button");

let selectedItem = null; // Variable para almacenar el producto seleccionado

// Agregamos un evento de clic a cada tarjeta de producto
for (let product of products) {
    product.addEventListener("click", function () {
        // Reiniciamos la clase 'selected' de todas las tarjetas
        for (let item of products) {
            item.classList.remove("selected");
        }
        // Añadimos la clase 'selected' al producto actual
        product.classList.add("selected");

        // Guardamos el producto seleccionado en una variable
        selectedItem = product.querySelector("img").alt; // Usamos el atributo alt como identificador

        // Habilitamos el botón de registro de voto
        btnRegisterVote.removeAttribute("disabled");
    });
};