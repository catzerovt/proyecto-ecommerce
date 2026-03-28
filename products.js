// ===== PRODUCTS DATA =====
const customProductData = {
  1: {
    title: "Cable NYA unipolar 450/750V",
    image: "assets/images/cable-indeco-unipolar.jpg",
    category: "cables",
    price: 26.38
  },
  2: {
    title: "Cable THHN 600V",
    image: "assets/images/cable-thhn.jpg",
    category: "cables",
    price: 30.50
  },
  3: {
    title: "Cable flexible multipolar",
    image: "assets/images/cable-indeco-unipolar.jpg",
    category: "cables",
    price: 45.90
  },
  4: {
    title: "Reflector LED Philips 200W",
    image: "assets/images/reflector-philips.jpg",
    category: "lighting",
    price: 233.03
  },
  5: {
    title: "Luminaria industrial LED",
    image: "assets/images/iluminacion.jpg",
    category: "lighting",
    price: 120.00
  },
  6: {
    title: "Panel LED 60x60",
    image: "assets/images/panel-led.jpg",
    category: "lighting",
    price: 85.00
  },
  7: {
    title: "Tablero eléctrico metálico",
    image: "assets/images/distribuicion.jpg",
    category: "distribution",
    price: 180.00
  },
  8: {
    title: "Interruptor diferencial",
    image: "assets/images/proteccion-control-baja-tension.jpg",
    category: "distribution",
    price: 65.00
  },
  9: {
    title: "Canaleta ranurada",
    image: "assets/images/canaleta-ranurada.jpg",
    category: "pipes",
    price: 18.00
  },
  10: {
    title: "Tubo PVC eléctrico",
    image: "assets/images/tubo-pvc.jpg",
    category: "pipes",
    price: 14.50
  },
  11: {
    title: "Curva EMT 90°",
    image: "assets/images/curva-emt.jpg",
    category: "pipes",
    price: 9.90
  },
  12: {
    title: "Caja de paso galvanizada",
    image: "assets/images/caja-paso.jpg",
    category: "pipes",
    price: 22.00
  },
  13: {
    title: "Contactor magnético",
    image: "assets/images/contactor.jpg",
    category: "protection",
    price: 79.00
  },
  14: {
    title: "Relé térmico",
    image: "assets/images/rele-termico.jpg",
    category: "protection",
    price: 58.00
  },
  15: {
    title: "Multímetro digital",
    image: "assets/images/multimetro.jpg",
    category: "measurement",
    price: 89.00
  },
  16: {
    title: "Pinza amperimétrica",
    image: "assets/images/pinza-amperimetrica.jpg",
    category: "measurement",
    price: 115.00
  },
  17: {
    title: "Guantes dieléctricos Clase 0",
    image: "assets/images/guante-aislante.jpg",
    category: "safety",
    price: 67.61
  },
  18: {
    title: "Casco de seguridad industrial",
    image: "assets/images/casco.jpg",
    category: "safety",
    price: 40.00
  },
  19: {
    title: "Terminal de cobre",
    image: "assets/images/terminal-cobre.jpg",
    category: "installation",
    price: 8.90
  },
  20: {
    title: "Brida plástica",
    image: "assets/images/brida-plastica.jpg",
    category: "installation",
    price: 6.50
  }
};

// ===== PRODUCTS =====
let allProducts = [];
let modalTimeout;

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

function showCartModal(product) {
  const modal = document.getElementById("cart-modal");
  const title = document.getElementById("modal-title");
  const image = document.getElementById("modal-image");

  if (!modal || !title || !image) return;

  title.textContent = product.title;
  image.src = product.image;
  image.alt = product.title;

  modal.classList.add("show");

  clearTimeout(modalTimeout);

  modalTimeout = setTimeout(() => {
    modal.classList.remove("show");
  }, 2500);
}

function setupCartModal() {
  return;
}

function addToCart(product) {
  const cart = getCart();
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartCount();
  showCartModal(product);
}

function getCategoryName(category) {
  const categoryMap = {
    cables: "Cables y Conductores",
    distribution: "Distribución Eléctrica",
    lighting: "Iluminación",
    safety: "Seguridad Eléctrica",
    pipes: "Tuberías y Canalización",
    protection: "Protección y Control",
    installation: "Materiales de Instalación",
    measurement: "Instrumentos de Medición"
  };

  return categoryMap[category] || category;
}

function renderProducts(products) {
  const container = document.getElementById("products-container");

  if (!container) return;

  container.innerHTML = "";

  products.forEach((product) => {
    const customData = customProductData[product.id] || {};

    const productTitle = customData.title || product.title;
    const productImage = customData.image || product.image;
    const productCategory = customData.category || product.category;
    const productPrice = customData.price || product.price;
    const categoryName = getCategoryName(productCategory);

    container.innerHTML += `
      <article class="product-card">
        <button class="wishlist-btn">
          <img src="assets/icons/heart.svg" alt="wishlist">
        </button>

        <div class="product-image">
          <img src="${productImage}" alt="${productTitle}">
        </div>

        <div class="product-info">
          <span class="product-brand">${categoryName}</span>
          <h3 class="product-title">${productTitle}</h3>
          <span class="product-sku">SKU: ${product.id}</span>
          <div class="product-price">S/ ${productPrice}</div>

          <button
            class="product-cart-btn add-to-cart-btn"
            data-id="${product.id}"
            data-title="${productTitle}"
            data-price="${productPrice}"
            data-image="${productImage}"
            data-category="${productCategory}"
          >
            Agregar al carrito
          </button>
        </div>
      </article>
    `;
  });

  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = {
        id: Number(button.dataset.id),
        title: button.dataset.title,
        price: Number(button.dataset.price),
        image: button.dataset.image,
        category: button.dataset.category
      };

      addToCart(product);
    });
  });
}

function setupFilters() {
  const filterButtons = document.querySelectorAll(".category-filters button");

  if (!filterButtons.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.category;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      if (selectedCategory === "all") {
        renderProducts(allProducts);
        return;
      }

      const filteredProducts = allProducts.filter((product) => {
        const customData = customProductData[product.id] || {};
        const productCategory = customData.category || product.category;

        return productCategory === selectedCategory;
      });

      renderProducts(filteredProducts);
    });
  });
}

function loadProducts() {
  const container = document.getElementById("products-container");

  if (!container) return;

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      allProducts = products.slice(0, 20);
      renderProducts(allProducts);
      setupFilters();
      setupCartModal();
      updateCartCount();
    })
    .catch((error) => {
      console.error("Error loading products:", error);
    });
}

loadProducts();

// ===== WHATSAPP =====
const whatsappBtn = document.querySelector(".whatsapp-btn");
const whatsappMessage = document.getElementById("whatsapp-message");

if (whatsappBtn) {
  setTimeout(() => {
    whatsappBtn.classList.add("bounce");
  }, 300);

  let soundPlayed = false;

  whatsappBtn.addEventListener("mouseenter", () => {
    if (!soundPlayed) {
      const sound = new Audio("assets/sounds/pop.mp3");
      sound.volume = 0.18;
      sound.play().catch(() => {});
      soundPlayed = true;
    }
  });

  whatsappBtn.addEventListener("mouseleave", () => {
    soundPlayed = false;
  });
}

if (whatsappMessage) {
  setTimeout(() => {
    whatsappMessage.style.transition = "opacity 0.35s ease, transform 0.35s ease";
    whatsappMessage.style.opacity = "0";
    whatsappMessage.style.transform = "translateY(8px) scale(0.98)";
  }, 7000);
}