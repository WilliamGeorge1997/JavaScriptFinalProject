let signout = document.querySelector(".signout");

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
let checkOutProducts = checkLogin();
// console.log(checkOutProducts);
/* --------------------------------- SignOut -------------------------------- */
signout.addEventListener("click", function (e) {
  e.preventDefault();
  users[userContainer.id].carProduct = carProduct;
  localStorage.setItem("userEmailsStorage", JSON.stringify(users));
  localStorage.removeItem("userLoggedIn");
  location.assign("../index.html");
});

function yourOrder() {
  let priceTotal = 0,
    totalQty = 0;
  let container = ``;
  for (let index = 0; index < checkOutProducts.length; index++) {
    container += ` <tr>
<td>${checkOutProducts[index][0].title}</td>
<td>x${checkOutProducts[index][1]}</td>
<td>$${checkOutProducts[index][0].price * checkOutProducts[index][1]}</td>
</tr>`;
    priceTotal += checkOutProducts[index][0].price * checkOutProducts[index][1];
    totalQty += +checkOutProducts[index][1];
  }
  document.getElementById("tBody").innerHTML = container;
  document.getElementById("tFoot").innerHTML = ` <tr>
  <td>SUBTOTAL</td>
  <td>x${totalQty}</td> 
  <td><span id="line-through">$${parseInt((priceTotal))}</span></td>
  </tr>

  <tr>
<td>TOTAL</td>
<td>x${totalQty}</td>

<td>$${parseInt((priceTotal -= priceTotal * 0.1))}</td>
</tr>`;
}
yourOrder();
// document.getElementById("proceed").addEventListener("click", function () {
//   users[userContainer.id].carProduct = [];
//   localStorage.setItem("userEmailsStorage", JSON.stringify(users));
//   localStorage.setItem("userLoggedIn", JSON.stringify(users[userContainer.id]));
// });
//----------------------------------Validation---------------//
let proceed = document.getElementById("proceed");

let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");
let emailInput = document.getElementById("email");
let addressLineInput = document.getElementById("addressLine");
let postCodeErrorInput = document.getElementById("postalCode");
let townInput = document.getElementById("town");
let phoneInput = document.getElementById("phoneNumber");
let termsCheckBox = document.getElementById("termsCheckBox");

let firstNameError = document.getElementById("firstNameError");
let lastNameError = document.getElementById("lastNameError");
let emailInputError = document.getElementById("emailInputError");
let addressLineError = document.getElementById("addressLineError");
let postCodeError = document.getElementById("postCodeError");
let townError = document.getElementById("townError");
let PhoneNumberError = document.getElementById("PhoneNumberError");
let termsError = document.getElementById("termsError");

let namePatern = /^[a-zA-Z]+$/;
let phonePatern = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
let emailPatern =
  /^[a-zA-Z0-9]+([a-zA-Z0-9._-])*@[a-zA-Z0-9.-]*\.[a-zA-Z]{2,4}$/;
let postPatern = /^\d{5}$/;

function checkFirstName() {
  if (firstNameInput.value == "") {
    firstNameError.innerText = "*First name is required";
    firstNameError.classList.remove("hidden");
    setTimeout(() => {
      firstNameError.classList.add("hidden");
    }, 3000);
    return false;
  } else {
    return true;
  }
}

function checkPhone() {
  if (phoneNumber.value == "") {
    PhoneNumberError.innerText = "*Phone Number is required";
    PhoneNumberError.classList.remove("hidden");
    setTimeout(() => {
      PhoneNumberError.classList.add("hidden");
    }, 3000);
  } else if (!phonePatern.test(phoneInput.value)) {
    PhoneNumberError.innerText = "*Phone Number is invalid";
    PhoneNumberError.classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("PhoneNumberError").classList.add("hidden");
    }, 3000);
    return false;
  } else {
    return true;
  }
}

function checkLastName() {
  if (lastNameInput.value == "") {
    lastNameError.innerText = "*Last name is required";
    lastNameError.classList.remove("hidden");
    setTimeout(() => {
      lastNameError.classList.add("hidden");
    }, 3000);
    return false;
  } else {
    return true;
  }
}

function checkEmail() {
  if (emailInput.value == "") {
    emailInputError.innerText = "*Email is required";
    emailInputError.classList.remove("hidden");
    setTimeout(() => {
      emailInputError.classList.add("hidden");
    }, 3000);
  } else if (!emailPatern.test(emailInput.value)) {
    emailInputError.innerText = "*Email is invalid";
    emailInputError.classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("emailInputError").classList.add("hidden");
    }, 3000);
    return false;
  } else {
    return true;
  }
}

function checkAddress() {
  if (addressLineInput.value == "") {
    addressLineError.innerText = "*Address is required";
    addressLineError.classList.remove("hidden");
    setTimeout(() => {
      addressLineError.classList.add("hidden");
    }, 3000);
    return false;
  } else {
    return true;
  }
}

function checkPostCode() {
  if (postalCode.value == "") {
    postCodeError.innerText = "*Postal code is required";
    postCodeError.classList.remove("hidden");
    setTimeout(() => {
      postCodeError.classList.add("hidden");
    }, 3000);
    return false;
  } else {
    return true;
  }
}

function checkTown() {
  if (town.value == "") {
    townError.innerText = "*Town is required";
    townError.classList.remove("hidden");
    setTimeout(() => {
      townError.classList.add("hidden");
    }, 3000);
    return false;
  } else {
    return true;
  }
}

function checkTerms() {
  if (termsCheckBox.hasAttribute("checked") == false) {
    termsError.innerText = "Please, agree to the Terms and Conditions.";
    termsError.classList.remove("hidden");
    setTimeout(() => {
      termsError.classList.add("hidden");
    }, 3000);
    return false;
  } else {
    return true;
  }
}

function termsCheck() {
  if (termsCheckBox.hasAttribute("checked") == false) {
    termsCheckBox.setAttribute("checked", "");
  } else {
    termsCheckBox.removeAttribute("checked");
  }
}
termsCheckBox.addEventListener("click", function () {
  termsCheck();
});

proceed.addEventListener("click", function (e) {
  e.preventDefault();
  let input1 = checkFirstName();
  let input2 = checkPhone();
  let input3 = checkLastName();
  let input5 = checkEmail();
  let input6 = checkAddress();
  let input7 = checkPostCode();
  let input8 = checkTown();
  let input9 = checkTerms();
  if (
    input1 === true &&
    input2 === true &&
    input3 === true &&
    input5 === true &&
    input6 === true &&
    input7 === true &&
    input8 === true &&
    input9 === true
  ) {
    
    users[userContainer.id].carProduct = [];
    localStorage.setItem("userEmailsStorage", JSON.stringify(users));
    localStorage.setItem("userLoggedIn", JSON.stringify(users[userContainer.id]));
    location.assign("../congratulations.html");
  }
 
});
//--------------------------------------------------
