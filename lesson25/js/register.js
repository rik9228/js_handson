"use strict";

const fragment = document.createDocumentFragment("fragment");
const initCreateErrorElement = () => {
  for (let i = 0; i < 3; i++) {
    const errorMessage = document.createElement("p");
    setErrorMessageId(errorMessage, i);
    errorMessage.classList.add("errorMessage");
    fragment.appendChild(errorMessage);
  }
};

const setErrorMessageId = (element, index) => {
  switch (index) {
    case 0:
      element.id = "js-userNameError";
      break;

    case 1:
      element.id = "js-emailError";
      break;

    case 2:
      element.id = "js-passwordError";
      break;

    default:
      break;
  }
};

// エラーメッセージDOMの生成
initCreateErrorElement();



let validFlags = {
  userName: false,
  email: false,
  password: false,
};
const submit = document.getElementById("js-submit");
const changeDisabledSubmit = () => {
  if (Object.values(validFlags).includes(false)) {
    checkbox.disabled = true;
    submit.disabled = true;
  } else {
    submit.disabled = false;
    checkbox.disabled = false;
  }
};

const modalWrapper = document.getElementById("js-modalWrapper");
let clientHeight = modalWrapper.clientHeight;
let scrollHeight = modalWrapper.scrollHeight;

window.onresize = () => {
  clientHeight = modalWrapper.clientHeight;
  scrollHeight = modalWrapper.scrollHeight;
};


const modal = document.getElementById("js-modal");
const term = document.getElementById("js-term");

term.addEventListener("click", () => {
  modal.classList.add("show");
});


const closeButton = document.getElementById("js-close");
closeButton.addEventListener("click", () => {
  modal.classList.remove("show");
});


const userNameForm = document.getElementById("js-userName");
const userNameFormParent = userNameForm.parentNode;
const userErrorMessage = fragment.getElementById("js-userNameError");
userNameFormParent.insertBefore(userErrorMessage, userNameForm.nextSibling);

userNameForm.addEventListener("input", (e) => {
  const inputValue = Array.from(e.target.value);
  if (inputValue.length > 15) {
    validFlags.userName = false;
    userErrorMessage.textContent = "ユーザー名は15文字以下にしてください。";
  } else {
    validFlags.userName = true;
    userErrorMessage.textContent = "";
  }
  changeDisabledSubmit();
});


const emailForm = document.getElementById("js-email");
const emailFormParent = emailForm.parentNode;
const emailErrorMessage = fragment.getElementById("js-emailError");
emailFormParent.insertBefore(emailErrorMessage, emailForm.nextSibling);

emailForm.addEventListener("input", (e) => {
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


const passwordForm = document.getElementById("js-password");
const passwordFormParent = passwordForm.parentNode;
const passwordErrorMessage = fragment.getElementById("js-passwordError");
passwordFormParent.insertBefore(passwordErrorMessage, passwordForm.nextSibling);

passwordForm.addEventListener("input", (e) => {
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


const checkbox = document.getElementById("js-checkbox");
modalWrapper.addEventListener("scroll", (e) => {
  if (scrollHeight - (clientHeight + e.target.scrollTop) === 0) {
    checkbox.disabled = false;
    checkbox.checked = true;
    changeDisabledSubmit();
  }
});


const form = document.getElementById("js-form");
form.addEventListener("submit", (e) => (checkbox.checked ? null : e.preventDefault()));
