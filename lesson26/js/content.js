"use strict";

const logout = document.getElementById("js-logout");

window.addEventListener("load", () => {
  const token = sessionStorage.getItem("token");
  localStorage.setItem("token", token);
});

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  location.href = "login.html";
});
