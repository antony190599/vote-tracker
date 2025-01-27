const products = document.querySelectorAll(".product");
const btnRegisterVote = document.querySelector("#btn-register-vote");
const voteForm = document.getElementById("vote-form");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

let selectedItem = null;

function addTooltipToDiv(product) {
  const description = product.dataset.description;
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.textContent = description;

  product.appendChild(tooltip);
}

for (let product of products) {
  // Agregamos un tooltip a cada div
  addTooltipToDiv(product);

  product.addEventListener("click", function () {
    // Reiniciamos los botones, eliminando la clase "selected"
    for (let item of products) {
      item.classList.remove("selected");
    }

    // Agregamos la clase "selected" al producto clicado
    product.classList.add("selected");

    selectedItem = product.dataset.item;

    btnRegisterVote.classList.remove("disabled");
  });
}

function getCurrentSelectedProduct() {
  for (let product of products) {
    if (product.classList.contains("selected")) {
      return product;
    }
  }
  return null;
}

function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function createContentModal(product) {
  // Limpiar el contenido dentro del modal para evitar duplicados
  modal.innerHTML = "";
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalImg = document.createElement("img");
  modalImg.src = product.image;
  modalImg.alt = product.title;

  const title = document.createElement("h2");
  title.textContent = product.title;

  const description = document.createElement("p");
  description.textContent = product.description;

  const voteQty = document.createElement("p");
  voteQty.textContent = "Cantidad de votos: 0";

  const btnClose = document.createElement("button");
  btnClose.textContent = "Cancelar";

  btnClose.addEventListener("click", closeModal);

  modalContent.appendChild(modalImg);
  modalContent.appendChild(title);
  modalContent.appendChild(description);
  modalContent.appendChild(voteQty);
  modalContent.appendChild(btnClose);

  modal.appendChild(modalContent);
}

voteForm.addEventListener("submit", function (event) {
  // Evitamos que el formulario recargue la página
  event.preventDefault();

  const currentSelectedProduct = getCurrentSelectedProduct();

  if (currentSelectedProduct) {
    openModal();
    createContentModal({
      image: currentSelectedProduct.querySelector("img").src,
      title: currentSelectedProduct.dataset.title,
      description: currentSelectedProduct.dataset.description,
    });
  }
});

// Cerramos el modal al hacer clic en el overlay
overlay.addEventListener("click", closeModal);
