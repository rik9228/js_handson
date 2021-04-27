"use strict";

const resourceUrl = "https://jsondata.okiba.me/v1/json/C58qe210426143842";
const body = document.getElementById("body");
const wrapper = document.querySelector(".wrapper");
const box = document.querySelector(".box");
const prevButton = document.querySelector(".arrow__prev");
const nextButton = document.querySelector(".arrow__next");
const navNum = document.querySelector(".nav__num");
const fragment = document.createDocumentFragment();
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
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.classList.add("image");
  img.setAttribute("src", image.src);
  img.setAttribute("alt", image.alt);
  li.classList.add("listItem");
  li.dataset.index = index;
  li.append(img);

  if (index === 0) {
    li.classList.add("active");
  }
  wrapper.classList.add("show");
  fragment.appendChild(li);
};

const createImagesView = (datas) => {
  const images = datas.data;
  images.forEach(createImages);
  box.appendChild(fragment);
  slides.length = box.children.length;
  navNum.textContent = `${slides.currentNum + 1}/${slides.length}`;
  if (!slides.currentNum) {
    prevButton.disabled = true;
  }
};

const changeImage = (list) => {
  navNum.textContent = `${slides.currentNum + 1}/${slides.length}`;
  list.forEach((image) => {
    if (Number(image.dataset.index) === slides.currentNum) {
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
  isFirst();
  changeImage(list);
});

nextButton.addEventListener("click", () => {
  slides.currentNum++;
  isLast();
  changeImage(list);
});
