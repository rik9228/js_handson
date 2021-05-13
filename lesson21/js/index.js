"use strict";

const tableWrapper = document.getElementById("js-wrapper");
const userTableData = {
  orderState: "BOTH",
  currentNum: 0,
  tbody: "",
  sortArrow: "",
};

let { orderState, currentNum, tbody, sortArrow } = userTableData;

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
    currentNum++;
    if (currentNum === 3) {
      currentNum = 0;
    }
    changeOrderState();
    sortDataById(datas);
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

const changeOrderState = () => {
  switch (currentNum) {
    case 0:
      orderState = "BOTH";
      break;
    case 1:
      orderState = "ASC";
      break;
    case 2:
      orderState = "DESC";
      break;
  }
};

const sortDataById = (datas) => {
  let users = [...datas.data];
  tbody = document.querySelector("tbody");
  sortArrow = document.getElementById("js-buttonImage");

  switch (orderState) {
    case "BOTH":
      users = [...datas.data];
      changeTableBody(users, "img/both.svg");
      break;

    case "ASC":
      users.sort(function (a, b) {
        return a.id - b.id;
      });
      changeTableBody(users, "img/asc.svg");
      break;

    case "DESC":
      users.sort(function (a, b) {
        return b.id - a.id;
      });
      changeTableBody(users, "img/desc.svg");
      break;
  }
};

const changeTableBody = (users, imgPath) => {
  tbody.innerHTML = createTableBodyContents(users);
  sortArrow.setAttribute("src", imgPath);
};
