'use strict';
const SalesStorage = require('./SalesStorage');

class Sales {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async monthInfo() {
    const req = this.req;
    const session = this.req.session;
    try {
      const monthInfo = await SalesStorage.GetSalesMonth(
        req.params,
        session.userId
      );
      return { success: true, data: monthInfo };
    } catch (err) {
      return { success: false, msg: '오류', err };
    }
  }

  async dayInfo() {
    const req = this.req;
    const session = req.session;
    // console.log(session);
    try {
      const dayInfo = await SalesStorage.GetSalesDay(
        req.params,
        session.userId
      );
      if (dayInfo[0]) return { success: true, data: dayInfo };
      else return { success: false, msg: '로그인이 필요합니다.' };
    } catch (err) {
      return { success: false, msg: '오류', err };
    }
  }

  async inputSales() {
    const req = this.req;
    const session = req.session;
    try {
      await SalesStorage.SaveSalesInfo(req.body, session.userId);
      return { success: true, msg: '입력완료.' };
    } catch (err) {
      return { success: false, msg: '입력 오류', err };
    }
  }

  async updateSales() {
    const req = this.req;
    const session = req.session;
    try {
      await SalesStorage.UpdateSalesInfo(req.body, session.userId);
      return { success: true, msg: '수정완료.' };
    } catch (err) {
      return { success: false, msg: '입력 오류', err };
    }
  }

  async processSalesData(data) {
    const salesOfMonth = data.reduce((result, info) => {
      result = result + info.sales;
      return result;
    }, 0);
    return salesOfMonth;
  }
}

module.exports = Sales;
