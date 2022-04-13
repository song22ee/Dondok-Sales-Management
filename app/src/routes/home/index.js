'use strict';

const express = require('express');
const router = express.Router();

//Controller
const ctrl = require('./home.ctrl');

router.get('/', ctrl.output.home);
router.get('/login', ctrl.output.login);
router.get('/finder', ctrl.output.finder);
router.get('/table', ctrl.output.table);
router.get('/logout', ctrl.auth.logout);

//POST
router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);
router.post('/finder', ctrl.process.finder);
router.post('/dailysales', ctrl.process.dailysales);

module.exports = router;
