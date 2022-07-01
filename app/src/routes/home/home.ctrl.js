'use strict';
//Config
const requestIp = require('request-ip');
const logger = require('../../config/logger');
// const jwt = require('../../config/jwt');

//Models
const User = require('../../models/user');
const Sales = require('../../models/sales');
const Spending = require('../../models/spending');

const output = {
  home: (req, res) => {
    logger.info(`${requestIp.getClientIp(req)}`);
    res.render('home/index');
  },

  login: (req, res) => {
    res.render('home/login');
  },

  finder: (req, res) => {
    res.render('home/finder');
  },

  table: (req, res) => {
    res.render('home/table', {
      user: req.session.userName,
    });
  },
};

const process = {
  post: {
    login: async (req, res) => {
      const user = new User(req.body, req.session); //constructer(body)로 전달
      const response = await user.login(); //함수 실행
      if (response.success) {
        req.session.save(() => {
          return res.json(response);
        });
        // const jwtToken = await jwt.sign(response.data);
        // console.log(jwtToken);
        // response.token = jwtToken;
        // return res.json(response);
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

    sales: async (req, res) => {
      //생각중인 것 table schema month, days, sales, userId(one to many)
      const salesInfo = new Sales(req, res);
      const response = await salesInfo.inputSales();
      return res.json(response);
    },

    spending: async (req, res) => {
      const spendingInfo = new Spending(req, res);
      const response = await spendingInfo.inputSpend();
      return res.json(response);
    },
  },

  get: {
    monthInfo: async (req, res) => {
      const salesInfo = new Sales(req, res);
      const response = await salesInfo.monthInfo();
      if (response.success) {
        const salesOfMonth = await salesInfo.processSalesData_Month(
          response.data
        );
        const salesOfWeek = await salesInfo.processSalesData_Weeks(
          req.params.year,
          req.params.month,
          response.data
        );
        response.total = salesOfMonth;
        response.week = salesOfWeek;
      } else {
        if (response.err) logger.error(`${response.err}`);
      }
      return res.json(response);
    },
    dayInfo: async (req, res) => {
      const salesInfo = new Sales(req, res);
      const response = await salesInfo.dayInfo();
      if (response.success) {
        if (response.data) {
          res.render('home/input', {
            user: req.session.userName,
            data: response.data,
          });
        }
      } else {
        if (response.err) logger.error(`${response.err}`);
      }
    },
    spendingInfo: async (req, res) => {
      const spendingInfo = new Spending(req, res);
      const response = await spendingInfo.monthInfo();
      if (response.success) {
        if (response.data) {
          res.render('home/monthInput', {
            user: req.session.userName,
            data: response.data,
          });
        }
      } else {
        if (response.err) logger.error(`${response.err}`);
      }
    },
  },

  put: {
    sales: async (req, res) => {
      const salesInfo = new Sales(req, res);
      const response = await salesInfo.updateSales();
      if (response.err) logger.error(`${response.err}`);
      return res.json(response);
    },
    spending: async (req, res) => {
      const spendingInfo = new Spending(req, res);
      const response = await spendingInfo.updateSpend();
      if (response.err) logger.error(`${response.err}`);
      return res.json(response);
    },
  },
  test: async (req, res) => {
    logger.info(`${requestIp.getClientIp(req)}`);
    return res.json('error');
  },
};

const auth = {
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) logger.error(`${err}`);
      res.redirect('/login');
    });
  },
};

module.exports = {
  output,
  process,
  auth,
};
