"use strict";

const tableWrapper = document.getElementById("js-wrapper");
let currentNum = 0;

const request = async () => {
  const resourceUrl = "https://jsondata.okiba.me/v1/json/t2T2M210511130923";
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
  const datas = await fetchData();
  if (datas.length === 0) {
    tableWrapper.textContent = "コンテンツがありません";
    return;
  }

  createTableShow(datas);

  const sortButton = document.getElementById("js-sortButton");
  sortButton.addEventListener("click", () => {
    sortId(datas);
  });
};

init();

const createTableShow = (datas) => {
  let savedTableParts = "";
  const users = [...datas.data];
  const table = document.createElement("table");

  savedTableParts += createTableHeadContents();
  savedTableParts += createTableBodyContents(users);
  table.innerHTML = savedTableParts;

  tableWrapper.appendChild(table);
};

const createTableHeadContents = () => {
  let tableHeadContent = `<thead>`;
  tableHeadContent += `
  <tr>
  <th>
  ID
  <span class="sortButton" id="js-sortButton">
  <img id="js-buttonImage" src="img/both.svg">
  </span>
  </th>
  <th>名前</th>
  <th>性別</th>
  <th>年齢</th>
  </tr>
  `;
  return (tableHeadContent += `</thead>`);
};

const createTableBodyContents = (users) => {
  let tableBodyContent = `<tbody>`;
  users.forEach((user) => {
    tableBodyContent += `
    <tr>
    <th>${user.id}</th>
    <th>${user.name}</th>
    <th>${user.gender}</th>
    <th>${user.age}</th>
    </tr>
    `;
  });
  return (tableBodyContent += `</tbody>`);
};

const sortId = (datas) => {
  let users = [...datas.data];
  const tbody = document.querySelector("tbody");
  const sortButtonImage = document.getElementById("js-buttonImage");

  currentNum++;
  if (currentNum === 3) {
    currentNum = 0;
  }

  switch (currentNum) {
    case 0:
      users = [...datas.data];
      tbody.innerHTML = createTableBodyContents(users);
      sortButtonImage.setAttribute("src", "img/both.svg");
      break;

    case 1:
      users.sort(function (a, b) {
        return a.id - b.id;
      });
      tbody.innerHTML = createTableBodyContents(users);
      sortButtonImage.setAttribute("src", "img/asc.svg");
      break;

    case 2:
      users.sort(function (a, b) {
        return b.id - a.id;
      });
      tbody.innerHTML = createTableBodyContents(users);
      sortButtonImage.setAttribute("src", "img/desc.svg");
      break;
  }
};
