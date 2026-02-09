// CART DATA
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// UPDATE CART COUNT
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.innerText = cart.length;
  }
}

// ADD TO CART FUNCTION
function addToCart(name, price, brand) {
  const product = {
    name,
    price,
    brand,
    qty: 1
  };

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  alert(name + " added to cart");
}

// INIT
updateCartCount();
// DISPLAY CART ITEMS
function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.innerText = 0;
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <small>${item.brand}</small><br>
        ₹${item.price}
      </div>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  cartTotal.innerText = total;
}

// REMOVE ITEM
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

// INIT CART PAGE
displayCart();

function clearCartAndRedirect() {
  localStorage.removeItem("cart");
  window.location.href = "thankyou.html";
}
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const payment = document.querySelector('input[name="payment"]:checked').value;

    let message = `🛒 New Order\n\n`;
    message += `Name: ${name}\n`;
    message += `Phone: ${phone}\n`;
    message += `Address: ${address}\n`;
    message += `Payment: ${payment}\n\n`;
    message += `Products:\n`;

    let total = 0;
    cart.forEach((item, index) => {
      total += item.price * item.qty;
      message += `${index + 1}. ${item.name} - ₹${item.price}\n`;
    });

    message += `\nTotal: ₹${total}`;

    const ownerNumber = "9612217299"; // 👉 BUSINESS SIM
    const whatsappURL = `https://wa.me/91${ownerNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

    localStorage.removeItem("cart");
    window.location.href = "thankyou.html";
  });
});
const y = document.getElementById("year");
if (y) y.innerText = new Date().getFullYear();
const paymentRadios = document.querySelectorAll('input[name="payment"]');
const upiBox = document.getElementById("upi-box");

if (paymentRadios && upiBox) {
  paymentRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "UPI") {
        upiBox.style.display = "block";
      } else {
        upiBox.style.display = "none";
      }
    });
  });
}
