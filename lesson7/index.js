"use strict";
(() => {
  const datas = [
    { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
    { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" },
  ];

  const ul = document.getElementsByTagName("ul");

  function createLi() {
    for (let i = 0; i < datas.length; i++) {
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
      ul[0].appendChild(li);
    }
  }

  // 画像を出力する
  function showImage() {
    const img = document.createElement("img");
    img.classList.add("gif");
    img.setAttribute("src", "loading-circle.gif");
    const body = document.getElementsByTagName("body");
    body[0].appendChild(img);
  }

  // 画像を削除する
  function deleteImage() {
    const gif = document.querySelector(".gif");
    gif.remove();
  }

  showImage();

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

  promise.then(() => {
    createLi();
    deleteImage();
  });
})();
