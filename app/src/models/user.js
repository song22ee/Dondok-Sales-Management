'use strict';
const Userstorage = require('./UserStorage');

class user {
  constructor(body, session) {
    this.body = body;
    this.session = session;
  }

  async login() {
    const body = this.body;
    const session = this.session;
    const response = {};
    try {
      const user = await Userstorage.GetUserInfo(body.id);
      console.log(user);
      if (user) {
        if (user.userid) {
          if (user.userid === body.id) {
            if (user.psword === body.psword) {
              session.userId = user.id;
              session.userName = user.username;
              session.is_logined = true;
              response.success = true;
              // response.data = user;
              return response;
            }
            response.success = false;
            response.msg = '비밀번호가 틀립니다.';
            return response;
          }
        }
      }
      response.success = false;
      response.msg = '아이디를 확인해주세요.';
      return response;
    } catch (err) {
      response.success = false;
      response.msg = '로그인 오류';
      response.err = err;
      return response;
    }
  }

  async register() {
    const body = this.body;
    const response = {};
    if (body.psword === body.confirmPsword) {
      try {
        await Userstorage.SaveUserInfo(body);
        response.success = true;
        response.msg = '회원가입 성공';
        return response;
      } catch (err) {
        if (err.errno === 1062) {
          response.success = false;
          response.msg = '아이디가 이미 존재합니다.';
          response.err = err;
        }
        return response;
      }
    }
    response.success = false;
    response.msg = '2차 비밀번호를 확인하십시오.';
    return response;
  }

  async finder() {
    const body = this.body;
    const response = {};
    const user = await Userstorage.GetUserInfo(body.id);
    if (user) {
      if (user.userid === body.id && user.email === body.emailAdress) {
        response.success = true;
        response.msg = `비밀번호는 ${user.psword}입니다.`;
        return response;
      }
      response.success = false;
      response.msg = '이메일을 확인해 주세요.';
      return response;
    }
    response.success = false;
    response.msg = '아이디를 확인해 주세요.';
    return response;
  }
}

module.exports = user;
