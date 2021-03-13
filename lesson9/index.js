"use strict";

const datas = [
  { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
  { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" },
];

const body = document.getElementById("body");
const list = document.getElementById("list");
const fragment = document.createDocumentFragment();

function createListView(datas) {
  for (let i = 0; i < datas.length; i++) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const a = document.createElement("a");

    const text = document.createTextNode(datas[i].text);
    img.src = datas[i].img;
    img.alt = datas[i].alt;
    a.href = `/${datas[i].to}`;
    a.appendChild(img);
    a.appendChild(text);
    img.after(text);

    li.appendChild(a);
    fragment.appendChild(li);
  }
  list.appendChild(fragment);
}

function showImage() {
  const img = document.createElement("img");
  img.classList.add("gif");
  img.setAttribute("src", "loading-circle.gif");
  const body = document.getElementById("body");
  body.appendChild(img);
}

function deleteLoadingGif() {
  const loadingGif = document.querySelector(".gif");
  loadingGif.remove();
}

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(datas);
    }, 3000);
  });
}

async function showData() {
  await fetchData();
  createListView(datas);
  deleteLoadingGif();
}

showImage();
showData();
