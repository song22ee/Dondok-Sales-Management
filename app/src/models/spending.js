'use strict';
const SpendingStorage = require('./SpendingStorage');

class Spending {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async monthInfo() {
    const req = this.req;
    const session = this.req.session;
    try {
      const monthInfo = await SpendingStorage.GetSpendingMonth(
        session.userId,
        req.params.year,
        req.params.month
      );
      return { success: true, data: monthInfo };
    } catch (err) {
      return { success: false, msg: '오류', err };
    }
  }

  async dayInfo() {
    const req = this.req;
    const session = req.session;
    try {
      const dayInfo = await SpendingStorage.GetSpendingDay(
        session.userId,
        req.params.year,
        req.params.month,
        req.params.day
      );
      if (dayInfo[0]) return { success: true, data: dayInfo[0] };
      else {
        const dummyData = {
          id: 0,
          year: req.params.year,
          month: req.params.month,
          days: req.params.day,
          meat: 0,
          foodIngredients: 0,
          alcohol: 0,
          beverage: 0,
          etc: 0,
        };
        return { success: true, data: dummyData };
      }
    } catch (err) {
      return { success: false, msg: '오류', err };
    }
  }

  async inputSales() {
    const req = this.req;
    const session = req.session;
    console.log(req.body);
    try {
      await SpendingStorage.SaveSpendingInfo(
        session.userId,
        req.body.year,
        req.body.month,
        req.body.days,
        req.body.meat,
        req.body.foodIngredients,
        req.body.alcohol,
        req.body.beverage,
        req.body.etc
      );
      return { success: true, msg: '입력완료.' };
    } catch (err) {
      return { success: false, msg: '입력 오류', err };
    }
  }

  // async updateSales() {
  //   const req = this.req;
  //   const session = req.session;
  //   try {
  //     await SpendingStorage.UpdateSalesInfo(session.userId, req.body);
  //     return { success: true, msg: '수정완료.' };
  //   } catch (err) {
  //     return { success: false, msg: '입력 오류', err };
  //   }
  // }
}
module.exports = Spending;
