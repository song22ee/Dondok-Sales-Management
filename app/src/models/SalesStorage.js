'use strict';

//Connect Databases
const mysqlConnection = require('../config/mysql');
const config = mysqlConnection.config();
const con = mysqlConnection.init(config);

class SalesStorage {
  static GetSales(userid) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Sales WHERE userId = ?;';
      con.query(sql, [userid], (err, rows) => {
        if (err) {
          reject(err);
        } else resolve(rows);
      });
    });
  }

  static GetSalesMonth(salesDay, userid) {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT * FROM Sales WHERE userId = ? AND year = ? AND month = ?;';
      con.query(sql, [userid, salesDay.year, salesDay.month], (err, rows) => {
        if (err) {
          reject(`${err}`);
        } else resolve(rows);
      });
    });
  }

  static GetSalesDay(salesDay, userid) {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT * FROM Sales WHERE userId = ? AND year = ? AND month = ? AND days = ?;';
      con.query(
        sql,
        [userid, salesDay.year, salesDay.month, salesDay.day],
        (err, rows) => {
          if (err) {
            reject(`${err}`);
          } else resolve(rows);
        }
      );
    });
  }

  static SaveSalesInfo(salesInfo, userid) {
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO Sales(year, month, days, sales, userId) VALUES (?,?,?,?,?);';
      const salesinfo = [
        salesInfo.sales_Years,
        salesInfo.sales_Month,
        salesInfo.sales_Days,
        salesInfo.sales,
        userid,
      ];
      con.query(sql, salesinfo, (err) => {
        if (err) {
          reject(err);
        } else resolve({ success: true });
      });
    });
  }

  static UpdateSalesInfo(salesInfo, userid) {
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE Sales SET sales = ? WHERE userId = ? AND year = ? AND month = ? AND days = ?;';
      const salesinfo = [
        salesInfo.sales,
        userid,
        salesInfo.year,
        salesInfo.month,
        salesInfo.days,
      ];
      con.query(sql, salesinfo, (err, rows) => {
        if (err) {
          reject(err);
        } else resolve({ success: true });
      });
    });
  }
}

module.exports = SalesStorage;
