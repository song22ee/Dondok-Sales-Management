'use strict';
const SalesStorage = require('./SalesStorage');

class sales {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async inputSales() {
    const req = this.req;
    const session = this.req.session;
    try {
      await SalesStorage.SaveSalesInfo(req.body, session.userId);
      return { success: true, msg: '입력완료.' };
    } catch (err) {
      return { success: false, msg: '입력 오류', err };
    }
  }
}

module.exports = sales;
