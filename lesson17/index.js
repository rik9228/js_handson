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
let imageLength;
let currentNum = 0;

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
  imageLength = box.children.length;
  navigationNum.textContent = `${currentNum + 1}/${imageLength}`;
  if (!currentNum) {
    prevButton.disabled = true;
  }
};

const changeImage = (list) => {
  list.forEach((image) => {
    if (Number(image.dataset.num) === currentNum) {
      image.classList.add("active");
    } else {
      image.classList.remove("active");
    }
  });
};

init();

const isFirst = () => {
  return currentNum ? (nextButton.disabled = false) : (prevButton.disabled = true);
};

prevButton.addEventListener("click", () => {
  const list = document.querySelectorAll(".listItem");
  currentNum--;
  navigationNum.textContent = `${currentNum + 1}/${imageLength}`;
  changeImage(list); // OPTIMIZE この辺り（89,91行目含む）nextButton部と記述が近いので、改善ができるかもしれない
  isFirst();
});

nextButton.addEventListener("click", () => {
  const list = document.querySelectorAll(".listItem");
  currentNum++;
  navigationNum.textContent = `${currentNum + 1}/${imageLength}`;
  changeImage(list); // OPTIMIZE：prevButtonと同様

  if (currentNum) {
    prevButton.disabled = false;
  }

  if (currentNum === list.length - 1) {
    nextButton.disabled = true;
  }

});
