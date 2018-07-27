/*
- make IIFE
    - internalize clock creation (called repeatedly from a table inside the master page)
- update event listener for init
*/
///////////////////////////////////////////////////////////
// World-Clock(1.0) vanilla JS world clock
// By Roy Mosby (roy.e.mosby@gmail.com) 2018
// https://github.com/egomadking/world-clock

// Inspired by"Live Clock" script (3.0)
// By Mark Plachetta (astroboy@zip.com.au)
// http://www.zip.com.au/~astroboy/liveclock/
// link dead but saved for posterity
///////////////////////////////////////////////////////////

var WC_Date = new Date(); //place inside init() eventually
var WC_Year = WC_Date.getUTCFullYear();

var WC_Clocks = [
  {
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
  style: {
    //push to CSS or display inline?
    font: 'Arial',
    fontSize: '1em',
    fontColor: 'black',
    bgColor: 'white',
    clockWidth: '80px'
  },
  format: {
    clock12Hr: false,
    showSeconds: true
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
    group1: {
      //HAT, AKT, PT, MT, CT, ET, AT, NT
      startDay: find2ndSun(2, 2, WC_Year), //2AM 2nd Sun in Mar
      endDay: find1stSun(2, 10, WC_Year) //2AM 1st Sun in Nov
    },
    group2: {
      //WET, CET, EET
      startDay: findLastSun(1, 2, WC_Year), //1AM last Sunday in Mar
      endDay: findLastSun(1, 9, WC_Year) //1AM last Sunday in Oct
    },
    group3: {
      //ACT, AET
      startDay: find1stSun(2, 9, WC_Year), //2AM 1st Sunday in Oct
      endDay: find1stSun(2, 3, WC_Year + 1) //2AM 1st Sunday in Apr
    },
    group4: {
      //NZT
      startDay: findLastSun(2, 8, WC_Year), //2AM last Sunday in Sep
      endDay: find1stSun(3, 3, WC_Year + 1) //3AM 1st Sunday in Apr
    }
  }
};

//Establish start/end days for DST
function getMonthLen(month) {
  var date = new Date(month.getUTCFullYear(), month.getUTCMonth() + 1, 0);
  return date.getUTCDate();
}

function find1stSun(hour, month, year) {
  var utilMonth = new Date(year, month);
  var monthDayStart = utilMonth.getUTCDay();
  var daysInMonth = getMonthLen(utilMonth);
  var target;
  //find lowest UTCdate where day === 0
  for (var i = 0; i < daysInMonth; i++) {
    if (monthDayStart + i === 0 || monthDayStart + i === 7) {
      target = i + 1;
      break;
    } else {
    }
  }
  return new Date(year, month, target, hour);
}

function find2ndSun(hour, month, year) {
  var utilMonth = new Date(year, month);
  var monthDayStart = utilMonth.getUTCDay();
  var daysInMonth = getMonthLen(utilMonth);
  var target;
  //find 2nd lowest UTCdate where day === 0
  for (var i = 7; i < daysInMonth; i++) {
    if (monthDayStart + i === 8 || monthDayStart + i === 14) {
      target = i + 1;
      break;
    } else {
    }
  }
  return new Date(year, month, target, hour);
}

function findLastSun(hour, month, year) {
  var utilMonth = new Date(year, month);
  var monthDayStart = utilMonth.getUTCDay();
  var daysInMonth = getMonthLen(utilMonth);
  var lastSun = new Date(utilMonth.getUTCFullYear(), month, daysInMonth);
  var target = lastSun.getUTCDate() - lastSun.getUTCDay();
  return new Date(year, month, target, hour);
}

//Set time for each of WC_Clocks
function setTime() {
  var date = WC_Date;
  var month = date.getUTCMonth();
  var dayOfWeek = date.getUTCDay(); //0 == Sunday
  var dayOfMonth = date.getUTCDate();
  var hour = date.getUTCHours();
  WC_Clocks.forEach(function(clock) {
    var savings = 0;
    if (clock.savingsTime === 'none') {
    } else {
      //find matching start/stop dates in WC_display.savingsTime
      //getTime() on them. if start<=today<end, then savings=1
    }
    var clockTime = new Date(date.getTime() + clock.offset * 3600000 + savings);
    clock.month = clockTime.getUTCMonth();
    clock.day = clockTime.getUTCDay();
    clock.hour = clockTime.getUTCHours();
    clock.minute = clockTime.getUTCMinutes();
    clock.second = clockTime.getUTCSeconds();
  });
}
