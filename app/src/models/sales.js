'use strict';
const SalesStorage = require('./SalesStorage');

class Sales {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async table() {
    const session = this.req.session;
    const year = this.req.params.year;
    const month = this.req.params.month;
    try {
      const salesInfo = await SalesStorage.GetSalesMonth(
        session.userId,
        year,
        month
      );
      return { success: true, data: salesInfo };
    } catch (err) {
      return { success: false, msg: '오류', err };
    }
  }

  async dayInfo() {
    const req = this.req;
    const session = req.session;
    const year = req.params.year;
    const month = req.params.month;
    const day = req.params.day;
    try {
      const dayInfo = await SalesStorage.GetSalesDay(
        session.userId,
        year,
        month,
        day
      );
      return { success: true, data: dayInfo };
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

  async processSalesData(data) {
    const salesOfMonth = data.reduce((result, info) => {
      result = result + info.sales;
      return result;
    }, 0);
    return salesOfMonth;
  }
}

module.exports = Sales;
