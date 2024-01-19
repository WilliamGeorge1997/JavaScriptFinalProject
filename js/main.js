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
  carProduct = [],
  homeUsername = document.getElementById("homeUsername"),
  auth = document.getElementById("auth"),
  signout = document.querySelector(".signout"),
  wishlist = document.getElementById("wishlist"),
  toast = document.querySelector(".toast"),
  tableSection = document.querySelector("#table-section"),
  bannerSection = document.querySelector("#banner-section"),
  aboutUs = document.querySelector("#about_us"),
  Products = document.querySelector("#Products"),
  header = document.querySelector("header"),
  tableSectionTableTbody = document.querySelector("#table-section table tbody"),
  tableSectionTableTfoot = document.querySelector("#table-section table tfoot"),
  continueShopping = document.getElementById("CONTINUESHOPPING"),
  productDetailsVar = document.getElementById("productDetails"),
  productDetailsInner = document.getElementById("productDetailsInner"),
  toastBody = document.querySelector(".toast-body");

/* ------------------------------- Check Login ------------------------------ */

function chickLogin() {
  if (localStorage.getItem("userLoggedIn") === null) {
    userName = "";
    carProduct = [];
    favoriteProduct = [];
    homeUsername.innerHTML = "";
    auth.classList.replace("d-none", "d-block");
    signout.classList.replace("d-block", "d-none");
  } else {
    users = JSON.parse(localStorage.getItem("userEmailsStorage"));
    // console.log(users[1].carProduct);
    userContainer = JSON.parse(localStorage.getItem("userLoggedIn"));
    userName = userContainer.userName;
    favoriteProduct = JSON.parse(localStorage.getItem("favoriteProduct"));
    carProduct = userContainer.carProduct;
    homeUsername.innerHTML = userName;
    auth.classList.replace("d-block", "d-none");
    signout.classList.replace("d-none", "d-block");
  }
}
chickLogin();
wishlist.addEventListener("click", displayFavoriteProduct);
signout.addEventListener("click", function () {
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
// cart badge
function cartBadge() {
  let cartCounter = document.querySelector(".cartCounter");
  cartCounter.innerHTML = carProduct.length;
  // console.log(carProduct.length);
}
cartBadge();
/* -------------------------- Display Cart Product -------------------------- */
function displayCarProduct() {
  chickLogin();
  if (localStorage.getItem("userLoggedIn") === null) {
    toast.classList.replace("d-none", "d-block");
    setTimeout(() => {
      toast.classList.replace("d-block", "d-none");
    }, 1000);
    return;
  } else {
    location.assign("../cart.html");
  }
  let sum = 0,
    container = ` `;
  tableSection.classList.replace("d-none", "d-block");
  bannerSection.classList.replace("d-none", "d-block");
  aboutUs.classList.replace("d-block", "d-none");
  Products.classList.replace("d-block", "d-none");
  header.classList.replace("d-block", "d-none");
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
  tableSectionTableTbody.innerHTML = container;
  tableSectionTableTfoot.innerHTML = `   
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
  continueShopping.addEventListener("click", returnToShopping);
}

/* ------------------------ Display favorite product ------------------------ */
function displayFavoriteProduct() {
  // console.log(favoriteProduct);
}
//  start Products  section

async function getProductFromApi(file) {
  let x = await fetch(file),
    y = await x.text(),
    z;
  data.length != 0
    ? (z = data.concat(JSON.parse(y)))
    : (z = JSON.parse(y).products);
  data = z;
  filterDataCategory = data;

  // console.log(data);
}
function handleMergeAPIData(i, category) {
  switch (data[i].category) {
    case "smartphones":
    case "laptops":
    case "fragrances":
    case "skincare":
    case "groceries":
    case "home-decoration":
      return data[i].thumbnail;
    case "men's clothing":
    case "jewelery":
    case "electronics":
    case "women's clothing":
      return data[i].image;
  }
}
function displayByCategory(category) {
  let allButton = document.getElementById("all"),
    dataContainer = ``,
    images = "";
  // filterDataCategory = [];
  if (category == "all") {
    for (let i = 0; i < data.length; i++) {
      images = handleMergeAPIData(i, category);
      // console.log(images);
      dataContainer += `<div class="card p-3 " >
    <figure> <img src=${images} class="card-img-top" alt="${data[i].title}">
      <div class="productsIcons">
         <div class="iconContainer openProduct" onclick="productDetails(${i})"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></div>
         <div class="iconContainer addToFav" onclick ="favoriteProductFun(${i})"><i class="fa-regular fa-heart"></i></div>
         <div class="iconContainer addToCar" onclick = "  carProductFun(${i})"><i class="fa-solid fa-cart-arrow-down"></i></div></div>
    </figure>
    <div class="card-body">
      <p class="card-text">${data[i].title}</p>
      <span><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
          class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>
      <p>$${data[i].price}</p>
    </div>
  </div>`;
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].category == category) {
        images = handleMergeAPIData(i, category);
        // console.log(images);
        dataContainer += `<div class="card p-3 " >
            <figure> <img src=${images} class="card-img-top" alt="${data[i].title}">
              <div class="productsIcons">
                 <div class="iconContainer openProduct" onclick="productDetails(${i})"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></div>
                 <div class="iconContainer addToFav" onclick ="favoriteProductFun(${i})"><i class="fa-regular fa-heart"></i></div>
                 <div class="iconContainer addToCar" onclick = "carProductFun(${i})"><i class="fa-solid fa-cart-arrow-down"></i></div></div>
            </figure>
            <div class="card-body">
            <p class="card-text">${data[i].title}</p>
            <span><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>
            <p>$${data[i].price}</p>
          </div>
        </div>`;
      }
    }
  }
  // console.log(filterDataCategory);
  // console.log(dataContainer);
  allButton.innerHTML = dataContainer;
}
function displayProduct() {
  let allTab = document.getElementById("all-tab"),
    menTab = document.getElementById("men-tab"),
    womenTab = document.getElementById("women-tab"),
    jewelryTab = document.getElementById("jewelry-tab"),
    smartphonesTab = document.getElementById("smartphones-tab"),
    laptopsTab = document.getElementById("laptops-tab"),
    electronicsTab = document.getElementById("electronics-tab"),
    fragrancesTab = document.getElementById("fragrances-tab"),
    skincareTab = document.getElementById("skincare-tab"),
    groceriesTab = document.getElementById("groceries-tab"),
    homeDecorationTab = document.getElementById("homeDecoration-tab"),
    wishlist = document.getElementById("wishlist"),
    cart = document.getElementById("cart");

  allTab.addEventListener("click", function () {
    // console.log("click")
    displayByCategory("all");
  });
  menTab.addEventListener("click", function () {
    // console.log("click")
    displayByCategory("men's clothing");
  });
  womenTab.addEventListener("click", function () {
    // console.log("click")
    displayByCategory("women's clothing");
  });
  jewelryTab.addEventListener("click", function () {
    // console.log("click")
    displayByCategory("jewelery");
  });
  smartphonesTab.addEventListener("click", function () {
    // console.log("click");
    displayByCategory("smartphones");
  });
  laptopsTab.addEventListener("click", function () {
    // console.log("click")
    displayByCategory("laptops");
  });
  electronicsTab.addEventListener("click", function () {
    // console.log("click")
    displayByCategory("electronics");
  });
  fragrancesTab.addEventListener("click", function () {
    // console.log("click")
    displayByCategory("fragrances");
  });
  skincareTab.addEventListener("click", function () {
    // console.log("click")
    displayByCategory("skincare");
  });
  groceriesTab.addEventListener("click", function () {
    // console.log("click")
    displayByCategory("groceries");
  });
  homeDecorationTab.addEventListener("click", function () {
    // console.log("click")
    displayByCategory("home-decoration");
  });
  wishlist.addEventListener("click", displayFavoriteProduct);
  cart.addEventListener("click", displayCarProduct);
}
async function name() {
  await getProductFromApi("https://dummyjson.com/products");
  await getProductFromApi("https://fakestoreapi.com/products");
  // await displayByPrice(10, 20);
  // await displayByWord("Laptop");
  displayByCategory("all");
  displayProduct();
}
name();
// end Products  section

// start product details

function productDetailsClose() {
  productDetailsVar.classList.replace("d-block", "d-none");
}
function productDetails(indexOfProduct) {
  productDetailsVar.classList.replace("d-none", "d-block");
  // console.log(indexOfProduct);
  let images = "",
    stocks = "";
  switch (data[indexOfProduct].category) {
    case "smartphones":
    case "laptops":
    case "fragrances":
    case "skincare":
    case "groceries":
    case "home-decoration":
      images = data[indexOfProduct].thumbnail;
      stocks = data[indexOfProduct].stock;
      break;
    case "men's clothing":
    case "jewelery":
    case "electronics":
    case "women's clothing":
      images = data[indexOfProduct].image;
      stocks = data[indexOfProduct].rating.count;
      break;
  }
  productDetailsInner.innerHTML = `<div class="p-4"><img src=${images} alt="${data[indexOfProduct].title}"></div>
<div><i class="fa-solid fa-circle-xmark position-absolute end-0 m-4 top-0 h2" id="productDetailsClose" ></i>
  <h4>${data[indexOfProduct].title}</h4>
  <samp>$${data[indexOfProduct].price}</samp>
  <p>Category :<samp> ${data[indexOfProduct].category}</samp></p>
  <p> Availability : <samp>${stocks}</samp>
  </p>
  <hr>
  <p>${data[indexOfProduct].description}</p>
  </p><button type="button" class="btn  " onclick="carProductFun(${indexOfProduct})">ADD TO CART</button>
</div>
`;
  document
    .getElementById("productDetailsClose")
    .addEventListener("click", productDetailsClose);
}

/// filter by price ///////   loading
function displayByPrice(minPrice, maxPrice) {
  for (let i = 0; i < filterDataCategory.length; i++) {
    if (
      filterDataCategory[i].price >= minPrice &&
      filterDataCategory[i].price <= maxPrice
    ) {
      // console.log(filterDataCategory[i].price);
      filterDataPrice.push(filterDataCategory[i]);
    }
  }
  // console.log(filterDataPrice);
}

//// search ///// loading!!
function displayByWord(word) {
  filterDataCategory = [];
  for (let i = 0; i < data.length; i++) {
    if (
      data[i].description.includes(word) ||
      data[i].title.includes(word) ||
      data[i].category.includes(word)
    ) {
      filterDataCategory.push(data[i]);
      // console.log(filterDataCategory);
    }
  }
  // console.log(filterDataCategory);
}
function favoriteProductFun(indexOfProduct) {
  if (JSON.parse(localStorage.getItem("userLoggedIn")) == null) {
    toastBody.innerHTML = "Please, login first";
    toast.classList.replace("d-none", "d-block");
    setTimeout(() => {
      toast.classList.replace("d-block", "d-none");
    }, 1000);
  } else {
    for (let i = 0; i < favoriteProduct.length; i++) {
      if (favoriteProduct[i] == data[indexOfProduct]) {
        toastBody.innerHTML =
          "This product is already exists in your wishlist.";
        toast.classList.replace("d-none", "d-block");
        toast.classList.replace("bg-success", "bg-danger");
        setTimeout(() => {
          toast.classList.replace("d-block", "d-none");
        }, 1000);
        return;
      }

      // console.log(oast-body.innerHTML);

      // console.log(toast);

      setTimeout(() => {
        toast.classList.replace("d-block", "d-none");
      }, 1000);
    }

    toast.classList.replace("bg-danger", "bg-success");
    toastBody.innerHTML = "Product added in the wish list";
    toast.classList.replace("d-none", "d-block");

    setTimeout(() => {
      toast.classList.replace("d-block", "d-none");
    }, 1000);

    favoriteProduct.push(data[indexOfProduct]);
    localStorage.setItem("favoriteProduct", JSON.stringify(favoriteProduct));
  }
}
function carProductFun(indexOfProduct) {
  if (JSON.parse(localStorage.getItem("userLoggedIn")) == null) {
    toastBody.innerHTML = "Please, login first";
    toast.classList.replace("d-none", "d-block");
    setTimeout(() => {
      toast.classList.replace("d-block", "d-none");
    }, 1000);
  } else {
    for (let i = 0; i < carProduct.length; i++) {
      // console.log(data[indexOfProduct]);
      // console.log(carProduct[i][0] );
      if (carProduct[i][0] == data[indexOfProduct]) {
        toastBody.innerHTML = "This product is already exists in your cart.";
        toast.classList.replace("d-none", "d-block");
        toast.classList.replace("bg-success", "bg-danger");
        setTimeout(() => {
          toast.classList.replace("d-block", "d-none");
        }, 1000);
        return;
      }
    }
    toastBody.innerHTML = "Product added in the cart";
    // console.log(toastBody.innerHTML);
    toast.classList.replace("d-none", "d-block");
    // console.log(toast);
    toast.classList.replace("bg-danger", "bg-success");

    setTimeout(() => {
      toast.classList.replace("d-block", "d-none");
    }, 1000);

    countData = [data[indexOfProduct], 1];
    carProduct.push(countData);
    userContainer.carProduct = carProduct;
    localStorage.setItem("userLoggedIn", JSON.stringify(userContainer));
    cartBadge();
  }
}

/// end product details
