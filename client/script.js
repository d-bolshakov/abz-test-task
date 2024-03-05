async function getUsersList(url) {
  try {
    const res = await fetch(url);
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    alert(error.message);
  }
}

function updateUsersTable(data) {
  const tableBody = document.getElementById('users-table-body');
  tableBody.innerHTML = data.users
    .map(
      (user) => `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.position}</td>
        <td><img src="${user.photo}"/></td>
    </tr>`,
    )
    .join('');
  updatePagination({
    links: data.links,
    page: data.page,
    total_pages: data.total_pages,
  });
}

async function getPositionsList() {
  try {
    const res = await fetch('/api/v1/positions');
    const resJson = await res.json();
    return resJson.positions;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

function populatePositionSelect(positionsList) {
  const positionSelect = document.getElementById('position-select');
  positionSelect.innerHTML = positionsList
    .map((position) => `<option value=${position.id}>${position.name}</option>`)
    .join('');
}

function onClickAddUserModalOpen() {
  getPositionsList().then((positions) => populatePositionSelect(positions));
}

function getAddUserFormData() {
  const formData = new FormData();
  const name = document.getElementById('name-input').value;
  formData.append('name', name);
  const email = document.getElementById('email-input').value;
  formData.append('email', email);
  const phone = document.getElementById('phone-input').value;
  formData.append('phone', phone);
  const position_id = document.getElementById('position-select').value;
  formData.append('position_id', position_id);
  const photo = document.getElementById('photo-input').files[0];
  formData.append('photo', photo);
  return formData;
}

async function onClickAddUserSubmit() {
  try {
    const data = getAddUserFormData();
    const res = await fetch('/api/v1/users', {
      body: data,
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    const resJson = await res.json();
    alert(resJson.message);
    if (res.status === 201) init();
  } catch (error) {
    console.error(error.message);
  }
}

function updateTokenLabel() {
  const tokenLabel = document.getElementById('token-label');
  tokenLabel.textContent = localStorage.getItem('token');
}

async function onClickGetToken() {
  try {
    const res = await fetch('/api/v1/tokens/');
    const resJson = await res.json();
    localStorage.setItem('token', resJson.token);
    updateTokenLabel();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

function updatePagination(data) {
  const prevLi = document.getElementById('pagination-prev');
  const prevSpan = document.getElementById('pagination-prev-span');
  if (data.links.prev_url) {
    prevLi.classList.remove('disabled');
    prevSpan.onclick = () =>
      getUsersList(data.links.prev_url).then((data) => updateUsersTable(data));
  } else {
    prevLi.classList.add('disabled');
  }
  const nextLi = document.getElementById('pagination-next');
  const nextSpan = document.getElementById('pagination-next-span');
  if (data.links.next_url) {
    nextLi.classList.remove('disabled');
    nextSpan.onclick = () =>
      getUsersList(data.links.next_url).then((data) => updateUsersTable(data));
  } else {
    nextLi.classList.add('disabled');
  }

  const pagination = document.getElementById('pagination');
  const paginationNodes = [prevLi, nextLi];
  for (let i = 1; i <= data.total_pages; i++) {
    const pageNode = document.createElement('li');
    pageNode.className = i === data.page ? 'page-item active' : 'page-item';
    pageNode.innerHTML =
      i === data.page
        ? `<span class="page-link">${i}</span>`
        : `<span class="page-link" onclick="getUsersList('/api/v1/users/?page=${i}').then((data) => updateUsersTable(data))">${i}</span>`;
    paginationNodes.splice(i, 0, pageNode);
  }
  pagination.replaceChildren(...paginationNodes);
}

async function init() {
  const users = await getUsersList('/api/v1/users');
  updateUsersTable(users);
}

init();
