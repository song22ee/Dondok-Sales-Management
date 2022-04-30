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
      const dayInfo = await SalesStorage.GetSalesDay(
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
          sales: 0,
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
      await SalesStorage.SaveSalesInfo(
        session.userId,
        req.body.year,
        req.body.month,
        req.body.days,
        req.body.sales
      );
      return { success: true, msg: '입력완료.' };
    } catch (err) {
      return { success: false, msg: '입력 오류', err };
    }
  }

  async updateSales() {
    const req = this.req;
    const session = req.session;
    try {
      await SalesStorage.UpdateSalesInfo(session.userId, req.body);
      return { success: true, msg: '수정완료.' };
    } catch (err) {
      return { success: false, msg: '입력 오류', err };
    }
  }

  async processSalesData_Month(data) {
    const salesOfMonth = data.reduce((result, info) => {
      result = result + info.sales;
      return result;
    }, 0);
    return salesOfMonth;
  }

  async processSalesData_Weeks(year, month, data) {
    const salesOfWeeks = [];
    const thisLast = new Date(year, month, 0);
    const TLDate = thisLast.getDate();
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);

    thisDates.reduce((result, dates) => {
      const date = new Date(year, month - 1, dates);
      const salesInit = date.getDay();
      const salesOfDate = data.filter((sales) => sales.days === dates);
      if (salesInit === 0 || dates === TLDate) {
        //일요일 or 마지막날
        salesOfWeeks.push({ week: dates, sales: result });
        result = 0;
        // console.log(salesOfDate[0].sales);
      }
      if (salesOfDate[0]) {
        result = result + salesOfDate[0].sales;
        return result;
      } else {
        return result;
      }
    }, 0);
    return salesOfWeeks;
  }
}

module.exports = Sales;
