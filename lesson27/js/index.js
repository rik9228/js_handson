"use strict";

window.addEventListener("load", () => {
  if (localStorage.getItem("token")) {
    location.href = "content.html";
  } else {
    location.href = "login.html";
  }
});
