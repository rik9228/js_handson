"use strict";

const resourceUrl = "https://jsondata.okiba.me/v1/json/Y5k0t210321123802";
const list = document.getElementById("list");
const fragment = document.createDocumentFragment();

const createListView = (datas) => {
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
};

const showImage = () => {
  const img = document.createElement("img");
  img.classList.add("gif");
  img.setAttribute("src", "loading-circle.gif");
  const body = document.getElementById("body");
  body.appendChild(img);
};

const deleteLoadingGif = () => {
  const loadingGif = document.querySelector(".gif");
  loadingGif.remove();
};

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const request = async () => {
  const resource = await fetch(resourceUrl);
  const deploymentResource = await resource.json();
  return deploymentResource;
};

const fetchData = async () => {
  showImage();
  let res;
  try {
    await timeout(3000);
    res = await request();
  } catch (error) {
    console.log(`実行結果：${error}`);
  } finally {
    deleteLoadingGif();
    return res;
  }
};

const init = async () => {
  const datas = await fetchData();
  createListView(datas.data);
};

init().catch((error) => console.error("データを取得できませんでした"));
