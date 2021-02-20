"use strict";
(() => {
  const ul = document.getElementsByTagName("ul");
  const li = document.createElement("li");
  const img = document.createElement("img");
  const a = document.createElement("a");
  img.setAttribute("src", "bookmark.png");
  img.setAttribute("alt", "ブックマーク");
  a.setAttribute("href", "1.html");

  const text = document.createTextNode("これです");
  a.appendChild(img);
  a.appendChild(text);
  img.after(text);

  li.appendChild(a);
  ul[0].appendChild(li);
})();
