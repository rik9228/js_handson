"use strict";

const tableWrapper = document.getElementById("js-wrapper");
const userTableState = {
  orderState: "BOTH",
  currentNum: 0,
  tbody: "",
  sortArrow: "",
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

  createTableShow(datas);
  readyClickHandler(datas);
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

  // DOMが生成されて初めて参照が可能になる。
  userTableState.tbody = document.querySelector("tbody");
  userTableState.sortArrow = document.getElementById("js-sortArrow");
};

const readyClickHandler = (datas) => {
  userTableState.sortArrow.addEventListener("click", () => {
    userTableState.currentNum++;
    if (userTableState.currentNum === 3) {
      userTableState.currentNum = 0;
    }
    changeOrderState();
    sortTable(datas);
  });
};

const createTableHeadContents = () => {
  let tableHeadContent = `<thead>`;
  tableHeadContent += `
  <tr>
  <th>
  ID
    <img class="sortArrow" id="js-sortArrow" src="img/both.svg">
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

const changeOrderState = () => {
  switch (userTableState.currentNum) {
    case 0:
      userTableState.orderState = "BOTH";
      break;
    case 1:
      userTableState.orderState = "ASC";
      break;
    case 2:
      userTableState.orderState = "DESC";
      break;
  }
};

const sortTable = (datas) => {
  let users = [...datas.data];

  switch (userTableState.orderState) {
    case "BOTH":
      users = [...datas.data];
      changeTableView(users, "img/both.svg");
      break;

    case "ASC":
      users.sort(function (a, b) {
        return a.id - b.id;
      });
      changeTableView(users, "img/asc.svg");
      break;

    case "DESC":
      users.sort(function (a, b) {
        return b.id - a.id;
      });
      changeTableView(users, "img/desc.svg");
      break;
  }
};

const changeTableView = (users, imgPath) => {
  userTableState.tbody.innerHTML = createTableBodyContents(users);
  userTableState.sortArrow.src = imgPath;
};
