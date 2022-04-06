'use strict';

//Connect Databases
const mysqlConnection = require('../config/mysql');
const config = mysqlConnection.config();
const con = mysqlConnection.init(config);

class SalesStorage {
  static SaveSalesInfo(salesInfo, userId) {
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO Sales(year, month, days, sales, userId) VALUES (?,?,?,?,?);';
      const salesinfo = [
        salesInfo.sales_Years,
        salesInfo.sales_Month,
        salesInfo.sales_Days,
        salesInfo.sales,
        userId,
      ];
      con.query(sql, salesinfo, (err) => {
        if (err) {
          reject(err);
        } else resolve({ success: true });
      });
    });
  }
}

module.exports = SalesStorage;
