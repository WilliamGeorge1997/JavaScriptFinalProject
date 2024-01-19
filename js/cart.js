/* -------------------------------- Variables ------------------------------- */
let signout = document.querySelector(".signout"),
  continueShopping = document.getElementById("continueShopping"),
  proceedToCheckout = document.getElementById("proceedToCheckout"),
  toast = document.getElementById("toast"),
  homeUserName = document.getElementById("homeUsername"),
  auth = document.getElementById("auth"),
  data = [],
  users,
  countData = [],
  userName,
  userContainer = [],
  filterDataCategory = [],
  filterDataPrice = [],
  favoriteProduct = [],
  carProduct = [],
  tableTbody = document.querySelector("#table-section table tbody");
tableTfoot = document.querySelector("#table-section table tfoot");

signout.addEventListener("click", function (e) {

  e.preventDefault();
});

/* ------------------------------- Check login ------------------------------ */
function checkLogin() {
  if (localStorage.getItem("userLoggedIn") === null) {
    userName = "";
    carProduct = [];
    favoriteProduct = [];
    homeUserName.innerHTML = "Guest";
    auth.classList.replace("d-none", "d-block");
    signout.classList.replace("d-block", "d-none");
  } else {
    users = JSON.parse(localStorage.getItem("userEmailsStorage"));
    userContainer = JSON.parse(localStorage.getItem("userLoggedIn"));
    userName = userContainer.userName;
    carProduct = userContainer.carProduct;
    homeUserName.innerHTML = userName;
    auth.classList.replace("d-block", "d-none");
    signout.classList.replace("d-none", "d-block");
    return carProduct;
  }
}
let cartProducts = checkLogin();

/* --------------------------------- SignOut -------------------------------- */
signout.addEventListener("click", function () {
  users[userContainer.id].carProduct = carProduct;
  localStorage.setItem("userEmailsStorage", JSON.stringify(users));
  localStorage.removeItem("userLoggedIn");
  location.assign("../index.html");
});

/* -------------------------- Check for categories -------------------------- */
function handleMergeAPIData(i, category) {
  switch (cartProducts[i][0].category) {
    case "smartphones":
    case "laptops":
    case "fragrances":
    case "skincare":
    case "groceries":
    case "home-decoration":
      return cartProducts[i][0].thumbnail;
    case "men's clothing":
    case "jewelery":
    case "electronics":
    case "women's clothing":
      return cartProducts[i][0].image;
  }
}

/* -------------------------- Display Cart Products ------------------------- */
function displayCarProduct() {
  let sum = 0,
    container = ` `;

  for (let i = 0; i < cartProducts.length; i++) {
    let images = handleMergeAPIData(i, cartProducts[i][0].category);
    container += ` 
  <tr class="text-center align-middle ">
    <td>${i + 1}-</td>
    <td class="d-flex justify-content-center align-items-center">
      <figure id="fig "><img class="w-25" src=${images} alt="${
      cartProducts[i][0].title
    }" /></figure> 
    </td>
    <td>
    <p class="mb-0">
    ${cartProducts[i][0].title}
    </p>
    </td>
    <td><span>$</span>${parseInt(cartProducts[i][0].price)}</td>
    <td class="">
      <input
        type="text"
        value = "${cartProducts[i][1]}"
        class="text-center"
        id = "price${i}"
        required
        disabled
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
    <td>$<span id="totalPrice${i}">${
      parseInt(cartProducts[i][0].price) * cartProducts[i][1]
    }</span></td>
    <td>
    <i id="remove-product" class="fa-solid fa-trash text-danger fa-xl" onclick="deleteProduct(${i})"></i>
    </td>
  </tr>
`;

    sum += parseInt(cartProducts[i][0].price * cartProducts[i][1]);
  }
  tableTbody.innerHTML = container;
  tableTfoot.innerHTML = `   
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td class="fw-bold fs-6">Subtotal</td>
    <td class="fw-bold fs-6" >$<span id="line-through">${parseInt(
      sum
    )}</span></td>
    <td></td>
  </tr>
  <tr>
  <td></td>

    <td></td>
    <td></td>
    <td></td>
    <td class="fw-bold fs-6">Total</td>
    <td class="fw-bold fs-6">$<span  id="line-through-discount">${parseInt(
      (sum -= sum * 0.1)
    )}</span></td>
    <td></td>
  </tr>

`;
}
displayCarProduct();

/* ---------------------------- Count of Products --------------------------- */

function count(i, countOfProduct) {
  /* -------------------------------- Variables of count function ------------------------------- */
  let sum = 0,
    price = document.getElementById(`price${i}`),
    totalPrice = document.getElementById(`totalPrice${i}`),
    lineThrough = document.getElementById("line-through"),
    lineThroughDiscount = document.getElementById("line-through-discount");
    
  if (Number(price.value) == 1 && countOfProduct == -1) {
    return;
  } else {
    price.value = parseInt(Number(price.value)) + countOfProduct;
    totalPrice.innerText = `${
      price.value * parseInt(cartProducts[i][0].price)
    }`;
    cartProducts[i][1] = price.value;

    users[userContainer.id].carProduct = cartProducts;
    localStorage.setItem("userEmailsStorage", JSON.stringify(users));
    localStorage.setItem(
      "userLoggedIn",
      JSON.stringify(users[userContainer.id])
    );
  }

  for (let index = 0; index < cartProducts.length; index++) {
    let totalPrice2 = document.getElementById(`totalPrice${index}`);
    sum += Number(totalPrice2.innerText);
  }
  lineThrough.innerText = sum;
  lineThroughDiscount.innerText = parseInt((sum -= sum * 0.1));
}
/* ---------------------------- Continue Shopping --------------------------- */
continueShopping.addEventListener("click", function (e) {
  e.preventDefault();
  location.assign("../index.html#Products");
});

/* --------------------------- Proceed to checkout -------------------------- */
proceedToCheckout.addEventListener("click", function () {
  if (
    !JSON.parse(localStorage.getItem("userLoggedIn")).carProduct.length == 0
  ) {
    location.assign("../checkout.html");
  } else {
    toast.classList.replace("d-none", "d-block");
    setTimeout(() => {
      toast.classList.replace("d-block", "d-none");
    }, 3000);
  }
});
/* --------------------------- Delete Product -------------------------- */

function deleteProduct(i) {
  cartProducts.splice(i, 1);
  users[userContainer.id].carProduct = cartProducts;
  localStorage.setItem("userEmailsStorage", JSON.stringify(users));
  localStorage.setItem("userLoggedIn", JSON.stringify(users[userContainer.id]));
  displayCarProduct();
}
