'use strict';

const sessionAuth = {
  checkSession: async (req, res, next) => {
    if (!req.session.is_logined) {
      return res.json({ success: false, msg: '로그인이 필요합니다.' });
    } else {
      next();
    }
  },
};

module.exports = sessionAuth;
