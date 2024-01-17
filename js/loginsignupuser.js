
let emails=[];
emails = JSON.parse(localStorage.getItem("userEmailsStorage"));

if (emails === null) {
  emails = [];
}
  let login = { 
    id: emails.length,
    userName: "",
    userEmail: "",
    password: "",
    carProduct: [],
  };
 

  (regUserName = /^[A-Z]{3,9}$/i),
  (regUserEmail =/^[a-zA-Z0-9]+([a-zA-Z0-9._-])*@[a-zA-Z0-9.-]*\.[a-zA-Z]{2,4}$/),
  (regPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@_$%^&*-]).{8,}$/);

function singUpFun() {
 
  login.userEmail = document.getElementById("userEmail").value;
  login.password = document.getElementById("password").value;
  login.userName = document.getElementById("userName").value;

  if (login.userName == "") {
    document.getElementById("nameError").innerText = "Name is required";
    document.getElementById("nameError").classList.remove("hidden");
    setTimeout(() => {
      document
      .getElementById("nameError")
      .classList.add("hidden");
      },3000);
    return;

  } else if (!regUserName.test(login.userName)) {
    document.getElementById("nameError").innerText = "Name must be 3 - 9 char ";
    document.getElementById("nameError").classList.remove("hidden");
    setTimeout(() => {
      document
      .getElementById("nameError")
      .classList.add("hidden");
      },3000);
    return;

  } else if (login.userEmail == "") {
    document.getElementById("emailError").innerText = "Email is required";
    document
      .getElementById("emailError")
      .classList.remove("hidden");
      setTimeout(() => {
        document
        .getElementById("emailError")
        .classList.add("hidden");
        },3000);
    return;

  } else if (!regUserEmail.test(login.userEmail)) {
    document.getElementById("emailError").innerText = "Email is invalid";
    document
      .getElementById("emailError")
      .classList.remove("hidden");
      setTimeout(() => {
        document
        .getElementById("emailError")
        .classList.add("hidden");
        },3000);
    return;

  } else if (login.userEmail) {
    for (let i = 0; i < emails.length; i++) {
      if (login.userEmail == emails[i].userEmail) {
        document.getElementById("emailError").innerText =
          "Email is already exists. you can login now.";
        document
          .getElementById("emailError")
          .classList.remove("hidden");
          setTimeout(() => {
            document
            .getElementById("emailError")
            .classList.add("hidden");
            },3000);
            return;
      }
      
    }
    if (login.password == "") {
      document.getElementById("passwordError").innerText =
        "Password is required";
      document
        .getElementById("passwordError")
        .classList.remove("hidden");
        setTimeout(() => {
          document
          .getElementById("passwordError")
          .classList.add("hidden");
          },3000);
      return;

    } else if (!regPassword.test(login.password)) {
      document.getElementById("passInstractionsError").classList.remove("passInstractions");
      return;
    }

  } else if (login.password == "") {
    document.getElementById("passwordError").innerText = "Password is required";
    document
      .getElementById("passwordError")
      .classList.add("hidden");
    return;
  } else if (!regPassword.test(login.password)) {
    document.getElementById("passwordError").innerText =
      "password must be 8 (char or num) or more";
    document
      .getElementById("passwordError")
      .classList.remove("hidden");
      setTimeout(() => {
        document
        .getElementById("passwordError")
        .classList.add("hidden");
        },3000);
    return;
  }
  emails.push(login);
  localStorage.setItem("userEmailsStorage", JSON.stringify(emails));
  location.assign("../login.html");
}

function logInFun() {
  login.userEmail = document.getElementById("userEmail").value;
  login.password = document.getElementById("password").value;
  
  for (let i = 0; i < emails.length; i++) {
    if (
      login.userEmail == emails[i].userEmail &&
      login.password == emails[i].password
    ) {
      location.assign("../index.html");
      localStorage.setItem("userLoggedIn", JSON.stringify(emails[i]));
      return i;
    } 
    
    else if (login.userEmail == "" && login.password == "") {
      document.getElementById("passwordError").innerText =
        "Password is required";
      document.getElementById("emailError").innerText = "Email is required.";
      document
        .getElementById("passwordError")
        .classList.remove("hidden");
        setTimeout(() => {
         document
        .getElementById("passwordError")
        .classList.add("hidden");
        },3000);
      document
        .getElementById("emailError")
        .classList.remove("hidden");
        setTimeout(() => {
          document
        .getElementById("emailError")  
        .classList.add("hidden");
        },3000);
      return;


    } else if (login.userEmail == emails[i].userEmail && login.password == "") {
      document.getElementById("passwordError").innerText =
        "Password is required.";
      document
        .getElementById("passwordError")
        .classList.remove("hidden");
        setTimeout(() => {
          document
          .getElementById("passwordError")
          .classList.add("hidden");
        },3000);
      return;

    } else if (
      login.userEmail == emails[i].userEmail &&
      login.password != emails[i].password
    ) {
      document.getElementById("passwordError").innerText =
        "Incorrect password.";
      document
        .getElementById("passwordError")
        .classList.remove("hidden");
        setTimeout(() => {
        document
        .getElementById("passwordError")
        .classList.add("hidden");
        },3000);
      
      
      return;
    }
    
  }
  document.getElementById("passwordError").innerText =
  "Email does not exist. Please sign up.";
  document
    .getElementById("passwordError")
    .classList.remove("hidden")
    setTimeout(() => {
      document
      .getElementById("passwordError")
      .classList.add("hidden");
    },3000);
 
}





