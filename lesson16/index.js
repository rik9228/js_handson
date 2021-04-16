"use strict";

const resourceUrl = "https://jsondata.okiba.me/v1/json/9fdan210415150908";
const newsBlock = document.querySelector(".news");
const tabs = document.querySelector(".news__listFrame");
const fragment = document.createDocumentFragment();
const fragmentSecond = document.createDocumentFragment();

// DOMの初期化処理（グローバルに参照できるようにするため、関数化しない）
const primaryElement = document.createElement("div");
primaryElement.classList.add("news__wrapper");
const lists = document.createElement("ul");
lists.classList.add("news__listFrame--second");
const primaryImageWrapper = document.createElement("div");
primaryImageWrapper.classList.add("news__partition");
primaryElement.appendChild(lists);
primaryElement.appendChild(primaryImageWrapper);
newsBlock.appendChild(primaryElement);
// 初期化処理ここまで

const createTabsView = (content) => {
  const tab = document.createElement("li");

  // newsタブにはデフォルトでcurrentクラスの付与
  if (content.id === "news") {
    tab.classList.add("news__listItem", "js-current");
  }

  tab.classList.add("news__listItem");
  tab.textContent = content.category_ja;
  fragment.appendChild(tab);
  tabs.appendChild(fragment);

  tab.addEventListener("click", () => {
    while (lists.firstChild) {
      lists.removeChild(lists.firstChild);
    }

    const tabChild = tabs.children;
    for (let i = 0; i < tabChild.length; i++) {
      tabChild[i].classList.remove("js-current");
    }

    tab.classList.add("js-current");

    if (content.category_ja === tab.textContent) {
      createArticleView(content);
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

const createArticleView = (content) => {
  content.articles.forEach((article) => {
    const li = document.createElement("li");
    li.classList.add("news__listItem--second");
    const a = document.createElement("a");
    li.appendChild(a);
    a.textContent = article.title;
    a.setAttribute("href", article.href);

    if (article.isNew) {
      const newIcon = document.createElement("span");
      newIcon.classList.add("news__label");
      newIcon.textContent = "NEW";
      li.appendChild(newIcon);
    }

    if (article.commentCount) {
      const comment = document.createElement("span");
      comment.classList.add("news__comment");
      const commentIcon = document.createElement("img");
      commentIcon.classList.add("news__icon");
      commentIcon.setAttribute("src", "img/comment_icon.svg");
      comment.appendChild(commentIcon);
      comment.insertAdjacentHTML("beforeend", article.commentCount);
      li.appendChild(comment);
    }
    fragmentSecond.appendChild(li);
  });

  createImageView(content);
  lists.appendChild(fragmentSecond);
};

const createContentView = (datas) => {
  // リクエストエラーで空の配列が渡ってきた時
  if (datas.length === 0) {
    return;
  }
  
  const contents = datas.data;
  contents.forEach((content) => {
    createTabsView(content);
    if (content.isOpen) {
      createArticleView(content);
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
    lists.textContent = "ただいまサーバー側で通信がぶっ壊れています";
  } finally {
    return res;
  }
};

const init = async () => {
  const datas = await fetchData();
  createContentView(datas);
};

init();
