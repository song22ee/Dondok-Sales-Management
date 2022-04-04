'use strict';
//Logger
const logger = require('../../config/logger');

const User = require('../../models/user');

const output = {
  home: (req, res) => {
    logger.info(`GET / 200 "home"`);
    res.render('home/index');
  },

  login: (req, res) => {
    logger.info(`GET / 200 "login"`);
    res.render('home/login');
  },

  finder: (req, res) => {
    logger.info(`GET / 200 "finder"`);
    res.render('home/finder');
  },

  main: (req, res) => {
    logger.info(`GET / 200 "main"`);
    res.render('home/main');
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body, req.session); //constructer(body)로 전달
    const response = await user.login(); //함수 실행
    if (response.err) logger.error(`${response.err}`);
    // res.session.is_logined = true;
    req.session.save(() => {
      // return res.redirect('/');
      return res.json(response.success);
    });
  },

  register: async (req, res) => {
    const user = new User(req.body); //constructer(body)로 전달
    const response = await user.register(); //함수 실행
    if (response.err) logger.error(`${response.err}`);
    return res.json(response);
  },

  finder: async (req, res) => {
    const userInfo = new User(req.body);
    const response = await userInfo.finder();
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
