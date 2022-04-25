'use strict';

const SalesStorage = require('../models/SalesStorage');

const MonthInit = async () => {
  const date = new Date(); //현재 날짜와 시간
  const viewYear = date.getFullYear(); //2022년
  const viewMonth = date.getMonth() + 1; //3월 (0부터 시작)
  const thisLast = new Date(viewYear, viewMonth, 0); //2022 4월 30일
  console.log(thisLast);
  console.log(thisLast.getDay());
  const TLDate = thisLast.getDate(); //이번달 마지막 달의 날짜 30일
  console.log(TLDate);
  const thisDates = [...Array(TLDate + 1).keys()].slice(1); //배열안의 개수는 날짜 개수와 동일 30일 or 31일
  console.log(thisDates);
};

MonthInit();
