'use strict';

//Connect Databases
const mysqlConnection = require('../config/mysql');
const config = mysqlConnection.config();
const con = mysqlConnection.init(config);

class SpendingStorage {
  // static GetSpending(userid) {
  //   return new Promise((resolve, reject) => {
  //     const sql = 'SELECT * FROM Spending WHERE userId = ?;';
  //     con.query(sql, [userid], (err, rows) => {
  //       if (err) {
  //         reject(err);
  //       } else resolve(rows);
  //     });
  //   });
  // }

  static GetSpending(userid, year, month) {
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

  static SaveSpendingInfo(
    userid,
    year,
    month,
    rent,
    admincost,
    insurance,
    insurance4,
    expense
  ) {
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO Spending(year, month, rent, admincost, insurance, insurance4, expense, userId) VALUES (?,?,?,?,?,?,?,?);';
      const salesinfo = [
        year,
        month,
        rent,
        admincost,
        insurance,
        insurance4,
        expense,
        userid,
      ];
      con.query(sql, salesinfo, (err) => {
        if (err) {
          reject(err);
        } else resolve({ success: true });
      });
    });
  }

  //수정부분
  static UpdateSpendingInfo(
    userid,
    year,
    month,
    rent,
    admincost,
    insurance,
    insurance4,
    expense
  ) {
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE Spending SET rent = ?, admincost = ?, insurance = ?, insurance4 = ?, expense = ? WHERE userId = ? AND year = ? AND month = ?;';
      const salesinfo = [
        rent,
        admincost,
        insurance,
        insurance4,
        expense,
        userid,
        year,
        month,
      ];
      console.log(
        userid,
        year,
        month,
        rent,
        admincost,
        insurance,
        insurance4,
        expense
      );
      con.query(sql, salesinfo, (err) => {
        if (err) {
          reject(err);
        } else resolve({ success: true });
      });
    });
  }
}

module.exports = SpendingStorage;
