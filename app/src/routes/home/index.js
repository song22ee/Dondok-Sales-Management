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
router.get('/dailysales', ctrl.process.get.dailySales);

//POST
router.post('/login', ctrl.process.post.login);
router.post('/register', ctrl.process.post.register);
router.post('/finder', ctrl.process.post.finder);
router.post('/dailysales', ctrl.process.post.dailySales);

//UPDATE

module.exports = router;
