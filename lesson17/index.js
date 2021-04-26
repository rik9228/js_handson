"use strict";

const resourceUrl = "https://jsondata.okiba.me/v1/json/9gjw3210424132243";
const body = document.getElementById("body");
const wrapper = document.querySelector(".wrapper");
const box = document.querySelector(".box");
const prevButton = document.querySelector(".prevNext__prev");
const nextButton = document.querySelector(".prevNext__next");
const navigationNum = document.querySelector(".navigation__num");
const fragment = document.createDocumentFragment();
let li;
let list;

const slides = {
  length: null,
  currentNum: 0,
};

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const request = async () => {
  const resource = await fetch(resourceUrl);
  let json = await resource.json();
  return json;
};

const fetchData = async () => {
  let res;
  try {
    await timeout(3000);
    res = await request();
  } catch (error) {
    res = [];
  } finally {
    return res;
  }
};

const init = async () => {
  const datas = await fetchData();
  if (datas.length === 0) {
    box.textContent = "コンテンツがありません";
    return;
  }
  createImagesView(datas);
  list = document.querySelectorAll(".listItem");
};

const createImages = (image, index) => {
  li = document.createElement("li");
  const img = document.createElement("img");
  img.classList.add("image");
  img.setAttribute("src", image.src);
  img.setAttribute("alt", image.alt);
  li.classList.add("listItem");
  li.dataset.num = index; // HACK: data属性にindexをそのまま用いているがこれは適切か。
  li.append(img);

  if (image.isCurrent) {
    li.classList.add("active");
  }
  wrapper.classList.add("show");
  fragment.appendChild(li);
};

const createImagesView = (datas) => {
  const images = datas.data;
  images.forEach((image, index) => {
    createImages(image, index);
  });
  box.appendChild(fragment);
  slides.length = box.children.length;
  navigationNum.textContent = `${slides.currentNum + 1}/${slides.length}`;
  if (!slides.currentNum) {
    prevButton.disabled = true;
  }
};

const changeImage = (list) => {
  list.forEach((image) => {
    if (Number(image.dataset.num) === slides.currentNum) {
      image.classList.add("active");
    } else {
      image.classList.remove("active");
    }
  });
};

init();

const isFirst = () => {
  return slides.currentNum ? (nextButton.disabled = false) : (prevButton.disabled = true);
};

const isLast = () => {
  return slides.currentNum === list.length - 1 ? (nextButton.disabled = true) : (prevButton.disabled = false);
};


prevButton.addEventListener("click", () => {
  slides.currentNum--;
  navigationNum.textContent = `${slides.currentNum + 1}/${slides.length}`;
  isFirst();
  changeImage(list);
});

nextButton.addEventListener("click", () => {
  slides.currentNum++;
  navigationNum.textContent = `${slides.currentNum + 1}/${slides.length}`;
  isLast();
  changeImage(list);

});
