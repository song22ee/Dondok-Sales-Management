'use strict';

//Data
const yearInfo = document.querySelector('#year');
const monthInfo = document.querySelector('#month');
const rentInfo = document.querySelector('#rent');
const admincostInfo = document.querySelector('#admincost');
const insuranceInfo = document.querySelector('#insurance');
const insurance4Info = document.querySelector('#insurance4');
const expenseInfo = document.querySelector('#expense');

//Button
const cancelBtn = document.querySelector('#cancel');
const updateBtn = document.querySelector('#update');
const insertBtn = document.querySelector('#insert');

updateBtn.addEventListener('click', Update);
insertBtn.addEventListener('click', Insert);
cancelBtn.addEventListener('click', Cancel);

function Update() {
  const req = {
    year: yearInfo.value,
    month: monthInfo.value,
    rent: rentInfo.value,
    admincost: admincostInfo.value,
    insurance: insuranceInfo.value,
    insurance4: insurance4Info.value,
    expense: expenseInfo.value,
  };
  fetch('/spending', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = '/table';
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error('오류발생'));
    });
}

function Insert() {
  const req = {
    year: yearInfo.value,
    month: monthInfo.value,
    rent: rentInfo.value,
    admincost: admincostInfo.value,
    insurance: insuranceInfo.value,
    insurance4: insurance4Info.value,
    expense: expenseInfo.value,
  };
  fetch('/spending', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = '/table';
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error('오류발생'));
    });
}

function Cancel() {
  location.href = '/table';
}

//login 버튼 뜨게하고 나머지 뿌옇게 하기

function arrowClick() {
  const arrowDown = document.querySelector('.arrow-down');
  const logout = document.getElementById('logout');

  arrowDown.classList.toggle('arrow_click');

  if (arrowDown.classList.contains('arrow_click')) {
    document.querySelector('.calendar').style.opacity = '0.5';
    logout.style.display = 'block';
  } else {
    document.querySelector('.calendar').style.opacity = '1';
    logout.style.display = 'none';
  }
}
