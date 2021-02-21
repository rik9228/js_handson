"use strict";
{
  const datas = [
    { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
    { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" },
  ];

  function insertLi(datas) {
    for (let i = 0; i < datas.length; i++) {
      const list = document.getElementById("list");
      const li = document.createElement("li");
      const img = document.createElement("img");
      const a = document.createElement("a");

      const text = document.createTextNode(datas[i].text);
      img.setAttribute("src", datas[i].img);
      img.setAttribute("alt", datas[i].alt);
      a.setAttribute("href", "/" + datas[i].to);
      a.appendChild(img);
      a.appendChild(text);
      img.after(text);

      li.appendChild(a);
      list.appendChild(li);
    }
  }

  const firstPromise = new Promise((resolve, reject) => resolve(datas));
  firstPromise.then((datas) => insertLi(datas));
}
