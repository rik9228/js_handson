"use strict";

const modal = document.getElementById("js-modal");
const modalWrapper = document.getElementById("js-modalWrapper");
const checkbox = document.getElementById("js-checkbox");
const closeButton = document.getElementById("js-close");

const form = document.getElementById("js-form");
const term = document.getElementById("js-term");
const submit = document.getElementById("js-submit");
const userNameForm = document.getElementById("js-userName");
const emailForm = document.getElementById("js-email");
const passwordForm = document.getElementById("js-password");

const insertErrorMessageElement = (id, element, formElement) => {
  element.id = id;
  const formParentElement = formElement.parentNode;
  formParentElement.insertBefore(element, formElement.nextSibling);
};

const initErrorMessageElementShow = ({ userName, email, password }) => {
  Object.values(errorMessageElementIdNames).forEach((errorMessageElementIdName) => {
    const errorElement = document.createElement("p");
    errorElement.classList.add("errorMessage");
    switch (errorMessageElementIdName) {
      case userName:
        insertErrorMessageElement(userName, errorElement, userNameForm);
        break;

      case email:
        insertErrorMessageElement(email, errorElement, emailForm);
        break;

      case password:
        insertErrorMessageElement(password, errorElement, passwordForm);
        break;

      default:
        break;
    }
  });
};

// 生成するエラーメッセージ要素(<p>)のidをここで指定。
const errorMessageElementIdNames = {
  userName: "js-userNameError",
  email: "js-emailError",
  password: "js-passwordError",
};

// 初期化処理：エラーメッセージDOMの生成（初期はテキストは空にしておく）
initErrorMessageElementShow(errorMessageElementIdNames);
const userNameErrorElement = document.getElementById(errorMessageElementIdNames.userName);
const emailErrorElement = document.getElementById(errorMessageElementIdNames.email);
const passwordErrorElement = document.getElementById(errorMessageElementIdNames.password);

let validFlags = {
  userName: false,
  email: false,
  password: false,
  useTerm: false,
};

const changeDisabledSubmit = () => {
  if (Object.values(validFlags).includes(false)) {
    submit.disabled = true;
    checkbox.disabled = true;
  } else {
    submit.disabled = false;
    checkbox.disabled = false;
  }
};

// バリデーション条件
let validateTerms = {
  userNameMaxCount: 15,
  emailRegex: new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/),
  passwordRegex: new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/),
};

const errorMessages = {
  userName: "ユーザー名は15文字以下にしてください。",
  email: "メールアドレスの形式になっていません。",
  password: "8文字以上の大小の英数字を交ぜたものにしてください。",
};

userNameForm.addEventListener("blur", (e) => {
  const inputValue = [...e.target.value];
  if (inputValue.length < validateTerms.userNameMaxCount) {
    validFlags.userName = true;
    userNameErrorElement.textContent = "";
  } else {
    validFlags.userName = false;
    userNameErrorElement.textContent = errorMessages.userName;
  }
  changeDisabledSubmit();
});

emailForm.addEventListener("blur", (e) => {
  const inputValue = e.target.value;
  if (validateTerms.emailRegex.test(inputValue)) {
    validFlags.email = true;
    emailErrorElement.textContent = "";
  } else {
    validFlags.email = false;
    emailErrorElement.textContent = errorMessages.email;
  }
  changeDisabledSubmit();
});

passwordForm.addEventListener("blur", (e) => {
  const inputValue = e.target.value;
  if (validateTerms.passwordRegex.test(inputValue)) {
    validFlags.password = true;
    passwordErrorElement.textContent = "";
  } else {
    validFlags.password = false;
    passwordErrorElement.textContent = errorMessages.password;
  }
  changeDisabledSubmit();
});

modalWrapper.addEventListener("scroll", (e) => {
  if (scrollHeight - (clientHeight + e.target.scrollTop) === 0) {
    checkbox.disabled = false;
    checkbox.checked = true;
    validFlags.useTerm = true;
    changeDisabledSubmit();
  }
});

let clientHeight = modalWrapper.clientHeight;
let scrollHeight = modalWrapper.scrollHeight;

window.onresize = () => {
  clientHeight = modalWrapper.clientHeight;
  scrollHeight = modalWrapper.scrollHeight;
};

term.addEventListener("click", () => {
  modal.classList.add("show");
});

closeButton.addEventListener("click", () => {
  modal.classList.remove("show");
});

checkbox.addEventListener("click", () => {
  if (checkbox.checked) {
    validFlags.useTerm = true;
  } else {
    validFlags.useTerm = false;
  }
  changeDisabledSubmit();
});

form.addEventListener("submit", (e) => {
  if (checkbox.checked) {
    e.preventDefault();
    location.href = "./register-done.html";
  }
});
