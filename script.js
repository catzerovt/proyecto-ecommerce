// ===== HERO SLIDER =====

const slider = document.querySelector('.hero-slider');
const track = document.querySelector('.hero-track');
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let direction = 1;
let autoPlay;

function setSliderSizes() {
    const sliderWidth = Math.round(slider.getBoundingClientRect().width);

    slides.forEach((slide) => {
        slide.style.width = `${sliderWidth}px`;
    });

    track.style.width = `${sliderWidth * slides.length}px`;
    moveToSlide(currentIndex, false);
}

function moveToSlide(index, animate = true) {
    const sliderWidth = Math.round(slider.getBoundingClientRect().width);

    if (!animate) {
        track.style.transition = 'none';
    } else {
        track.style.transition = 'transform 0.9s ease-in-out';
    }

    track.style.transform = `translate3d(-${index * sliderWidth}px, 0, 0)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    if (!animate) {
        requestAnimationFrame(() => {
            track.style.transition = 'transform 0.9s ease-in-out';
        });
    }
}

function nextSlideBounce() {
    currentIndex += direction;

    if (currentIndex >= slides.length - 1) {
        currentIndex = slides.length - 1;
        direction = -1;
    } else if (currentIndex <= 0) {
        currentIndex = 0;
        direction = 1;
    }

    moveToSlide(currentIndex, true);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;

        if (currentIndex === slides.length - 1) {
            direction = -1;
        } else if (currentIndex === 0) {
            direction = 1;
        }

        moveToSlide(currentIndex, true);
        restartAutoPlay();
    });
});

function startAutoPlay() {
    autoPlay = setInterval(nextSlideBounce, 6000);
}

function restartAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
}

window.addEventListener('resize', () => {
    setSliderSizes();
});

setSliderSizes();
startAutoPlay();

// ===== CARRUSEL DE CATEGORIAS =====

const catTrack = document.querySelector('.categories-track');
const catPages = document.querySelectorAll('.categories-page');
const catDots = document.querySelectorAll('.cat-dot');
const prevBtn = document.querySelector('.cat-arrow.prev');
const nextBtn = document.querySelector('.cat-arrow.next');

let current = 0;

function updateSlider() {
    catTrack.style.transform = `translateX(-${current * 100}%)`;

    catDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
    });
}

nextBtn.addEventListener('click', () => {
    if (current < catPages.length - 1) {
        current++;
        updateSlider();
    }
});

prevBtn.addEventListener('click', () => {
    if (current > 0) {
        current--;
        updateSlider();
    }
});

catDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        current = index;
        updateSlider();
    });
});

// ===== CARRUSEL SOLUCIONES POR INDUSTRIA =====

const industryTrack = document.querySelector('.industries-track');
const industryDots = document.querySelectorAll('.industry-dot');
const prevIndustry = document.querySelector('.prev-industry');
const nextIndustry = document.querySelector('.next-industry');

const originalIndustryCards = Array.from(document.querySelectorAll('.industry-card'));
const visibleIndustryCards = 3;
const originalTotal = originalIndustryCards.length;

let industryIndex = visibleIndustryCards;


for (let i = originalTotal - visibleIndustryCards; i < originalTotal; i++) {
    const clone = originalIndustryCards[i].cloneNode(true);
    clone.classList.add('clone');
    industryTrack.insertBefore(clone, industryTrack.firstChild);
}


for (let i = 0; i < visibleIndustryCards; i++) {
    const clone = originalIndustryCards[i].cloneNode(true);
    clone.classList.add('clone');
    industryTrack.appendChild(clone);
}

const allIndustryCards = industryTrack.querySelectorAll('.industry-card');

function updateIndustryCarousel(animate = true) {
    const cardWidth = allIndustryCards[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(industryTrack).gap) || 0;
    const moveX = industryIndex * (cardWidth + gap);

    industryTrack.style.transition = animate ? 'transform 0.7s ease' : 'none';
    industryTrack.style.transform = `translateX(-${moveX}px)`;

    let dotIndex = (industryIndex - visibleIndustryCards) % originalTotal;
    if (dotIndex < 0) dotIndex += originalTotal;

    industryDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === dotIndex);
    });
}

nextIndustry.addEventListener('click', () => {
    industryIndex++;
    updateIndustryCarousel(true);
});

prevIndustry.addEventListener('click', () => {
    industryIndex--;
    updateIndustryCarousel(true);
});

industryTrack.addEventListener('transitionend', () => {
    if (industryIndex >= originalTotal + visibleIndustryCards) {
        industryIndex = visibleIndustryCards;
        updateIndustryCarousel(false);
    }

    if (industryIndex < visibleIndustryCards) {
        industryIndex = originalTotal + visibleIndustryCards - 1;
        updateIndustryCarousel(false);
    }
});

industryDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        industryIndex = index + visibleIndustryCards;
        updateIndustryCarousel(true);
    });
});

window.addEventListener('resize', () => {
    updateIndustryCarousel(false);
});

updateIndustryCarousel(false);


// ===== CARRUSEL PRODUCTOS DESTACADOS =====

const productsTrack = document.querySelector('.products-track');
const productDots = document.querySelectorAll('.product-dot');
const prevProduct = document.querySelector('.prev-product');
const nextProduct = document.querySelector('.next-product');

const originalProductCards = Array.from(document.querySelectorAll('.product-card'));
const visibleProductCards = 5;
const originalProductsTotal = originalProductCards.length;

let productIndex = visibleProductCards;


for (let i = originalProductsTotal - visibleProductCards; i < originalProductsTotal; i++) {
    const clone = originalProductCards[i].cloneNode(true);
    clone.classList.add('clone');
    productsTrack.insertBefore(clone, productsTrack.firstChild);
}


for (let i = 0; i < visibleProductCards; i++) {
    const clone = originalProductCards[i].cloneNode(true);
    clone.classList.add('clone');
    productsTrack.appendChild(clone);
}

const allProductCards = productsTrack.querySelectorAll('.product-card');

function updateProductsCarousel(animate = true) {
    const cardWidth = allProductCards[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(productsTrack).gap) || 0;
    const moveX = productIndex * (cardWidth + gap);

    productsTrack.style.transition = animate ? 'transform 0.7s ease' : 'none';
    productsTrack.style.transform = `translateX(-${moveX}px)`;

    let dotIndex = (productIndex - visibleProductCards) % originalProductsTotal;
    if (dotIndex < 0) dotIndex += originalProductsTotal;

    productDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === dotIndex);
    });
}

nextProduct.addEventListener('click', () => {
    productIndex++;
    updateProductsCarousel(true);
});

prevProduct.addEventListener('click', () => {
    productIndex--;
    updateProductsCarousel(true);
});

productsTrack.addEventListener('transitionend', () => {
    if (productIndex >= originalProductsTotal + visibleProductCards) {
        productIndex = visibleProductCards;
        updateProductsCarousel(false);
    }

    if (productIndex < visibleProductCards) {
        productIndex = originalProductsTotal + visibleProductCards - 1;
        updateProductsCarousel(false);
    }
});

productDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        productIndex = index + visibleProductCards;
        updateProductsCarousel(true);
    });
});

window.addEventListener('resize', () => {
    updateProductsCarousel(false);
});

updateProductsCarousel(false);

// ===== COUNTER MARCAS =====
const brandsNumber = document.querySelector('.brands-number');

if (brandsNumber) {
    const target = Number(brandsNumber.dataset.target);
    let started = false;

    function animateBrandsCounter() {
        if (started) return;
        started = true;

        let current = 0;
        const increment = Math.ceil(target / 50);

        const timer = setInterval(() => {
            current += increment;

            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            brandsNumber.textContent = current;
        }, 30);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBrandsCounter();
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(brandsNumber);
}

// ===== CARRUSEL MARCAS =====
const brandsTrack = document.querySelector('.brands-track');
const brandPages = document.querySelectorAll('.brands-page');
const brandDots = document.querySelectorAll('.brand-dot');

if (brandsTrack) {
    let currentBrandPage = 0;
    const totalBrandPages = brandPages.length;

    function updateBrandsSlider() {
        brandsTrack.style.transform = `translateX(-${currentBrandPage * 100}%)`;

        brandDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentBrandPage);
        });
    }

    function nextBrandsSlide() {
        currentBrandPage++;

        if (currentBrandPage >= totalBrandPages) {
            currentBrandPage = 0;
        }

        updateBrandsSlider();
    }

    brandDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentBrandPage = index;
            updateBrandsSlider();
        });
    });

    setInterval(nextBrandsSlide, 3000);
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
    const cart = getCart();
    const countElement = document.getElementById("cart-count");

    if (!countElement) return;

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    countElement.textContent = totalItems;
}

updateCartCount();

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

function addToCart(product) {
    const cart = getCart();

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();
    showCartModal(product);
}

const homeButtons = document.querySelectorAll(".add-to-cart-home");

homeButtons.forEach((button) => {
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

let modalTimeout;

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

// SONIDOS WSP

const whatsappBtn = document.querySelector(".whatsapp-btn");

if (whatsappBtn) {
    whatsappBtn.addEventListener("mouseenter", () => {
        const sound = new Audio("assets/sounds/pop.mp3");
        sound.volume = 0.3;
        sound.play();
    });
}

window.addEventListener("load", () => {
    const sound = new Audio("assets/sounds/pop.mp3");
    sound.volume = 0.1;
    sound.play().catch(() => {});
});