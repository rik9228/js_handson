"use strict";

const resourceUrl = "https://jsondata.okiba.me/v1/json/Y5k0t210321123802";
const list = document.getElementById("list");
const fragment = document.createDocumentFragment();

const createListView = (data) => {
  for (let i = 0; i < data.length; i++) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const a = document.createElement("a");
    const text = document.createTextNode(data[i].text);
    img.src = data[i].img;
    img.alt = data[i].alt;
    a.href = `/${data[i].to}`;
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
    res = (await request()).data;
  } catch (error) {
    console.log(`実行結果：${error}`);
    res = [];
  } finally {
    deleteLoadingGif();
    return res;
  }
};

const init = async () => {
  const data = await fetchData();
  createListView(data);
};

window.addEventListener("click", () => {
  init();
});
