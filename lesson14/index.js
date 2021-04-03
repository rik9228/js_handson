"use strict";

const resourceUrl = "https://jsondata.okiba.me/v1/json/Y5k0t210321123802";
const lists = document.getElementById("lists");
const modal = document.getElementById("modal");
const modalWrapper = document.querySelector(".modal__wrapper");
const requestButton = document.getElementById("js-request");
const modalButton = document.getElementById("js-modal");
const closeButton = document.getElementById("js-close");
const input = document.getElementById("js-input");
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
  lists.appendChild(fragment);
};

const showImage = () => {
  const img = document.createElement("img");
  img.classList.add("gif");
  img.setAttribute("src", "loading-circle.gif");
  modalWrapper.insertBefore(img, requestButton);
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
  const json = await resource.json();
  return json;
};

const fetchData = async (value) => {
  showImage();
  let res;
  try {
    console.log(value);
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

const init = async (value) => {
  const data = await fetchData(value);
  createListView(data);
};

modalButton.addEventListener("click", () => {
  modal.classList.add("js-show");
});

closeButton.addEventListener("click", () => {
  modal.classList.remove("js-show");
});

requestButton.addEventListener("click", () => {
  requestButton.style.display = "none";
  const inputValue = input.value;
  init(inputValue);
});
