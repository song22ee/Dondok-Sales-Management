'use strict';

const express = require('express');
const router = express.Router();
// const auth = require('../middlewares/auth');
const sessionAuth = require('../middlewares/sessionauth');

//Controller
const ctrl = require('./home.ctrl');

//Rendering Pages
router.get('/', ctrl.output.home);
router.get('/login', ctrl.output.login);
router.get('/finder', ctrl.output.finder);
router.get('/table', ctrl.output.table);

router.get('/logout', ctrl.auth.logout);
router.get(
  '/table/:year/:month',
  sessionAuth.checkSession,
  ctrl.process.get.monthInfo
);
router.get(
  '/table/:year/:month/:day',
  sessionAuth.checkSession,
  ctrl.process.get.dayInfo
);

//POST
router.post('/login', ctrl.process.post.login);
router.post('/register', ctrl.process.post.register);
router.post('/finder', ctrl.process.post.finder);
router.post('/sales', sessionAuth.checkSession, ctrl.process.post.sales);

//UPDATE
router.put('/salestest', sessionAuth.checkSession, ctrl.process.put.sales);

module.exports = router;
