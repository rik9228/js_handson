"use strict";

const form = document.getElementById("js-form");
const submitButton = document.getElementById("js-submit");
const userNameForm = document.getElementById("js-userName");
const passwordForm = document.getElementById("js-password");

window.addEventListener("load", () => {
  if (localStorage.getItem("token")) {
    location.href = "content.html";
  }
});

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

let validFlags = {
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
const validateTerms = {
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

const setLoginInfo = () => {
  const loginInfo = {
    userName: "rikumorishita",
    password: "N302aoe3",
  };
  return loginInfo;
};

const checkUserNameAndPassword = (data) => data.userName === userNameForm.value && data.password === passwordForm.value;

const checkLogin = (data) => {
  if (checkUserNameAndPassword(data)) {
    const response = { token: "far0fja*ff]afaawfqrlzkfq@aq9283af", ok: true, code: 200 };
    return response;
  } else {
    const response = { ok: false, code: 401 };
    throw response;
  }
};

const login = (data) => {
  const loginPromise = new Promise((resolve, reject) => {
    if (checkLogin(data).ok) {
      resolve(checkLogin(data));
    } else {
      reject(checkLogin(data));
    }
  });

  loginPromise.then((res) => {
    localStorage.setItem("token", res.token);
    location.href = "content.html";
  });

  loginPromise.catch(() => {
    location.href = "loginfailed.html";
  });
};

const loginHandler = async (e) => {
  e.preventDefault();
  const data = setLoginInfo();
  await login(data);
};

form.addEventListener("submit", loginHandler);
