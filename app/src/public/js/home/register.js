'use strict';

//sign up
const signupId = document.querySelector('#signupId');
const signupPsword = document.querySelector('#signupPsword');
const confirmPsword = document.querySelector('#confirm-psword');
const emailAdress = document.querySelector('#email');
const signupBtn = document.querySelector('#signup');

signupBtn.addEventListener('click', Register);

function Register() {
  const req = {
    id: signupId.value,
    psword: signupPsword.value,
    confirmPsword: confirmPsword.value,
    emailAdress: emailAdress.value,
  };

  if (!req.id && !req.psword && !req.confirmPsword && !req.emailAdress) {
    signupBtn.value = '빈칸을 입력바랍니다.';
  } else {
    fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          //회원가입 성공 시
          alert(res.msg); //성공메시지
          location.href = '/login';
        } else {
          alert(res.msg);
          // console.log(res.msg);
        }
      })
      .catch((err) => {
        console.error(new Error('로그인 에러'));
      });
  }
}
