'use strict';
//Logger
const logger = require('../../config/logger');

//Models
const User = require('../../models/user');
const sales = require('../../models/sales');

const output = {
  home: (req, res) => {
    res.render('home/index');
  },

  login: (req, res) => {
    res.render('home/login');
  },

  finder: (req, res) => {
    res.render('home/finder');
  },

  main: (req, res) => {
    res.render('home/main');
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body, req.session); //constructer(body)로 전달
    const response = await user.login(); //함수 실행
    if (response.success) {
      req.session.save(() => {
        // return res.redirect('/main');
        return res.json(response);
      });
    } else {
      if (response.err) logger.error(`${response.err}`);
      return res.json(response);
    }
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

  dailysales: async (req, res) => {
    //생각중인 것 table schema month, days, sales, userId(one to many)
    const salesInfo = new sales(req, res);
    const response = await salesInfo.inputSales();
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
