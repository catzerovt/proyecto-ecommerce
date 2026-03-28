function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const countElement = document.getElementById("cart-count");

  if (!countElement) return;

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  countElement.textContent = totalItems;
}

function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  renderCart();
}

function updateQuantity(productId, change) {
  let cart = getCart();

  cart = cart.map((item) => {
    if (item.id === productId) {
      item.quantity += change;

      if (item.quantity < 1) {
        item.quantity = 1;
      }
    }
    return item;
  });

  saveCart(cart);
  renderCart();
}

function renderCart() {
  const cartContainer = document.getElementById("cart-container");
  const cartTotal = document.getElementById("cart-total");
  const cartItemsCount = document.getElementById("cart-items-count");

  if (!cartContainer || !cartTotal || !cartItemsCount) return;

  const cart = getCart();

  updateCartCount();
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p>Tu carrito está vacío.</p>`;
    cartTotal.textContent = "S/ 0.00";
    cartItemsCount.textContent = "0";
    return;
  }

  let total = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    totalItems += item.quantity;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-item-image">

        <div class="cart-item-info">
          <h3>${item.title}</h3>
          <p>Categoría: ${item.category}</p>
          <p>Precio: S/ ${item.price}</p>

          <div class="cart-item-quantity">
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>

          <button class="remove-btn" onclick="removeFromCart(${item.id})">
            Eliminar
          </button>
        </div>
      </div>
    `;
  });

  cartTotal.textContent = `S/ ${total.toFixed(2)}`;
  cartItemsCount.textContent = totalItems;
}

function showCheckoutModal() {
  const modal = document.getElementById("checkout-modal");

  if (!modal) return;

  modal.classList.add("show");
}

function checkout() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  localStorage.removeItem("cart");
  renderCart();
  showCheckoutModal();
}

const checkoutButton = document.getElementById("checkout-btn");

if (checkoutButton) {
  checkoutButton.addEventListener("click", checkout);
}

renderCart();