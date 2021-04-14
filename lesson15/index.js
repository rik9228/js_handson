"use strict";

const resourceUrl = "https://jsondata.okiba.me/v1/json/Y5k0t210321123802";
const wrapper = document.querySelector(".wrapper");
const modal = document.querySelector(".modal");
const lists = document.querySelector(".lists");
const modalButton = document.getElementById("js-modal");
const inputName = document.getElementById("js-inputName");
const inputNumber = document.getElementById("js-inputNumber");
const form = document.getElementById("js-form");
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
  wrapper.appendChild(img);
};

const deleteLoadingGif = () => {
  const loadingGif = document.querySelector(".gif");
  loadingGif.remove();
};

const request = async () => {
  const resource = await fetch(resourceUrl);
  const json = await resource.json();
  return json;
};

const fetchData = async (num, name) => {
  showImage();
  let res;
  try {
    console.log(`数値：${num} 名前：${name}`);
    res = (await request()).data;
  } catch (error) {
    console.log(`実行結果：${error}`);
    res = [];
  } finally {
    deleteLoadingGif();
    return res;
  }
};

const init = async (num, name) => {
  const data = await fetchData(num, name);
  createListView(data);
};

modalButton.addEventListener("click", () => {
  modal.classList.add("js-show");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputNumberValue = inputNumber.value;
  const inputNameValue = inputName.value;

  if (inputNumberValue === "" || inputNameValue === "") {
    alert("数値及び名前が未入力です");
    return;
  }

  modal.classList.remove("js-show");
  modalButton.style.display = "none";

  init(inputNumberValue, inputNameValue);
});
