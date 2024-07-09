const newProductForm = document.getElementById("new-product-form");
const productsGrid = document.getElementById("products-grid");
const noProducts = document.getElementById("no-products");
const deleteFields = document.getElementById("delete-fields");

window.deleteProduct = (index) => {
  let productosList =
    JSON.parse(localStorage.getItem("list-of-products")) || [];
  productosList.splice(index, 1);
  localStorage.setItem("list-of-products", JSON.stringify(productosList));
  renderProductos();
  toggle(productosList);
};

const toggle = (productosList) => {
  if (productosList.length === 0) {
    noProducts.style.display = "block";
  } else {
    noProducts.style.display = "none";
  }
};

const renderProductos = () => {
  productsGrid.innerHTML = "";

  let productosList = JSON.parse(localStorage.getItem("list-of-products")) || [];

  productosList.forEach((producto, index) => {
    const price = parseFloat(producto.price);

    const productoCard = document.createElement("div");
    productoCard.classList.add("card");
    productoCard.innerHTML = `
        <img src="${producto.imagenUrl}" alt="${producto.name}">
        <div class="card-container--info">
            <p>${producto.name}</p>
            <div class="card-container--value">
                <p>$${price.toFixed(2)}</p>
                <img src="./img/delete.png" alt="Eliminar" onclick="deleteProduct(${index})">
            </div>
        </div>
    `;
    productsGrid.appendChild(productoCard);
  });

  toggle(productosList);
};

newProductForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const imagenUrl = document.getElementById("imagenUrl").value;

  if (isNaN(price) || price <= 0) {
    alert("Ingrese un precio valido.");
    return;
  }

  const nuevoProducto = { name, price, imagenUrl };

  let productosList = JSON.parse(localStorage.getItem("list-of-products")) || [];
  productosList.push(nuevoProducto);

  localStorage.setItem("list-of-products", JSON.stringify(productosList));

  renderProductos();
  toggle(productosList);

  newProductForm.reset();
});

deleteFields.addEventListener("click", () => {
  newProductForm.reset();
});

renderProductos();
toggle(JSON.parse(localStorage.getItem("list-of-products")) || []);