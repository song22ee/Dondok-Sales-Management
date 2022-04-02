'use strict';

const id = document.querySelector('#id');
const eamilAdress = document.querySelector('#email');
const finderBtn = document.querySelector('#finder');

finderBtn.addEventListener('click', finder);

function finder() {
  const req = {
    id: id.value,
    eamilAdress: eamilAdress.value,
  };

  fetch('/finder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        //회원가입 성공 시
        alert(res.msg);
        location.href = '/login';
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error('로그인 에러'));
    });
}
