"use strict";

{
  const resourceUrl = "https://jsondata.okiba.me/v1/json/Zg8J6210418234428";
  const newsBlock = document.getElementById("js-news");
  const tabs = document.getElementById("js-tabs");
  const fragment = document.createDocumentFragment();
  let articleLists;
  let imageWrapper;

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
      articleLists.textContent = "コンテンツがありません";
      return;
    }
    createContentView(datas);
  };

  const initCreateDOM = () => {
    const primaryElement = document.createElement("div");
    primaryElement.classList.add("news__wrapper");
    articleLists = document.createElement("ul");
    articleLists.classList.add("news__listFrame--second");
    imageWrapper = document.createElement("div");
    imageWrapper.classList.add("news__partition");
    primaryElement.appendChild(articleLists);
    primaryElement.appendChild(imageWrapper);
    newsBlock.appendChild(primaryElement);
  };

  init();

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

  const createTabsView = (content, index) => {
    const tab = document.createElement("li");

    if (index === 0) {
      tab.classList.add("selected");
    }

    tab.classList.add("news__listItem");
    tab.dataset.id = content.id;
    tab.textContent = content.category;
    tabs.appendChild(tab);

    tab.addEventListener("click", () => {
      while (articleLists.firstChild) {
        articleLists.removeChild(articleLists.firstChild);
      }

      const tabsChildren = tabs.children;
      for (let i = 0; i < tabsChildren.length; i++) {
        tabsChildren[i].classList.remove("selected");
      }

      tab.classList.add("selected");

      if (content.id === parseInt(tab.dataset.id)) {
        createArticleView(content);
        createImageView(content);
      }
    });
  };

  const createArticleView = (content) => {
    content.articles.forEach((article) => {
      const li = createLiContent(article);

      if (article.isNew) {
        addNewIconForLi(li);
      }

      if (article.commentCount) {
        addCommentForLi(article, li);
      }

      fragment.appendChild(li);
    });
    articleLists.appendChild(fragment);
  };

  const createImageView = (content) => {
    while (imageWrapper.firstChild) {
      imageWrapper.removeChild(imageWrapper.firstChild);
    }

    const topicImage = document.createElement("img");
    topicImage.setAttribute("src", content.src);
    topicImage.classList.add("news__image");
    imageWrapper.appendChild(topicImage);
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

  const addNewIconForLi = (li) => {
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
}
