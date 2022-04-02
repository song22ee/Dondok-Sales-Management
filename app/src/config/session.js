'use strict';

const mysqlConnection = require('./mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

//mysql
const mysqlConfig = mysqlConnection.config();

//SessionStore setting
const sessionStore = new MySQLStore(mysqlConfig);

const sessionModule = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
});

module.exports = sessionModule;
