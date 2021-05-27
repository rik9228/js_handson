"use strict";

const tableWrapper = document.getElementById("js-wrapper");
const userTableState = {
  orderState: {
    id: "BOTH",
    age: "BOTH",
  },
  tbody: "",
  sortButtons: "",
};

const arrowImageSources = {
  BOTH: "img/both.svg",
  ASC: "img/asc.svg",
  DESC: "img/desc.svg",
};

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

  createTable(datas);

  const tbody = document.querySelector("tbody");
  const sortButtons = document.querySelectorAll(".sortArrow");
  attachClickEventForSortBtn(datas, sortButtons, tbody);
};

init();

const createTable = (datas) => {
  let savedTableParts = "";
  const users = [...datas.data];
  const table = document.createElement("table");

  savedTableParts += createTableHeadContents();
  savedTableParts += createTableBodyContents(users);
  table.innerHTML = savedTableParts;

  tableWrapper.appendChild(table);
};

const attachClickEventForSortBtn = (datas, sortButtons, tbody) => {
  sortButtons.forEach((sortButton) => {
    sortButton.addEventListener("click", () => {
      const tableColumnId = sortButton.parentNode.id;
      sortTable(datas, tableColumnId, sortButtons, tbody);
    });
  });
};

const createTableHeadContents = () => {
  let tableHeadContent = `<thead>`;
  tableHeadContent += `
  <tr>
  <th id="id">ID
    <img class="sortArrow" src="img/both.svg">
  </th>
  <th id="name">名前</th>
  <th id="gender">性別</th>
  <th id="age">年齢
    <img class="sortArrow" src="img/both.svg">
  </th>
  </tr>`;
  return (tableHeadContent += `</thead>`);
};

const createTableBodyContents = (users) => {
  let tableBodyContent = `<tbody>`;
  users.forEach((user) => {
    tableBodyContent += `
    <tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.gender}</td>
    <td>${user.age}</td>
    </tr>
    `;
  });
  return (tableBodyContent += `</tbody>`);
};

const sortTable = (datas, key, sortButtons, tbody) => {
  let users = [...datas.data];
  switch (userTableState.orderState[key]) {
    case "BOTH":
      changeTableHeaderShow("ASC", key, sortButtons);
      sortAscByColumnValue(users, key);
      break;

    case "ASC":
      changeTableHeaderShow("DESC", key, sortButtons);
      sortDescByColumnValue(users, key);
      break;

    case "DESC":
      changeTableHeaderShow("BOTH", key, sortButtons);
      break;

    default:
      break;
  }
  changeTableBodyShow(users, tbody);
};

const sortAscByColumnValue = (users, key) => {
  users.sort((a, b) => (a[key] < b[key] ? -1 : 1));
};

const sortDescByColumnValue = (users, key) => {
  users.sort((a, b) => (a[key] > b[key] ? -1 : 1));
};

const changeTableHeaderShow = (sortType, key, sortButtons) => {
  resetState(); // 状態の初期化処理
  sortButtons.forEach((sortButton) => {
    sortButton.src = arrowImageSources["BOTH"]; // ボタン画像の初期化処理
    if (sortButton.parentNode.id === key) {
      userTableState.orderState[key] = sortType;
      sortButton.src = arrowImageSources[sortType];
    }
  });
};

const changeTableBodyShow = (users, tbody) => {
  tbody.innerHTML = createTableBodyContents(users);
};

// userTableState にある orderState を全て'BOTH'にする関数
const resetState = () => {
  for (let state in userTableState.orderState) {
    userTableState.orderState[state] = "BOTH";
  }
};
