"use strict";

const resourceUrl = "https://jsondata.okiba.me/v1/json/Zg8J6210418234428";
const newsBlock = document.querySelector(".news");
const tabs = document.querySelector(".news__listFrame");
const fragment = document.createDocumentFragment();
let primaryElement;
let lists;
let primaryImageWrapper;

const initCreateDOM = () => {
  primaryElement = document.createElement("div");
  primaryElement.classList.add("news__wrapper");
  lists = document.createElement("ul");
  lists.classList.add("news__listFrame--second");
  primaryImageWrapper = document.createElement("div");
  primaryImageWrapper.classList.add("news__partition");
  primaryElement.appendChild(lists);
  primaryElement.appendChild(primaryImageWrapper);
  newsBlock.appendChild(primaryElement);
};

const createTabsView = (content, index) => {
  const tab = document.createElement("li");

  if (index === 0) {
    tab.classList.add("active");
  }

  tab.classList.add("news__listItem");
  tab.dataset.id = content.id;
  tab.textContent = content.category;
  tabs.appendChild(tab);

  tab.addEventListener("click", () => {
    while (lists.firstChild) {
      lists.removeChild(lists.firstChild);
    }

    const tabsChildren = tabs.children;
    for (let i = 0; i < tabsChildren.length; i++) {
      tabsChildren[i].classList.remove("active");
    }

    tab.classList.add("active");

    if (content.id === Number(tab.dataset.id)) {
      createArticleView(content);
      createImageView(content);
    }
  });
};

const createImageView = (content) => {
  while (primaryImageWrapper.firstChild) {
    primaryImageWrapper.removeChild(primaryImageWrapper.firstChild);
  }

  const primaryImage = document.createElement("img");
  primaryImage.setAttribute("src", content.src);
  primaryImage.classList.add("news__image");
  primaryImageWrapper.appendChild(primaryImage);
};

const createLiContent = (article) => {
  const li = document.createElement("li");
  li.classList.add("news__listItem--second");
  const a = document.createElement("a");
  li.appendChild(a);
  a.textContent = article.title;
  a.setAttribute("href", article.href);
  return li;
};

const addNewForLi = (li) => {
  const newIcon = document.createElement("span");
  newIcon.classList.add("news__label");
  newIcon.textContent = "NEW";
  li.appendChild(newIcon);
};

const addCommentForLi = (article, li) => {
  const comment = document.createElement("span");
  comment.classList.add("news__comment");
  const commentIcon = document.createElement("img");
  commentIcon.classList.add("news__icon");
  commentIcon.setAttribute("src", "img/comment_icon.svg");
  comment.appendChild(commentIcon);
  comment.insertAdjacentHTML("beforeend", article.commentCount);
  li.appendChild(comment);
};

const createArticleView = (content) => {
  content.articles.forEach((article) => {
    const li = createLiContent(article);

    if (article.isNew) {
      addNewForLi(li);
    }

    if (article.commentCount) {
      addCommentForLi(article, li);
    }

    fragment.appendChild(li);
  });
  lists.appendChild(fragment);
};

const createContentView = (datas) => {
  const contents = datas.data;
  contents.forEach((content, index) => {
    createTabsView(content, index);
    if (content.isOpen) {
      createArticleView(content);
      createImageView(content);
    }
  });
};

const request = async () => {
  const resource = await fetch(resourceUrl);
  let json = await resource.json();
  return json;
};

const fetchData = async () => {
  let res;
  try {
    res = await request();
  } catch (error) {
    res = [];
  } finally {
    return res;
  }
};

const init = async () => {
  initCreateDOM();
  const datas = await fetchData();
  if (datas.length === 0) {
    lists.textContent = "コンテンツがありません";
    return;
  }
  createContentView(datas);
};

init();
