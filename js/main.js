"use strict";
// $(document).ready(function () {
//   alert("hello");
// });

let data = [],
  users,
  countData = [],
  userName,
  userContainer = [],
  filterDataCategory = [],
  filterDataPrice = [],
  favoriteProduct = [],
  carProduct = [];
/* ------------------------------- Check Login ------------------------------ */
function chickLogin() {
  if (localStorage.getItem("userLoggedIn") === null) {
    userName = "";
    carProduct = [];
    favoriteProduct = [];
    document.getElementById("homeUsername").innerHTML = "";
    document.getElementById("auth").classList.replace("d-none", "d-block");
    document.querySelector(".signout").classList.replace("d-block", "d-none");
  } else {
    users = JSON.parse(localStorage.getItem("userEmailsStorage"));
    // console.log(users[1].carProduct);
    userContainer = JSON.parse(localStorage.getItem("userLoggedIn"));
    userName = userContainer.userName;
    // favoriteProduct= JSON.parse(localStorage.getItem("favoriteProduct"));
    carProduct = userContainer.carProduct;
    document.getElementById("homeUsername").innerHTML = userName;
    document.getElementById("auth").classList.replace("d-block", "d-none");
    document.querySelector(".signout").classList.replace("d-none", "d-block");
  }
}
chickLogin();

document
  .getElementById("wishlist")
  .addEventListener("click", displayFavoriteProduct);
document.querySelector(".signout").addEventListener("click", function () {
  // console.log(users[userContainer.id])
  users[userContainer.id].carProduct = carProduct;
  // console.log( users[userContainer.id].carProduct );
  // console.log(users);
  localStorage.setItem("userEmailsStorage", JSON.stringify(users));
  localStorage.removeItem("userLoggedIn");
});
// $("nav.navbar ").hide(1);
// $("nav.navbar ").show(1000);
// $("header,main ,footer").slideUp(1);
// $("header ,main ,footer").slideDown(1000);
if (favoriteProduct === null) {
  favoriteProduct = [];
}
if (carProduct === null) {
  carProduct = [];
}

/* -------------------------- Display Cart Product -------------------------- */
function displayCarProduct() {
  chickLogin();
  if (localStorage.getItem("userLoggedIn") === null) {
    document.querySelector(".toast").classList.replace("d-none", "d-block");
    setTimeout(() => {
      document.querySelector(".toast").classList.replace("d-block", "d-none");
    }, 1000);
    return;
  } else {
    location.assign("../cart.html");
  }
  let sum = 0,
    container = ` `;
  document
    .querySelector("#table-section")
    .classList.replace("d-none", "d-block");
  document
    .querySelector("#banner-section")
    .classList.replace("d-none", "d-block");
  document.querySelector("#about_us").classList.replace("d-block", "d-none");
  document.querySelector("#Products").classList.replace("d-block", "d-none");
  document.querySelector("header").classList.replace("d-block", "d-none");
  // let counter = 1;
  for (let i = 0; i < carProduct.length; i++) {
    let images = handleMergeAPIData(i, carProduct[i].category);
    container += ` 
    <tr class="text-center align-middle">
      <td class="d-flex align-items-center">
        <figure><img src=${images} alt="${carProduct[i].title}" /></figure>
        <p class="ms-3 mb-0">
        ${carProduct[i].description}
        </p>
      </td>
      <td>$${carProduct[i].price}</td>
      <td class="">
        <input
          type="text"
          value = "1"
          class="text-center"
          id = "price${i}"
          required
        />
        <div
          class="btn-group-vertical"
          role="group"
          aria-label="Vertical button group"
        >
          <button type="button" onclick="count(${i},${1})" class="btn btn-success">+</button>
          <button type="button" onclick="count(${i},${-1})" class="btn btn-success">-</button>
        </div>
      </td>
      <td id="totalPrice${i}">${carProduct[i].price}</td>
    </tr>
  `;
    sum += carProduct[i].price;
  }
  document.querySelector("#table-section table tbody").innerHTML = container;
  document.querySelector("#table-section table tfoot").innerHTML = `   
    <tr>
      <td></td>
      <td></td>
      <td class="fw-bold fs-6">Subtotal</td>
      <td class="fw-bold fs-6" id="line-through">$${sum}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td class="fw-bold fs-6">Total</td>
      <td class="fw-bold fs-6" id="line-through-discount">$${parseInt(
        (sum -= sum * 0.1)
      )}</td>
    </tr>
  
  `;
  document
    .getElementById("CONTINUESHOPPING")
    .addEventListener("click", returnToShopping);
}

/* ------------------------ Display favorite product ------------------------ */
function displayFavoriteProduct() {
  // console.log(favoriteProduct);
}
