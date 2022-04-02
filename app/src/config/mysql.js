'use strict';

const mysql = require('mysql');
const logger = require('./logger');

const mysqlConnection = {
  config: function () {
    return {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    };
  },
  init: function (config) {
    return mysql.createConnection(config);
  },
  open: function (con) {
    con.connect((err) => {
      if (err) {
        logger.error('MySQL 연결 실패 : ', err);
      } else {
        logger.info('MySQL Connected ...');
      }
    });
  },
  close: function (con) {
    con.end((err) => {
      if (err) {
        logger.error('MySQL 종료 실패 : ', err);
      } else {
        logger.info('MySQL Terminated ...');
      }
    });
  },
};

module.exports = mysqlConnection;
