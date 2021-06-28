"use strict";

{
  const logoutButton = document.getElementById("js-logout");

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    location.href = "index.html";
  });

  window.addEventListener("storage", () => {
    if (!localStorage.getItem("token")) {
      location.href = "index.html";
    }
  });

  const resourceUrl = "https://jsondata.okiba.me/v1/json/C58qe210426143842";
  const slideAndListWrapper = document.getElementById("js-wrapper");
  const slideList = document.getElementById("js-slideList");
  const prevButton = document.getElementById("js-prev");
  const nextButton = document.getElementById("js-next");
  const navNum = document.getElementById("js-navNum");
  const navDots = document.getElementById("js-navDots");
  let fragmentSlide = document.createDocumentFragment();
  let fragmentNavDots = document.createDocumentFragment();
  let timeOutId = null;

  const slides = {
    list: null,
    currentNum: 0,
    updateCurrentNumberOne(number) {
      this.currentNum = this.currentNum + number;
      if (this.currentNum === this.list.length) {
        this.currentNum = 0;
      } else if (this.currentNum === -1) {
        this.currentNum = this.list.length - 1;
      }
    },
    updateCurrentNumberDirectly(index) {
      this.currentNum = index;
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
    createImagesShow(datas);
    autoPlay();
  };

  init();

  const createImages = (image, index) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.classList.add("image");
    img.setAttribute("src", image.src);
    img.setAttribute("alt", image.alt);
    li.classList.add("listItem");
    li.dataset.index = index;
    li.appendChild(img);

    if (index === 0) {
      li.classList.add("active");
    }

    slideAndListWrapper.classList.add("show");
    fragmentSlide.appendChild(li);
  };

  const autoPlay = () => {
    timeOutId = setTimeout(() => {
      const beforeNum = slides.currentNum;
      slides.updateCurrentNumberOne(1);
      changeImage(beforeNum, slides, navDots);
      autoPlay();
    }, 3000);
  };

  const createSlideDots = (slide, index) => {
    const li = document.createElement("li");
    li.classList.add("nav__dot");

    if (slides.currentNum === index && slide.classList.contains("active")) {
      li.classList.add("current");
    }
    fragmentNavDots.appendChild(li);

    li.addEventListener("click", () => {
      const beforeNum = slides.currentNum;
      slides.updateCurrentNumberDirectly(index);
      changeImage(beforeNum, slides, navDots);
      clearTimeout(timeOutId);
      autoPlay();
    });
  };

  const createImagesShow = (datas) => {
    const images = datas.data;
    images.forEach(createImages);
    slideList.appendChild(fragmentSlide);
    slides.list = document.querySelectorAll(".listItem");

    slides.list.forEach(createSlideDots);
    navDots.appendChild(fragmentNavDots);

    if (slides.currentNum === 0) {
      prevButton.disabled = true;
    }

    navNum.textContent = `${slides.currentNum + 1}/${slides.list.length}`;
  };

  const changeStateArrows = (currentNum) => {
    if (currentNum === slides.list.length - 1) {
      nextButton.disabled = true;
    } else if (currentNum === 0) {
      prevButton.disabled = true;
      nextButton.disabled = false;
    } else {
      nextButton.disabled = false;
      prevButton.disabled = false;
    }
  };

  const changeImage = (beforeNum, slides, navDots) => {
    const {
      list,
      list: { length },
      currentNum,
    } = slides;
    navNum.textContent = `${currentNum + 1}/${length}`;
    list[beforeNum].classList.remove("active");
    list[currentNum].classList.add("active");

    navDots.children[beforeNum].classList.remove("current");
    navDots.children[currentNum].classList.add("current");

    changeStateArrows(currentNum);
  };

  prevButton.addEventListener("click", () => {
    const beforeNum = slides.currentNum;
    slides.updateCurrentNumberOne(-1);
    changeImage(beforeNum, slides, navDots);
    clearTimeout(timeOutId);
    autoPlay();
  });

  nextButton.addEventListener("click", () => {
    const beforeNum = slides.currentNum;
    slides.updateCurrentNumberOne(1);
    changeImage(beforeNum, slides, navDots);
    clearTimeout(timeOutId);
    autoPlay();
  });
}
