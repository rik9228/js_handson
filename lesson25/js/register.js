"use strict";

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

const submit = document.getElementById("js-submit");
const changeDisabledCheckSubmit = () => {
  if (Object.values(validFlags).includes(false)) {
    checkbox.disabled = true;
    submit.disabled = true;
  } else {
    checkbox.disabled = false;
    submit.disabled = false;
  }
};


let validFlags = {
  userName: false,
  email: false,
  password: false,
};
const userName = document.getElementById("js-userName");
const userErrorMessage = document.getElementById("js-userErrorMessage");

userName.addEventListener("input", (e) => {
  const inputValue = Array.from(e.target.value);
  if (inputValue.length > 15) {
    validFlags.userName = false;
    userErrorMessage.classList.add("show");
  } else {
    validFlags.userName = true;
    userErrorMessage.classList.remove("show");
  }
  changeDisabledCheckSubmit();
});


const email = document.getElementById("js-email");
const emailErrorMessage = document.getElementById("js-emailErrorMessage");

email.addEventListener("input", (e) => {
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
    emailErrorMessage.classList.remove("show");
  } else {
    validFlags.email = false;
    emailErrorMessage.classList.add("show");
  }
  changeDisabledCheckSubmit();
});


const password = document.getElementById("js-password");
const passwordErrorMessage = document.getElementById("js-passwordErrorMessage");

password.addEventListener("input", (e) => {
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
    passwordErrorMessage.classList.remove("show");
  } else {
    validFlags.password = false;
    passwordErrorMessage.classList.add("show");
  }
  changeDisabledCheckSubmit();
});


const checkbox = document.getElementById("js-checkbox");
modalWrapper.addEventListener("scroll", (e) => {
  if (scrollHeight - (clientHeight + e.target.scrollTop) === 0) {
    checkbox.disabled = false;
    checkbox.checked = true;
  }
});


const form = document.getElementById("js-form");
form.addEventListener("submit", (e) => (checkbox.checked ? null : e.preventDefault()));
