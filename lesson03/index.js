"use strict";
(() => {
  const datas = [
    {
      href: "a1.html",
      src: "/img/bookmark.png",
      text: "a1",
    },
    {
      href: "a2.html",
      src: "/img/bookmark.png",
      text: "a2",
    },
  ];

  for (let i = 0; i < datas.length; i++) {
    const ul = document.getElementsByTagName("ul");
    const li = document.createElement("li");
    const img = document.createElement("img");
    const a = document.createElement("a");
    const text = document.createTextNode(datas[i].text);
    img.setAttribute("src", datas[i].src);
    a.setAttribute("href", datas[i].href);

    a.appendChild(img);
    a.appendChild(text);
    img.after(text);

    li.appendChild(a);
    ul[0].appendChild(li);
  }
})();
