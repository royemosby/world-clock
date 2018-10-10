/*
- make IIFE
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
var savings = 0;

var WC_Clocks = [
  {
    region: ['UTC', 'UTC'],
    location: 'UTC',
    offset: 0,
    savingsTime: 'none',
  },
  {
    region: ['EST', 'EDT'],
    location: 'New York, NY',
    offset: -5,
    savingsTime: 'group1',
  },
  {
    region: ['PST', 'PDT'],
    location: 'San Diego, CA',
    offset: -8,
    savingsTime: 'group1',
  },
  {
    region: ['HST', 'HST'],
    location: 'Honolulu, HI',
    offset: -10,
    savingsTime: 'none',
  },
  {
    region: ['NZST', 'NZDT'],
    location: 'Aukland, NZ',
    offset: 12,
    savingsTime: 'group4',
  },
  {
    region: ['ACST', 'ACT'],
    location: 'Alice Springs, AU',
    offset: 9.5,
    savingsTime: 'none',
  },
  {
    region: ['CST', 'CST'],
    location: 'Bejing, CN',
    offset: 8,
    savingsTime: 'none',
  },
  {
    region: ['IST', 'IST'],
    location: 'New Delhi, IN',
    offset: 5.5,
    savingsTime: 'none',
  },
  {
    region: ['AST', 'AST'],
    location: 'Doha, QA',
    offset: 3,
    savingsTime: 'none',
  },
  {
    region: ['EET', 'EEST'],
    location: 'Nicosia, CY',
    offset: 2,
    savingsTime: 'group2',
  },
  {
    region: ['CET', 'CEST'],
    location: 'Paris, FR',
    offset: 1,
    savingsTime: 'group2',
  },
];

var WC_display = {
  format: {
    clock12Hr: false, //not used, not implemented
    showSeconds: true,
  },
  days: [
    ['Sunday', 'Sun'],
    ['Monday', 'Mon'],
    ['Tuesday', 'Tue'],
    ['Wednesday', 'Wed'],
    ['Thursday', 'Thu'],
    ['Friday', 'Fri'],
    ['Saturday', 'Sat'],
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
    ['December', 'Dec'],
  ],
  // time zone reference
  // https://en.wikipedia.org/wiki/Template:Daylight_saving_in_time_zone/techdoc
  savingsTime: {
    group1: {
      //HAT, AKT, PT, MT, CT, ET, AT, NT
      startDay: find2ndSun(2, 2, WC_Year), //2AM 2nd Sun in Mar
      endDay: find1stSun(2, 10, WC_Year), //2AM 1st Sun in Nov
    },
    group2: {
      //WET, CET, EET
      startDay: findLastSun(1, 2, WC_Year), //1AM last Sunday in Mar
      endDay: findLastSun(1, 9, WC_Year), //1AM last Sunday in Oct
    },
    group3: {
      //ACT, AET
      startDay: find1stSun(2, 9, WC_Year), //2AM 1st Sunday in Oct
      endDay: find1stSun(2, 3, WC_Year + 1), //2AM 1st Sunday in Apr
    },
    group4: {
      //NZT
      startDay: findLastSun(2, 8, WC_Year), //2AM last Sunday in Sep
      endDay: find1stSun(3, 3, WC_Year + 1), //3AM 1st Sunday in Apr
    },
  },
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
  var daysInMonth = getMonthLen(utilMonth);
  var lastSun = new Date(utilMonth.getUTCFullYear(), month, daysInMonth);
  var target = lastSun.getUTCDate() - lastSun.getUTCDay();
  return new Date(year, month, target, hour);
}

//Set time for each of WC_Clocks
function setTime() {
  var date = WC_Date;
  WC_Clocks.forEach(function(c) {
    if (c.savingsTime === 'none') {
      savings = 0;
    } else {
      var savingsGroup = c.savingsTime;
      var savingsStart = WC_display.savingsTime[savingsGroup].startDay;
      var savingsEnd = WC_display.savingsTime[savingsGroup].endDay;
      if (
        date.getTime() > savingsStart.getTime() &&
        date.getTime() < savingsEnd.getTime()
      ) {
        savings = 1;
      }
    }

    var cTime = new Date(date.getTime() + (c.offset + savings) * 3600000);
    c.year = cTime.getUTCFullYear();
    c.mon = cTime.getUTCMonth();
    c.date = cTime.getUTCDate();
    if (c.date < 10) {
      c.date = String(0) + c.date.toString();
    }
    c.day = cTime.getUTCDay();
    c.hr = cTime.getUTCHours();
    if (c.hr < 10) {
      c.hr = String(0) + c.hr.toString();
    }
    c.min = cTime.getUTCMinutes();
    if (c.min < 10) {
      c.min = String(0) + c.min.toString();
    }
    c.sec = cTime.getUTCSeconds();
    if (c.sec < 10) {
      c.sec = String(0) + c.sec.toString();
    }
    c.timeString = c.hr + ':' + c.min;
    if (WC_display.format.showSeconds) {
      c.timeString += ':' + c.sec;
    }
    c.timeString += ' ' + c.region[savings];
    //Got to deal with Afghanistan's 30min difference
    if (c.offset % 1 != 0) {
      var oddOffset = ' ' + Math.floor(c.offset + savings) + ':';
      oddOffset += (c.offset % 1) * 60;
      c.timeString += oddOffset;
    } else {
      c.timeString += ' ' + (c.offset + savings) + ':00';
    }
    c.dateString =
      WC_display.days[c.day][1] +
      ', ' +
      c.date +
      ' ' +
      WC_display.months[c.mon][0] +
      ', ' +
      c.year;
  });
}

function buildClocks(clocks) {
  var allClocks = '';
  clocks.forEach(function(c) {
    var cDiv = '<div class="clock">';
    var cRegion = '<div class="clockRegion">' + c.location + '</div>';
    var cTime = '<div class="clockTime">' + c.timeString + '</div>';
    var cDate = '<div class="clockDate">' + c.dateString + '</div>';
    cDiv += cRegion + cTime + cDate + '</div>';
    allClocks += cDiv;
  });
  var clockContainer = document.getElementById('clocks');
  clockContainer.innerHTML = allClocks;
}

//instead of rebuilding the clock div
//could do innerText for div clockTime

function run() {
  setTime();
  buildClocks(WC_Clocks);
  WC_Date = new Date();
  setTimeout(run, 250); //working with IE9 and avoiding polyfill
  //alternative would be to watch the second then rAF on change
}

run();
