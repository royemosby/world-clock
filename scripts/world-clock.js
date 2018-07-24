/*
- make IIFE
    - internalize clock creation (called repeatedly from a table inside the master page)
- refactor out old crap
- use case switch for time
- update event listener for init
- think about object for config instead of array
*/
///////////////////////////////////////////////////////////
// World-Clock(1.0) vanilla JS world clock
// By Roy Mosby (roy.e.mosby@gmail.com) 2018
// https://github.com/egomadking/world-clock

// Inspired by"Live Clock" script (3.0)
// By Mark Plachetta (astroboy@zip.com.au)
// http://www.zip.com.au/~astroboy/liveclock/
///////////////////////////////////////////////////////////

var WC_Date = new Date(); //place inside init() eventually

var WC_Clocks = [{
    region: 'Coordinated Universal Time',
    location: 'UTC',
    offset: 0,
    savingsTime: 'none'
  },
  {
    region: 'Eastern Time',
    location: 'Shaw AFB',
    offset: -5,
    savingsTime: 'group1'
  },
  {
    region: 'Pacific Time',
    location: 'Travis AFB',
    offset: -8,
    savingsTime: 'group1'
  },
  {
    region: 'Arabia Time',
    location: 'Al Udeid',
    offset: 3,
    savingsTime: 'group1'
  },
  {
    region: 'Afghanistan Time',
    location: 'Kabul',
    offset: 4.5,
    savingsTime: 'none'
  }
];

var WC_display = {
  style: { //push to CSS or display inline?
    font: 'Arial',
    fontSize: '1em',
    fontColor: 'black',
    bgColor: 'white',
    clockWidth: '80px'
  },
  format: {
    clock12Hr: false,
    showSeconds: true,
  },
  days: [
    ['Sunday', 'Sun'],
    ['Monday', 'Mon'],
    ['Tuesday', 'Tue'],
    ['Wednesday', 'Wed'],
    ['Thursday', 'Thu'],
    ['Friday', 'Fri'],
    ['Saturday', 'Sat']
  ],
  months: [
    ['January', 'Jan'],
    ['February', 'Feb'],
    ['March', 'Mar'],
    ['April', 'Apr'],
    ['May', 'May'],
    ['June', 'Jun'],
    ['July', 'Jul'],
    ['August', 'Aug'],
    ['September', 'Sep'],
    ['October', 'Oct'],
    ['November', 'Nov'],
    ['December', 'Dec']
  ],
  // time zone reference
  // https://en.wikipedia.org/wiki/Template:Daylight_saving_in_time_zone/techdoc
  savingsTime: {
    group1: { //HAT, AKT, PT, MT, CT, ET, AT, NT
      startDay: find2ndSun(2), //2nd Sun in Mar
      endDay: find1stSun(10), //1st Sun in Nov
      startTime: 2, //2am
      endTime: 2 //2am
    },
    group2: { //WET, CET, EET
      startDay: findLastSun(2), //last Sunday in Mar
      endDay: findLastSun(9), //last Sunday in Oct
      startTime: 1,
      endTime: 1
    },
    group3: { //ACT, AET
      startDay: find1stSun(9), //1st Sunday in Oct
      endDay: find1stSun(3), //1st Sunday in Apr
      startTime: 2,
      endTime: 3
    },
    group4: { //NZT
      startDay: findLastSun(8), //last Sunday in Sep
      endDay: find1stSun(3), //1st Sunday in Apr
      startTime: 2,
      endTime: 3
    }
  }
};

function getMonthLen(month) {
  var date = new Date(month.getUTCFullYear(), month.getUTCMonth() + 1, 0);
  return date.getUTCDate();
}

///////////////////////////////////////////////////////////
function find1stSun(month) {
  var utilMonth = new Date(WC_Date.getUTCFullYear(), month);
  var monthDayStart = utilMonth.getUTCDay();
  var daysInMonth = getMonthLen(utilMonth);
  var target;
  //find lowest UTCdate where day === 0
  for (var i = 0; i < daysInMonth; i++) {
    if (monthDayStart + i === 0 || monthDayStart + i === 7) {
      target = i + 1;
      console.log('1st day: ' + target + ' month: ' + utilMonth.getUTCMonth());
      break;
    } else {}
  }
  return target;
}

function find2ndSun(month) {
  var utilMonth = new Date(WC_Date.getUTCFullYear(), month);
  var monthDayStart = utilMonth.getUTCDay();
  var daysInMonth = getMonthLen(utilMonth);
  var target;
  //find 2nd lowest UTCdate where day === 0
  for (var i = 7; i < daysInMonth; i++) {
    if (monthDayStart + i === 8 || monthDayStart + i === 14) {
      target = i + 1;
      console.log('2nd day: ' + target + ' month: ' + utilMonth.getUTCMonth());
      break;
    } else {}
  }
  return target;
}

function findLastSun(month) {
  var utilMonth = new Date(WC_Date.getUTCFullYear(), month);
  var monthDayStart = utilMonth.getUTCDay();
  var daysInMonth = getMonthLen(utilMonth);
  var target;
  for (var i = daysInMonth; i > daysInMonth; i--) {
    //start at last day of month
    //if day === 0, target = that date
    //else day
  }
  //return target;
}

function setTime() {
  var date = WC_Date;
  var month = date.getUTCMonth();
  var dayOfWeek = date.getUTCDay(); //0 == Sunday
  var dayOfMonth = date.getUTCDate();
  var hour = date.getUTCHours();
  WC_Clocks.forEach(function (clock) {
    var savings = 0;
    switch (clock.savingsTime) {
      case 'group1':
        break;
      case 'group2':
        //do something to clock.offset if in range
        break;
      case 'group3':
        //do something to clock.offset if in range
        break;
      case 'group4':
        //do something to clock.offset if in range
        break;
      default:
        break;
    }
    var clockTime = new Date(date.getTime() + clock.offset * 3600000 + savings);
    clock.month = clockTime.getUTCMonth();
    clock.day = clockTime.getUTCDay();
    clock.hour = clockTime.getUTCHours();
    clock.minute = clockTime.getUTCMinutes();
    clock.second = clockTime.getUTCSeconds();
  });
}