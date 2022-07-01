'use strict';
const SpendingStorage = require('./SpendingStorage');

class Spending {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async monthInfo() {
    const req = this.req;
    const session = req.session;
    try {
      const monthInfo = await SpendingStorage.GetSpending(
        session.userId,
        req.params.year,
        req.params.month
      );
      if (monthInfo[0]) return { success: true, data: monthInfo[0] };
      else {
        const dummyData = {
          id: 0,
          year: req.params.year,
          month: req.params.month,
          rent: 0,
          admincost: 0,
          insurance: 0,
          insurance4: 0,
          expense: 0,
        };
        return { success: true, data: dummyData };
      }
    } catch (err) {
      return { success: false, msg: '오류', err };
    }
  }

  async inputSpend() {
    const req = this.req;
    const session = req.session;
    try {
      await SpendingStorage.SaveSpendingInfo(
        session.userId,
        req.body.year,
        req.body.month,
        req.body.rent,
        req.body.admincost,
        req.body.insurance,
        req.body.insurance4,
        req.body.expense
      );
      return { success: true, msg: '입력완료.' };
    } catch (err) {
      console.log(err);
      return { success: false, msg: '입력 오류', err };
    }
  }

  async updateSpend() {
    const req = this.req;
    const session = req.session;
    try {
      await SpendingStorage.UpdateSpendingInfo(
        session.userId,
        req.body.year,
        req.body.month,
        req.body.rent,
        req.body.admincost,
        req.body.insurance,
        req.body.insurance4,
        req.body.expense
      );
      return { success: true, msg: '수정완료.' };
    } catch (err) {
      return { success: false, msg: '입력 오류', err };
    }
  }
}
module.exports = Spending;
