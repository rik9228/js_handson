"use strict";

const form = document.getElementById("js-form");
const submitButton = document.getElementById("js-submit");
const userNameForm = document.getElementById("js-userName");
const passwordForm = document.getElementById("js-password");

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
  password: "js-passwordError",
};

// 初期化処理：エラーメッセージDOMの生成（初期はテキストは空にしておく）
createErrorMessage(errorMessageIdNames);

const userNameErrorElement = document.getElementById(errorMessageIdNames.userName);
const passwordErrorElement = document.getElementById(errorMessageIdNames.password);

const validFlags = {
  userName: false,
  password: false,
};

const changeDisabledSubmitButtonState = () => {
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
      return form[key].value.length <= validateTerms[key].maxLength;

    case "password":
      return validateTerms[key].passwordRegex.test(form[key].value);
    default:
      return;
  }
};

const controlErrorMessage = (key, errorMessage) => {
  errorMessage.textContent = isValid(key) ? "" : errorMessages[key];
};

const updateValidFlag = (key, isValid) => {
  validFlags[key] = isValid;
};

userNameForm.addEventListener("blur", (e) => {
  const key = "userName";
  const isValidUserName = isValid(key);
  updateValidFlag(key, isValidUserName);
  controlErrorMessage(key, userNameErrorElement);
  changeDisabledSubmitButtonState();
});

passwordForm.addEventListener("blur", (e) => {
  const key = "password";
  const isValidPassword = isValid(key);
  updateValidFlag(key, isValidPassword);
  controlErrorMessage(key, passwordErrorElement);
  changeDisabledSubmitButtonState();
});

const getLoginInfo = () => {
  const loginInfo = {
    userName: "rikumorishita",
    password: "N302aoe3",
  };
  return loginInfo;
};

const checkUserNameAndPassword = (data) => data.userName === userNameForm.value && data.password === passwordForm.value;

// trueを返す
const checkLogin = (data) => {
  if (checkUserNameAndPassword(data)) {
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
  const data = getLoginInfo();
  await login(data);
};

form.addEventListener("submit", loginHandler);

window.addEventListener("load", () => {
  if (localStorage.getItem("token")) {
    location.href = "content.html";
  }
});
