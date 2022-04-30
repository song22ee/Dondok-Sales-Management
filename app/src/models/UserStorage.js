'use strict';

//Connect Databases
const mysqlConnection = require('../config/mysql');
const config = mysqlConnection.config();
const con = mysqlConnection.init(config);
mysqlConnection.open(con);

class UserStorage {
  static GetUsers() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user;';
      con.query(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else resolve(rows);
      });
    });
  }

  static GetUserInfo(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE userid = ?;';
      con.query(sql, [id], (err, rows) => {
        if (err) {
          reject(`${err}`);
        } else resolve(rows[0]);
      });
    });
  }

  static SaveUserInfo(userInfo) {
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO user(userid, username, psword, email) VALUES (?,?,?,?);';
      const userinfo = [
        userInfo.id,
        userInfo.id,
        userInfo.psword,
        userInfo.emailAdress,
      ];
      con.query(sql, userinfo, (err) => {
        if (err) {
          reject(err);
        } else resolve({ success: true });
      });
    });
  }
}

module.exports = UserStorage;
