"use strict";

const tableWrapper = document.getElementById("js-wrapper");
const initialOrderState = {
  id: "BOTH",
  age: "BOTH",
};

const userTableState = {
  orderState: initialOrderState,
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
      const nextOrder = changeTableStateToNext(userTableState.orderState[tableColumnId]);

      changeTableHeaderShow(nextOrder, tableColumnId, sortButtons);
      sortTable(datas, tableColumnId);
      changeTableBodyShow(sortTable(datas, tableColumnId), tbody);
    });
  });
};

const createTableHeadContents = () => {
  return `
  <thead>
  <tr>
  <th id="id">ID
    <img class="sortArrow" src="img/both.svg">
  </th>
  <th id="name">名前</th>
  <th id="gender">性別</th>
  <th id="age">年齢
    <img class="sortArrow" src="img/both.svg">
  </th>
  </tr>
  </thead>
  `;
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

const changeTableStateToNext = (currentTableState) => {
  switch (currentTableState) {
    case "BOTH":
      currentTableState = "ASC";
      break;
    case "ASC":
      currentTableState = "DESC";
      break;
    case "DESC":
      currentTableState = "BOTH";
      break;

    default:
      break;
  }
  return currentTableState;
};

const sortTable = (datas, key) => {
  let users = [...datas.data];
  switch (userTableState.orderState[key]) {
    case "BOTH":
      return users;

    case "ASC":
      return sortAscByColumnValue(users, key);

    case "DESC":
      return sortDescByColumnValue(users, key);

    default:
      break;
  }
};

const sortAscByColumnValue = (users, key) => {
  return users.sort((a, b) => (a[key] < b[key] ? -1 : 1));
};

const sortDescByColumnValue = (users, key) => {
  return users.sort((a, b) => (a[key] > b[key] ? -1 : 1));
};

const changeTableHeaderShow = (sortType, key, sortButtons) => {
  resetState();
  sortButtons.forEach((sortButton) => {
    sortButton.src = arrowImageSources["BOTH"];
    if (sortButton.parentNode.id === key) {
      userTableState.orderState[key] = sortType;
      sortButton.src = arrowImageSources[sortType];
    }
  });
};

const changeTableBodyShow = (users, tbody) => {
  tbody.innerHTML = createTableBodyContents(users);
};

const resetState = () => {
  return (userTableState.orderState = initialOrderState);
};
