// ===== MOBILE NAVIGATION =====

const navLinks = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");

// create hamburger button
const menuBtn = document.createElement("button");
menuBtn.innerHTML = "☰";
menuBtn.classList.add("menu-btn");

navbar.appendChild(menuBtn);

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});


// ===== CART SYSTEM =====

const addButtons = document.querySelectorAll(".add-btn");
const removeButtons = document.querySelectorAll(".remove-btn");

const cartItems = document.querySelector(".cart-items");
const totalAmount = document.querySelector(".total-amount");

let cart = [];
let total = 0;


// ADD ITEM
addButtons.forEach((btn) => {
    btn.addEventListener("click", function () {

        const serviceCard = this.closest(".service-card");
        const name = serviceCard.querySelector("h3").innerText;
        const price = parseInt(serviceCard.querySelector(".price").innerText.replace("₹",""));

        cart.push({name, price});
        total += price;

        updateCart();
    });
});


// REMOVE ITEM
removeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {

        const serviceCard = this.closest(".service-card");
        const name = serviceCard.querySelector("h3").innerText;
        const price = parseInt(serviceCard.querySelector(".price").innerText.replace("₹",""));

        const index = cart.findIndex(item => item.name === name);

        if(index !== -1){
            cart.splice(index,1);
            total -= price;
        }

        updateCart();
    });
});


// UPDATE CART UI
function updateCart(){

    cartItems.innerHTML = "";

    if(cart.length === 0){
        cartItems.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
        totalAmount.innerHTML = "₹0";
        return;
    }

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-row");

        div.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price}</span>
        `;

        cartItems.appendChild(div);
    });

    totalAmount.innerHTML = "₹" + total;
}
// ===== BOOKING FORM =====

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if(name === "" || email === "" || phone === ""){
        alert("Please fill all the fields.");
        return;
    }

    if(cart.length === 0){
        alert("Your cart is empty. Please add services before booking.");
        return;
    }

    alert(
        "Booking Successful!\n\n" +
        "Customer: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n" +
        "Total Amount: ₹" + total
    );

    // Reset everything
    bookingForm.reset();
    cart = [];
    total = 0;
    updateCart();
});
