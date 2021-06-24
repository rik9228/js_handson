"use strict";

const logoutButton = document.getElementById("js-logout");

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  location.href = "index.html";
});
