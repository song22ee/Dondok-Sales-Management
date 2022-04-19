'use strict';

const express = require('express');
const router = express.Router();

//Controller
const ctrl = require('./home.ctrl');

//Rendering Pages
router.get('/', ctrl.output.home);
router.get('/login', ctrl.output.login);
router.get('/finder', ctrl.output.finder);
router.get('/table', ctrl.output.table);

router.get('/logout', ctrl.auth.logout);
router.get('/table/:year/:month', ctrl.process.get.monthInfo);
router.get('/table/:year/:month/:day', ctrl.process.get.dayInfo);

//POST
router.post('/login', ctrl.process.post.login);
router.post('/register', ctrl.process.post.register);
router.post('/finder', ctrl.process.post.finder);
router.post('/sales', ctrl.process.post.sales);

//UPDATE

module.exports = router;
