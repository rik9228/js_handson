"use strict";

const tableWrapper = document.getElementById("js-wrapper");
const userTableState = {
  orderState: "BOTH",
  tbody: "",
  sortButton: "",
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
  attachClickEventForSortBtn(datas);
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
  userTableState.sortButton = document.getElementById("js-sortArrow");
};

const attachClickEventForSortBtn = (datas) => {
  userTableState.sortButton.addEventListener("click", (e) => {
    const tableColumnId = e.target.parentNode.id;
    sortTable(datas, tableColumnId);
  });
};

const createTableHeadContents = () => {
  let tableHeadContent = `<thead>`;
  tableHeadContent += `
  <tr>
  <th id="id">
  ID
    <img class="sortArrow" id="js-sortArrow" src="img/both.svg">
  </th>
  <th id="name">名前</th>
  <th id="gender">性別</th>
  <th id="age">年齢</th>
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

const sortTable = (datas, tableColumnId) => {
  let users = [...datas.data];

  switch (userTableState.orderState) {
    case "BOTH":
      userTableState.orderState = "ASC";
      sortAscByColumnValue(users, tableColumnId);
      changeTableView(users, "img/asc.svg");
      break;

    case "ASC":
      userTableState.orderState = "DESC";
      sortDescByColumnValue(users, tableColumnId);
      changeTableView(users, "img/desc.svg");
      break;

    case "DESC":
      userTableState.orderState = "BOTH";
      changeTableView(users, "img/both.svg");
      break;
  }
};

const sortAscByColumnValue = (users, key) => {
  users.sort((a, b) => (a[key] < b[key] ? -1 : 1));
};

const sortDescByColumnValue = (users, key) => {
  users.sort((a, b) => (a[key] > b[key] ? -1 : 1));
};

const changeTableView = (users, imgPath) => {
  userTableState.tbody.innerHTML = createTableBodyContents(users);
  userTableState.sortButton.src = imgPath;
};
