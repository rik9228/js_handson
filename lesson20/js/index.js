"use strict";

const tableWrapper = document.getElementById("js-wrapper");

const request = async () => {
  const resourceUrl = "https://jsondata.okiba.me/v1/json/jXk4S210511010142";
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
};

init();

const createTableShow = (datas) => {
  const users = [...datas.data];
  let savedTableParts = "";
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
  <th>ID</th>
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
