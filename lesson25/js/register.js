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
  for (let i = 0; i < 3; i++) {
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

// エラーメッセージDOMの生成
initErrorMessageElementShow(errorMessageElementIds);

let validFlags = {
  userName: false,
  email: false,
  password: false,
};

const changeDisabledSubmit = () => {
  if (Object.values(validFlags).includes(false)) {
    checkbox.disabled = true;
    submit.disabled = true;
  } else {
    submit.disabled = false;
    checkbox.disabled = false;
  }
};

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

userNameForm.addEventListener("blur", (e) => {
  const userNameErrorMessage = document.getElementById("js-userNameError");
  const inputValue = Array.from(e.target.value);
  if (inputValue.length > 15) {
    validFlags.userName = false;
    userNameErrorMessage.textContent = "ユーザー名は15文字以下にしてください。";
  } else {
    validFlags.userName = true;
    userNameErrorMessage.textContent = "";
  }
  changeDisabledSubmit();
});

emailForm.addEventListener("blur", (e) => {
  const emailErrorMessage = document.getElementById("js-emailError");
  /**
   * NOTE：
   * ^[A-Za-z0-9]{1}：先頭の1文字をアルファベット小文字/大文字/数字で許可
   * [A-Za-z0-9_.-]*：先頭より2文字目以降"@"までをアルファベット小文字/大文字/数字/アンダースコア/ピリオド/ハイフン、0文字以上を許可
   * "@"：連続してはいけない
   * @以降からトップレベルドメインまで:アルファベット小文字/大文字/数字/アンダースコア/ピリオド/ハイフンを許可、1文字以上
   * トップレベルドメイン:アルファベット小文字/大文字/数字、1文字以上を許可
   */
  const emailRegex = new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/);
  const inputValue = e.target.value;

  if (emailRegex.test(inputValue)) {
    validFlags.email = true;
    emailErrorMessage.textContent = "";
  } else {
    validFlags.email = false;
    emailErrorMessage.textContent = "メールアドレスの形式になっていません。";
  }
  changeDisabledSubmit();
});

passwordForm.addEventListener("blur", (e) => {
  const passwordErrorMessage = document.getElementById("js-passwordError");
  /**
   * NOTE：
   * ”0～9のいずれかを含む”かつ
   * ”a～zのいずれかを含む”かつ
   * ”A～Zのいずれかを含む”、
   * 0～9、a～z、A～Z、ハイフンのいずれかで構成された8文字以上の文字列を許可
   */
  const passwordRegex = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/);
  const inputValue = e.target.value;

  if (passwordRegex.test(inputValue)) {
    validFlags.password = true;
    passwordErrorMessage.textContent = "";
  } else {
    validFlags.password = false;
    passwordErrorMessage.textContent = "8文字以上の大小の英数字を交ぜたものにしてください。";
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

form.addEventListener("submit", (e) => (checkbox.checked ? null : e.preventDefault()));
