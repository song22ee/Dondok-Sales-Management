'use tstrict';

const request = require('request');

const ipAuth = {
  checkip: async (req, res, next) => {
    request('https://api.ip.pe.kr/json/', function (error, response, body) {
      if (error) {
        console.log(error);
        return;
      }
      if (!error && response.statusCode == 200) {
        const ip = JSON.parse(body).ip;
        const country_code = JSON.parse(body).country_code;
        console.log(ip, country_code);
        if (country_code != 'KR') {
          res.send('Access Denied');
          return;
        } else {
          next();
        }
      }
    });
  },
};

module.exports = ipAuth;
