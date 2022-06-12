'use strict';

//Connect Databases
const mysqlConnection = require('../config/mysql');
const config = mysqlConnection.config();
const con = mysqlConnection.init(config);

class SpendingStorage {
  static GetSpending(userid) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Spending WHERE userId = ?;';
      con.query(sql, [userid], (err, rows) => {
        if (err) {
          reject(err);
        } else resolve(rows);
      });
    });
  }

  static GetSpendingMonth(userid, year, month) {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT * FROM Spending WHERE userId = ? AND year = ? AND month = ?;';
      con.query(sql, [userid, year, month], (err, rows) => {
        if (err) {
          reject(`${err}`);
        } else resolve(rows);
      });
    });
  }

  static GetSpendingDay(userid, year, month, day) {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT * FROM Spending WHERE userId = ? AND year = ? AND month = ? AND days = ?;';
      con.query(sql, [userid, year, month, day], (err, rows) => {
        if (err) {
          reject(`${err}`);
        } else resolve(rows);
      });
    });
  }

  static SaveSpendingInfo(userid, year, month, day, sales) {
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO Spending(year, month, days, meat, foodIngredients, alcohol, beverage, etc, userId) VALUES (?,?,?,?,?);';
      const salesinfo = [year, month, day, sales, userid];
      con.query(sql, salesinfo, (err) => {
        if (err) {
          reject(err);
        } else resolve({ success: true });
      });
    });
  }

  //수정부분
  static UpdateSpendingInfo(userid, salesInfo) {
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE Spending SET sales = ? WHERE userId = ? AND year = ? AND month = ? AND days = ?;';
      const salesinfo = [
        salesInfo.sales,
        userid,
        salesInfo.year,
        salesInfo.month,
        salesInfo.days,
      ];
      con.query(sql, salesinfo, (err) => {
        if (err) {
          reject(err);
        } else resolve({ success: true });
      });
    });
  }
}

module.exports = SpendingStorage;
