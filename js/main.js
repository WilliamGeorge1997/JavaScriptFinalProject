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
  let dataContainer = ``,
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
      <p>1${data[i].price}$</p>
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
              <p>1${data[i].price}$</p>
            </div>
          </div>`;
      }
    }
  }
  // console.log(filterDataCategory);
  // console.log(dataContainer);
  document.getElementById("all").innerHTML = dataContainer;
}
function displayProduct() {
  document.getElementById("all-tab").addEventListener("click", function () {
    // console.log("click")
    displayByCategory("all");
  });
  document.getElementById("men-tab").addEventListener("click", function () {
    // console.log("click")
    displayByCategory("men's clothing");
  });
  document.getElementById("women-tab").addEventListener("click", function () {
    // console.log("click")
    displayByCategory("women's clothing");
  });
  document.getElementById("jewelry-tab").addEventListener("click", function () {
    // console.log("click")
    displayByCategory("jewelery");
  });
  document
    .getElementById("smartphones-tab")
    .addEventListener("click", function () {
      // console.log("click");
      displayByCategory("smartphones");
    });
  document.getElementById("laptops-tab").addEventListener("click", function () {
    // console.log("click")
    displayByCategory("laptops");
  });
  document
    .getElementById("electronics-tab")
    .addEventListener("click", function () {
      // console.log("click")
      displayByCategory("electronics");
    });
  document
    .getElementById("fragrances-tab")
    .addEventListener("click", function () {
      // console.log("click")
      displayByCategory("fragrances");
    });
  document
    .getElementById("skincare-tab")
    .addEventListener("click", function () {
      // console.log("click")
      displayByCategory("skincare");
    });
  document
    .getElementById("groceries-tab")
    .addEventListener("click", function () {
      // console.log("click")
      displayByCategory("groceries");
    });
  document
    .getElementById("homeDecoration-tab")
    .addEventListener("click", function () {
      // console.log("click")
      displayByCategory("home-decoration");
    });
  document
    .getElementById("wishlist")
    .addEventListener("click", displayFavoriteProduct);
  document.getElementById("cart").addEventListener("click", function () {
    displayCarProduct();
  });
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
  document
    .getElementById("productDetails")
    .classList.replace("d-block", "d-none");
}
function productDetails(indexOfProduct) {
  document
    .getElementById("productDetails")
    .classList.replace("d-none", "d-block");
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
  document.getElementById(
    "productDetailsInner"
  ).innerHTML = `<div class="p-4"><img src=${images} alt="${data[indexOfProduct].title}"></div>
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
    document.querySelector(".toast-body").innerHTML = "Please, login first";
    document.querySelector(".toast").classList.replace("d-none", "d-block");
    setTimeout(() => {
      document.querySelector(".toast").classList.replace("d-block", "d-none");
    }, 1000);
  } else {
    document.querySelector(".toast-body").innerHTML =
      "Product added in the wish list";
    // console.log(document.querySelector(".toast-body").innerHTML);
    document.querySelector(".toast").classList.replace("d-none", "d-block");
    // console.log(document.querySelector(".toast"));

    setTimeout(() => {
      document.querySelector(".toast").classList.replace("d-block", "d-none");
    }, 1000);
    for (let i = 0; i < favoriteProduct.length; i++) {
      if (favoriteProduct[i] == data[indexOfProduct]) {
        return;
      }
    }

    favoriteProduct.push(data[indexOfProduct]);
    localStorage.setItem("favoriteProduct", JSON.stringify(favoriteProduct));
  }
}
function carProductFun(indexOfProduct) {
  if (JSON.parse(localStorage.getItem("userLoggedIn")) == null) {
    document.querySelector(".toast-body").innerHTML = "Please, login first";
    document.querySelector(".toast").classList.replace("d-none", "d-block");
    setTimeout(() => {
      document.querySelector(".toast").classList.replace("d-block", "d-none");
    }, 1000);
  } else {
    document.querySelector(".toast-body").innerHTML =
      "Product added in the cart";
    // console.log(document.querySelector(".toast-body").innerHTML);
    document.querySelector(".toast").classList.replace("d-none", "d-block");
    // console.log(document.querySelector(".toast"));
    document
      .querySelector(".toast")
      .classList.replace("bg-danger", "bg-success");

    setTimeout(() => {
      document.querySelector(".toast").classList.replace("d-block", "d-none");
    }, 1000);
    for (let i = 0; i < carProduct.length; i++) {
      if (carProduct[i] == data[indexOfProduct]) {
        return;
      }
    }
    countData = [data[indexOfProduct], 1];
    carProduct.push(countData);
    userContainer.carProduct = carProduct;
    localStorage.setItem("userLoggedIn", JSON.stringify(userContainer));
  }
}
 
/// end product details