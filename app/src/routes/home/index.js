'use strict';

const express = require('express');
const router = express.Router();

//Controller
const ctrl = require('./home.ctrl');

router.get('/', ctrl.output.home);
router.get('/login', ctrl.output.login);
router.get('/finder', ctrl.output.finder);
router.get('/main', ctrl.output.main);

//POST
router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);
router.post('/finder', ctrl.process.finder);
router.post('/inputsales', ctrl.process.inputsales);

module.exports = router;
