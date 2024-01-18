/* -------------------------------- Variables ------------------------------- */
let signout = document.querySelector(".signout"),
  continueShopping = document.getElementById("continueShopping"),
  proceedToCheckout = document.getElementById("proceedToCheckout"),
  toast = document.getElementById("toast");
signout.addEventListener("click", function (e) {
  e.preventDefault();
});

/* ------------------------------- Check login ------------------------------ */
function checkLogin() {
  if (localStorage.getItem("userLoggedIn") === null) {
    userName = "";
    carProduct = [];
    favoriteProduct = [];
    document.getElementById("homeUsername").innerHTML = "Guest";
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
{/* <button class="btn text-danger p-1 text-white" type="button" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i></button> */}
    sum += parseInt(cartProducts[i][0].price * cartProducts[i][1]);
  }
  document.querySelector("#table-section table tbody").innerHTML = container;
  document.querySelector("#table-section table tfoot").innerHTML = `   
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

function count(i, countOfProduct) {
  let sum = 0;
  if (
    Number(document.getElementById(`price${i}`).value) == 1 &&
    countOfProduct == -1
  ) {
    return;
  } else {
    document.getElementById(`price${i}`).value =
      parseInt(Number(document.getElementById(`price${i}`).value)) +
      countOfProduct;
    document.getElementById(`totalPrice${i}`).innerText = `${
      document.getElementById(`price${i}`).value *
      parseInt(cartProducts[i][0].price)
    }`;
    cartProducts[i][1] = document.getElementById(`price${i}`).value;
    // console.log(cartProducts[i][1]);
    users[userContainer.id].carProduct = cartProducts;
    localStorage.setItem("userEmailsStorage", JSON.stringify(users));
    localStorage.setItem(
      "userLoggedIn",
      JSON.stringify(users[userContainer.id])
    );
  }
  // counter;
  for (let index = 0; index < cartProducts.length; index++) {
    sum += Number(document.getElementById(`totalPrice${index}`).innerText);
    // console.log(
    //   Number(document.getElementById(`totalPrice${index}`).innerText)
    // );
  }
  document.getElementById("line-through").innerText = sum;
  document.getElementById("line-through-discount").innerText = parseInt(
    (sum -= sum * 0.1)
  );
}

continueShopping.addEventListener("click", function (e) {
  e.preventDefault();
  location.assign("../index.html");
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
  console.log(cartProducts);
  cartProducts.splice(i, 1);
  console.log(cartProducts);
  users[userContainer.id].carProduct = cartProducts;
  localStorage.setItem("userEmailsStorage", JSON.stringify(users));
  localStorage.setItem("userLoggedIn", JSON.stringify(users[userContainer.id]));
  displayCarProduct();
}
