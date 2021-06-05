"use strict";

const closeButton = document.getElementById("js-close");
const term = document.getElementById("js-term");
const form = document.getElementById("js-form");
const modal = document.getElementById("js-modal");
const checkbox = document.getElementById("js-checkbox");
const modalWrapper = document.getElementById("js-modalWrapper");

term.addEventListener("click", () => {
  modal.classList.add("show");
});

closeButton.addEventListener("click", () => {
  modal.classList.remove("show");
});

modalWrapper.addEventListener("scroll", (e) => {
  const clientHeight = modalWrapper.clientHeight;
  const scrollHeight = modalWrapper.scrollHeight;
  if (scrollHeight - (clientHeight + e.target.scrollTop) === 0) {
    checkbox.checked = true;
  }
});

form.addEventListener("submit", (e) => (checkbox.checked ? null : e.preventDefault()));
