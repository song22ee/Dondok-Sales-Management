'use strict';

//모듈
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();

//라우팅
const home = require('./src/routes/home');

const sessionConfig = require('./src/config/session');
const logger = require('./src/config/logger');

logger.error('Log Test ...');

//앱 세팅
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/src/public`));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);

//Routes
app.use('/', home); //use => Middleware

module.exports = app;
