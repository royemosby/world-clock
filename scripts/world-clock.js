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

var WC_Date = new Date();  //place inside init() eventually

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
            startTime: 2, //2am
            endTime: 2 //2am
        },
        group2: { //WET, CET, EET
            startDay: findLastSun(2), //last Sunday in Mar
            endDay: this.findLastSun(9),  //last Sunday in Oct
            startTime: 1,
            endTime: 1
        },
        group3: { //ACT, AET
            startDay: find1stSun(9), //1st Sunday in Oct
            endDay: this.find1stSun(3), //1st Sunday in Apr
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
}

///////////////////////////////////////////////////////////
function find1stSun(month){
    var utilMonth = new Date(date.getYear(), month)
    return '1st';
}
function find2ndSun(month){
    return '2nd';
}
function findLastSun(month){
    return 'last';
}

function setSavings(){
    var savings = WC_display.savingsTime;
    savings.group1.startDay = find2ndSun(2);
    savings.group1.endDay = find1stSun(10);
    savings.group2.startDay = findLastSun(2);
    savings.group2.endDay = findLastSun(9);
    savings.group3.startDay = find1stSun(9);
    savings.group3.endDay = find1stSun(3);
    savings.group4.startDay = findLastSun(8);
    savings.group4.endDay = find1stSun(3);
}

function setTime() {
    var date = WC_Date;
    var month = date.getUTCMonth();
    var dayOfWeek = date.getUTCDay(); //0 == Sunday
    var dayOfMonth = date.getUTCDate();
    var hour = date.getUTCHours();
    WC_Clocks.forEach(function(clock){
        var savings = 0;
        switch(clock.savingsTime){
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
        var clockTime = new Date(date.getTime() + clock.offset*3600000 + savings);
        clock.month = clockTime.getUTCMonth();
        clock.day = clockTime.getUTCDay();
        clock.hour = clockTime.getUTCHours();
        clock.minute = clockTime.getUTCMinutes();
        clock.second = clockTime.getUTCSeconds();
    });
}