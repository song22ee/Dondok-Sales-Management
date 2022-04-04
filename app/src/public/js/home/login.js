'use strict';

//login
const id = document.querySelector('#id');
const psword = document.querySelector('#psword');
const loginBtn = document.querySelector('#login');
// const input = document.querySelector('.input');

loginBtn.addEventListener('click', Login);
id.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    // code for enter
    Login();
  }
});
psword.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    // code for enter
    Login();
  }
});

function Login() {
  const req = {
    id: id.value,
    psword: psword.value,
  };
  if (!req.id) {
    alert('아이디를 입력하세요');
  } else if (!req.psword) {
    alert('비밀번호를 입력하세요');
  } else {
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          //로그인 성공 시
          location.href = '/main';
        } else {
          console.log(res.msg);
          alert(res.msg);
        }
      })
      .catch((err) => {
        console.error(new Error('로그인 에러'));
      });
  }
}
