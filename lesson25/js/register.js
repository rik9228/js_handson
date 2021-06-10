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
  for (let i = 0; i < Object.keys(errorMessageElementIds).length; i++) {
    const errorElement = document.createElement("p");
    errorElement.classList.add("errorMessage");

    switch (i) {
      case 0:
        insertErrorMessageElement(userName, errorElement, userNameForm);
        break;

      case 1:
        insertErrorMessageElement(email, errorElement, emailForm);
        break;

      case 2:
        insertErrorMessageElement(password, errorElement, passwordForm);
        break;

      default:
        break;
    }
  }
};

// 生成するエラーメッセージ要素(<p>)のidをここで指定。
const errorMessageElementIds = {
  userName: "js-userNameError",
  email: "js-emailError",
  password: "js-passwordError",
};

// 初期化処理：エラーメッセージDOMの生成
initErrorMessageElementShow(errorMessageElementIds);

let validFlags = {
  userName: false,
  email: false,
  password: false,
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
  maxUserNameCount: 15,
  emailRegex: new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/),
  passwordRegex: new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/),
  /**
   * NOTE：
   * ・emailRegex
   * ^[A-Za-z0-9]{1}：先頭の1文字をアルファベット小文字/大文字/数字で許可
   * [A-Za-z0-9_.-]*：先頭より2文字目以降"@"までをアルファベット小文字/大文字/数字/アンダースコア/ピリオド/ハイフン、0文字以上を許可
   * "@"：連続してはいけない
   * @以降からトップレベルドメインまで:アルファベット小文字/大文字/数字/アンダースコア/ピリオド/ハイフンを許可、1文字以上
   * トップレベルドメイン:アルファベット小文字/大文字/数字、1文字以上を許可
   *
   * ・passwordRegex
   * ”0～9のいずれかを含む”かつ
   * ”a～zのいずれかを含む”かつ
   * ”A～Zのいずれかを含む”、
   * 0～9、a～z、A～Z、ハイフンのいずれかで構成された8文字以上の文字列を許可
   */
};

const errorMessages = {
  userName: "ユーザー名は15文字以下にしてください。",
  email: "メールアドレスの形式になっていません。",
  password: "8文字以上の大小の英数字を交ぜたものにしてください。",
};

userNameForm.addEventListener("blur", (e) => {
  const userNameErrorMessage = document.getElementById(errorMessageElementIds.userName);
  const inputValue = Array.from(e.target.value);
  if (inputValue.length > validateTerms.maxUserNameCount) {
    validFlags.userName = false;
    userNameErrorMessage.textContent = errorMessages.userName;
  } else {
    validFlags.userName = true;
    userNameErrorMessage.textContent = "";
  }
  changeDisabledSubmit();
});

emailForm.addEventListener("blur", (e) => {
  const emailErrorMessage = document.getElementById(errorMessageElementIds.email);
  const inputValue = e.target.value;
  if (validateTerms.emailRegex.test(inputValue)) {
    validFlags.email = true;
    emailErrorMessage.textContent = "";
  } else {
    validFlags.email = false;
    emailErrorMessage.textContent = errorMessages.email;
  }
  changeDisabledSubmit();
});

passwordForm.addEventListener("blur", (e) => {
  const passwordErrorMessage = document.getElementById(errorMessageElementIds.password);
  const inputValue = e.target.value;
  if (validateTerms.passwordRegex.test(inputValue)) {
    validFlags.password = true;
    passwordErrorMessage.textContent = "";
  } else {
    validFlags.password = false;
    passwordErrorMessage.textContent = errorMessages.password;
  }
  changeDisabledSubmit();
});

modalWrapper.addEventListener("scroll", (e) => {
  if (scrollHeight - (clientHeight + e.target.scrollTop) === 0) {
    checkbox.disabled = false;
    checkbox.checked = true;
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

form.addEventListener("submit", (e) => (checkbox.checked ? null : e.preventDefault()));
