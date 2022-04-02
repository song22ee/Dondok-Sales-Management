'use strict';

//Connect Databases
const mysqlConnection = require('../config/mysql');
const config = mysqlConnection.config();
const con = mysqlConnection.init(config);
mysqlConnection.open(con);

class UserStorage {
  // static #GetUsers(isAll, data, fields) {
  //   const users = JSON.parse(data);
  //   if (isAll) return users;
  //   const newUsers = fields.reduce((newusers, field) => {
  //     if (users.hasOwnProperty(field)) {
  //       newusers[field] = users[field];
  //       //newUsers배열의 fields 키 value에는 users배열중 field와 동일명의 키 value 값이 들어간다.
  //     }
  //     return newusers;
  //   }, {});
  //   return newUsers;
  // }

  static GetUsers() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user;';
      con.query(sql, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  static GetUserInfo(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE id = ?;';
      con.query(sql, [id], (err, rows) => {
        if (err) {
          reject(`${err}`);
        }
        resolve(rows[0]);
      });
    });
  }

  static SaveUserInfo(userInfo) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO user VALUES (?,?,?);';
      const userinfo = [userInfo.id, userInfo.psword, userInfo.emailAdress];
      con.query(sql, userinfo, (err, rows) => {
        if (err) {
          reject(err.errno);
        }
        resolve({ success: true });
      });
    });
  }
}

module.exports = UserStorage;
