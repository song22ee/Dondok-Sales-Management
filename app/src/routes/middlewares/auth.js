'use strict';

const jwt = require('../../config/jwt');
// const MSG = require('../modules/responseMessage');
// const CODE = require('../modules/statusCode');
// const util = require('../modules/util');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
  checkToken: async (req, res, next) => {
    var token = req.headers.token;
    // 토큰 없음
    if (!token)
      return res.json({ success: false, msg: '로그인이 필요합니다.' });
    // decode
    const user = await jwt.verify(token);
    // 유효기간 만료
    if (user === TOKEN_EXPIRED)
      return res.json({ success: false, msg: '로그인 만료.' });
    // 유효하지 않는 토큰
    if (user === TOKEN_INVALID)
      return res.json({ success: false, msg: '로그인 만료.' });
    if (user.idx === undefined)
      return res.json({ success: false, msg: '로그인이 필요합니다.' });
    req.idx = user.idx;
    next();
  },
};

module.exports = authUtil;
