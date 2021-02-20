"use strict";
(() => {
  const ul = document.getElementsByTagName("ul");
  const li = document.createElement("li");
  li.textContent = "これです";
  ul[0].appendChild(li);
})();
