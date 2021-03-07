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
  }
  fragment.appendChild(li);
}

function showImage() {
  const img = document.createElement("img");
  img.classList.add("gif");
  img.setAttribute("src", "loading-circle.gif");
  const body = document.getElementsByTagName("body");
  body[0].appendChild(img);
}

function deleteImage() {
  const gif = document.querySelector(".gif");
  gif.remove();
}

const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (datas) {
      reject(datas);
    } else {
      resolve(datas);
    }
  }, 3000);
});

showImage();

fetchData
  .then((datas) => createListView(datas))
  .then(() => deleteImage())
  .catch(() => console.error("error caused"));
