"use strict";

const datas = [
  { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
  { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" },
];

const list = document.getElementById("list");
const fragment = document.createDocumentFragment();

function createListView(datas) {
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
    fragment.appendChild(li);
  }
  // ループ終了後にまとめてDOM追加 → list へのアクセスが1回だけで済む。
  list.appendChild(fragment);
}

const fetchData = new Promise((resolve) => {
  setTimeout(() => {
    resolve(datas);
  }, 3000);
});

fetchData.then((datas) => createListView(datas));
