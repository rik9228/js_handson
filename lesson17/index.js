"use strict";

const resourceUrl = "https://jsondata.okiba.me/v1/json/C58qe210426143842";
const body = document.getElementById("body");
const wrapper = document.getElementById("js-wrapper");
const slideList = document.getElementById("js-slideList");
const prevButton = document.getElementById("js-prev");
const nextButton = document.getElementById("js-next");
const navNum = document.getElementById("js-navNum");

const slides = {
  list: null,
  currentNum: 0,
  updateCurrentNumber(number) {
    this.currentNum = this.currentNum + number;
  },
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
    slideList.textContent = "コンテンツがありません";
    return;
  }
  createImagesView(datas);
};

const createImages = (image, index) => {
  const fragment = document.createDocumentFragment();
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
  slideList.appendChild(fragment);
};

const createImagesView = (datas) => {
  const images = datas.data;
  images.forEach(createImages);
  slides.list = document.querySelectorAll(".listItem");
  navNum.textContent = `${slides.currentNum + 1}/${slides.list.length}`;
  if (!slides.currentNum) {
    prevButton.disabled = true;
  }
};

const changeImage = (beforeNum, { list, list: { length }, currentNum }) => {
  navNum.textContent = `${currentNum + 1}/${length}`;
  list[beforeNum].classList.remove("active");
  list[currentNum].classList.add("active");
};

init();

const disabledPrevCurrentFirst = () => {
  return slides.currentNum ? (nextButton.disabled = false) : (prevButton.disabled = true);
};

const disabledNextCurrentLast = () => {
  return slides.currentNum === slides.list.length - 1 ? (nextButton.disabled = true) : (prevButton.disabled = false);
};

prevButton.addEventListener("click", () => {
  const beforeNum = slides.currentNum;
  slides.updateCurrentNumber(-1);
  changeImage(beforeNum, slides);
  disabledPrevCurrentFirst();
});

nextButton.addEventListener("click", () => {
  const beforeNum = slides.currentNum;
  slides.updateCurrentNumber(1);
  changeImage(beforeNum, slides);
  disabledNextCurrentLast();
});
