let pro = JSON.parse(localStorage.getItem("product"));
let im = pro.img;
let price = pro.price;
let id = pro.id;
let desc = pro.desc;
let category = pro.category;
let title = pro.title;
let pro_id = document.querySelector(".pro_id");
pro_id.innerHTML = id;
let pro_title = document.querySelector(".pro_title");
pro_title.innerHTML =title;
let pro_cat = document.querySelector(".pro_cat");
pro_cat.innerHTML = category;
let pro_desc = document.querySelector(".pro_desc");
pro_desc.innerHTML = desc;
let pric = document.querySelector(".pric");
pric.innerHTML = price;
let im_pro = document.querySelector(".im_pro");
im_pro.setAttribute("src",im);
console.log(im_pro);
im_pro.addEventListener("click", function () {
})



let signout = document.querySelector(".signout");
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
  }
  return carProduct;
}
let cartProducts = checkLogin();
console.log(cartProducts);