'use strict';

const yearInfo = document.querySelector('#year');
const monthInfo = document.querySelector('#month');
const daysInfo = document.querySelector('#days');
const salesInfo = document.querySelector('#sales');
const cancelBtn = document.querySelector('#cancel');
const update = document.querySelector('#update');

update.addEventListener('click', Sales);
cancelBtn.addEventListener('click', Cancel);

function Sales() {
  const req = {
    year: yearInfo.value,
    month: monthInfo.value,
    days: daysInfo.value,
    sales: salesInfo.value,
  };
  fetch('/login', {
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
