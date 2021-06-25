"use strict";

const modal = document.getElementById("js-modal");
const modalWrapper = document.getElementById("js-modalWrapper");
const checkbox = document.getElementById("js-checkbox");
const closeButton = document.getElementById("js-close");

const form = document.getElementById("js-form");
const term = document.getElementById("js-term");
const submitButton = document.getElementById("js-submit");

const setErrorMessage = (errorElement, formElement) => {
  const formParentElement = formElement.parentNode;
  formParentElement.appendChild(errorElement);
};

const createErrorMessage = (errorMessageIdNames) => {
  Object.keys(errorMessageIdNames).forEach((key) => {
    const formElement = document.getElementById(`js-${key}`);
    const errorElement = document.createElement("p");
    errorElement.classList.add("errorMessage");
    errorElement.id = `js-${key}Error`;

    setErrorMessage(errorElement, formElement);
  });
};

// 生成するエラーメッセージ要素(<p>)のidをここで指定。
const errorMessageIdNames = {
  userName: "js-userNameError",
  email: "js-emailError",
  password: "js-passwordError",
};

// 初期化処理：エラーメッセージDOMの生成（初期はテキストは空にしておく）
createErrorMessage(errorMessageIdNames);

let validFlags = {
  userName: false,
  email: false,
  password: false,
  useTerm: false,
};

const changeDisabledSubmitBtn = () => {
  if (Object.values(validFlags).includes(false)) {
    submitButton.disabled = true;
    checkbox.disabled = true;
  } else {
    submitButton.disabled = false;
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

const isValid = (key) => {
  switch (key) {
    case "userName":
      return form[key].value.length <= validateTerms.userNameMaxCount;

    case "email":
      return validateTerms.emailRegex.test(form[key].value);

    case "password":
      return validateTerms.passwordRegex.test(form[key].value);

    default:
      return;
  }
};

const validFlagsAndErrorMessageHandler = (key, errorMessage) => {
  if (isValid(key)) {
    validFlags[key] = true;
    errorMessage.textContent = "";
  } else {
    validFlags[key] = false;
    errorMessage.textContent = errorMessages[key];
  }
};

Object.keys(errorMessageIdNames).forEach((key) => {
  const errorElement = document.getElementById(errorMessageIdNames[key]);
  form[key].addEventListener("blur", (e) => {
    validFlagsAndErrorMessageHandler(key, errorElement);
    changeDisabledSubmitBtn();
  });
});

modalWrapper.addEventListener("scroll", (e) => {
  if (scrollHeight - (clientHeight + e.target.scrollTop) === 0) {
    checkbox.disabled = false;
    checkbox.checked = true;
    validFlags["useTerm"] = true;
    changeDisabledSubmitBtn();
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
    validFlags["useTerm"] = true;
  } else {
    validFlags["useTerm"] = false;
  }
  changeDisabledSubmitBtn();
});

form.addEventListener("submit", (e) => {
  if (checkbox.checked) {
    e.preventDefault();
    location.href = "./register-done.html";
  }
});
