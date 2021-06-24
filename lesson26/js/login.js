"use strict";

const form = document.getElementById("js-form");
const submitButton = document.getElementById("js-submit");
const userNameForm = document.getElementById("js-userName");
const passwordForm = document.getElementById("js-password");

const setErrorMessage = (id, errorElement, formElement) => {
  errorElement.id = `js-${id}Error`;
  const formParentElement = formElement.parentNode;
  formParentElement.appendChild(errorElement);
};

const createErrorMessage = (errorMessageIdNames) => {
  Object.keys(errorMessageIdNames).forEach((key) => {
    const formElement = document.getElementById(`js-${key}`);
    const errorElement = document.createElement("p");
    errorElement.classList.add("errorMessage");

    setErrorMessage(key, errorElement, formElement);
  });
};

// 生成するエラーメッセージ要素(<p>)のidをここで指定。
const errorMessageIdNames = {
  userName: "js-userNameError",
  password: "js-passwordError",
};

// 初期化処理：エラーメッセージDOMの生成（初期はテキストは空にしておく）
createErrorMessage(errorMessageIdNames);

const userNameErrorElement = document.getElementById(errorMessageIdNames.userName);
const passwordErrorElement = document.getElementById(errorMessageIdNames.password);

let validFlags = {
  userName: false,
  password: false,
};

const changeDisabledSubmit = () => {
  if (Object.values(validFlags).includes(false)) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
};

// バリデーション条件
let validateTerms = {
  userName: {
    maxLength: 15,
  },
  password: {
    passwordRegex: new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/),
  },
};

const errorMessages = {
  userName: "ユーザー名は15文字以下にしてください。",
  password: "8文字以上の大小の英数字を交ぜたものにしてください。",
};

const isValid = (key) => {
  switch (key) {
    case "userName":
      return form[key].value.length <= validateTerms.userNameMaxCount;

    case "password":
      return validateTerms[key].passwordRegex.test(form[key].value);
    default:
      return;
  }
};

const errorMessageHandler = (key, errorMessage) => {
  if (isValid(key)) {
    errorMessage.textContent = "";
  } else {
    errorMessage.textContent = errorMessages[key];
  }
};

const isValidLength = (key, inputValue) => inputValue.length < validateTerms[key].maxLength;

const updateValidation = (key, isValid) => {
  validFlags[key] = isValid;
};

const updateTextContent = (key, isValid, elem) => {
  elem.textContent = isValid ? "" : errorMessages[key];
};

userNameForm.addEventListener("blur", (e) => {
  const key = "userName";
  const isValid = isValidLength(key, e.target.value);
  updateValidation(key, isValid);
  updateTextContent(key, isValid, userNameErrorElement);
  changeDisabledSubmit();
});

passwordForm.addEventListener("blur", (e) => {
  const key = "password";
  const isValidPassword = isValid(key, e.target.value);
  updateValidation(key, isValidPassword);
  updateTextContent(key, isValidPassword, passwordErrorElement);
  changeDisabledSubmit();
});

const setLocalStorage = () => {
  const loginInfo = {
    userName: "rikumorishita",
    password: "N302aoe3",
  };
  localStorage.setItem("userName", userNameForm.value);
  localStorage.setItem("password", passwordForm.value);
  return loginInfo;
};

const checkUserNameAndPassword = (data) => data.userName === localStorage.userName && data.password === localStorage.password;

// trueを返す
const checkLogin = (data) => {
  if (checkUserNameAndPassword(data)) {
    localStorage.setItem("userName", userNameForm.value);
    localStorage.setItem("password", passwordForm.value);
    const response = { token: "fafae92rfjafa03", ok: true, code: 200 };
    return response;
  } else {
    const response = { ok: false, code: 401 };
    throw response;
  }
};

const login = (data) => {
  const loginPromise = new Promise((resolve, reject) => {
    if (checkLogin(data)) {
      resolve(checkLogin(data));
    } else {
      reject(data);
    }
  });

  loginPromise.then((value) => {
    localStorage.setItem("token", value.token);
    location.href = "content.html";
  });

  loginPromise.catch((e) => {
    location.href = "loginFailed.html";
  });
};

const loginHandler = async (e) => {
  e.preventDefault();
  const data = setLocalStorage();
  await login(data);
};

form.addEventListener("submit", loginHandler);

window.addEventListener("load", () => {
  if (localStorage.getItem("token")) {
    location.href = "content.html";
  }
});
