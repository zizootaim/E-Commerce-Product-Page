console.log("hello");
console.log("hi again");
// Toggle Menu
const open_icon = document.querySelector(".open-menu .fas"),
  nav = document.querySelector(".nav"),
  close_icon = document.querySelector(".close-menu .fas");

open_icon.addEventListener("click", () => {
  nav.classList.add("active");
});

close_icon.addEventListener("click", () => {
  nav.classList.remove("active");
});

// Slider
const slider = document.getElementById("slider"),
  slides = Array.from(document.querySelectorAll(".slide")),
  // Move Slider using Thumbnails
  thumbnails = Array.from(document.querySelectorAll(".thumbnails img"));
thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const slideID = thumb.dataset.id;
    moveSlider(slideID);
    activateThumbanil(slideID);
  });
});

const activateThumbanil = (slideIndex) => {
  thumbnails.forEach((thumb) => {
    thumb.classList.remove("active");
  });
  thumbnails[slideIndex].classList.add("active");
};

// Move Slider using Arrows Btns
const btns = Array.from(document.querySelectorAll(".slide-btn"));

let currentIndex = 0;

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const right = btn.classList.contains("right");
    if (right) {
      currentIndex++;
    } else {
      currentIndex--;
    }

    if (currentIndex > slides.length - 1) {
      currentIndex = 0;
    }
    if (currentIndex < 0) {
      currentIndex = slides.length - 1;
    }
    moveSlider(currentIndex);
  });
});

const moveSlider = (slideIndex) => {
  slider.style = `transform: translateX(-${slideIndex * 100}%);`;
};

// Fullscreen Slider
if (window.innerWidth > 992) {
  const main = document.querySelector("main");
  // Show Fullscreen Slider
  const img = Array.from(
    document.querySelectorAll(".product .slider .slide img")
  );
  img.forEach((img) => {
    img.addEventListener("click", () => {
      main.classList.add("fullscreen-slider");
    });
  });
  // Close Fullscreen Slider
  const close_fullscreen_slider = document.querySelector(".close-fullscreen");

  close_fullscreen_slider.addEventListener("click", () => {
    main.classList.remove("fullscreen-slider");
  });
}

// Cart
const cart = document.querySelector(".cart");
// Show Cart
const cart_btn = document.getElementById("cart-btn");

cart_btn.addEventListener("click", () => {
  cart.classList.toggle("active");
});

// Add Product to Cart
const addBtn = document.querySelector(".add-btn");
let productData = {};

addBtn.addEventListener("click", () => {
  const product = document.querySelector(".product"),
    name = product.querySelector(".product-name").textContent,
    img = product.querySelector("#cart-img").src,
    imgIndex = img.search("images"),
    imgSrc = img.slice(imgIndex),
    descountPercentage = parseFloat(
      product.querySelector(".price .percentage").textContent.split("%")[0]
    ),
    originalPrice = parseFloat(
      product.querySelector(".price .original").textContent.split("$")[1]
    ),
    amount = parseFloat(product.querySelector(".amount .num").textContent);

  productData = {
    name,
    imgSrc,
    descountPercentage,
    originalPrice,
    amount,
  };
  addToCart(productData);
});

const cart_products_wrapper = document.querySelector(".cart-products-wrapper");

const addToCart = (data) => {
  const descountedPrice = (
    data.originalPrice *
    (data.descountPercentage / 100)
  ).toFixed(2);
  const price = (descountedPrice * data.amount).toFixed(2);
  const cart_product = document.createElement("div");
  cart_product.classList.add("cart-product");
  cart_product.innerHTML = `
    <img src="${data.imgSrc}" alt="img">
    <div class="cart-product-data">
        <p class="name">
            ${data.name}
        </p>
        <div class="amount">
            <span class="price">$${descountedPrice}</span>
            x
            <span class="amount-num">${data.amount}</span>
            <span class="total-price">$${price}</span>
        </div>
    </div>
    <button class="delete-btn"><i class="fas fa-trash delete-product"></i></button>
    `;
  cart_products_wrapper.appendChild(cart_product);
};

// Delete Cart Product
cart_products_wrapper.addEventListener("click", (e) => {
  e.preventDefault();
  const product = e.currentTarget.querySelector(".cart-product");
  const delete_btn = e.target.classList.contains("delete-product");
  if (delete_btn) {
    cart_products_wrapper.removeChild(product);
  }
});

// Add Number of Amount
const amountBtns = Array.from(
  document.querySelectorAll(".product .cart-btns .amount button")
);
const amountNumWrapper = document.querySelector(
  ".product .cart-btns .amount .num"
);
let amountNum = 0;

amountBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const plusBtn = btn.classList.contains("plus-btn");
    if (plusBtn) {
      amountNum++;
    } else {
      amountNum--;
    }
    if (amountNum < 0) {
      amountNum = 0;
    }
    amountNumWrapper.textContent = `${amountNum}`;
  });
});
