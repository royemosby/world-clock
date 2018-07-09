/*
- make IIFE
    - internalize clock creation (called repeatedly from a table inside the master page)
- refactor out old crap
- move styling out of JS
- use case switch for time
- move all config to top
- update event listener for init
- think about object for config instead of array
*/
///////////////////////////////////////////////////////////
// World-Clock(1.0) vanilla JS world clock
// By Roy Mosby (roy.e.mosby@gmail.com)
// https://github.com/egomadking/world-clock

// Inspired by"Live Clock" script (3.0)
// By Mark Plachetta (astroboy@zip.com.au)
// http://www.zip.com.au/~astroboy/liveclock/
///////////////////////////////////////////////////////////


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

var display = {
    style: { //push to CSS
        font: 'Arial',
        fontSize: '1em',
        fontColor: 'black',
        bgColor: 'white',
        clockWidth: '80px'
    },
    format: {
        clock12Hr: false,
        showSeconds: true,
        dateFormats: 3,
            /*''(0) 'dd/mm/yy'(1) yymmdd(2) 
            dd mmm yy(3) DDDD MMMM(4) DDDD MMMM YYYY(5) */
        abbreviateDays: true,
        abbreviateMonths: true
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
            startDay: 1, // 2nd Sunday in Mar
            endDay: 1, // 1st Sunday in Nov
            startTime: 2, //2am
            endTime: 2 //2am
        },
        group2: { //WET, CET, EET
            startDay: 1, //last Sunday in Mar
            endDay: 1,  //last Sunday in Oct
            startTime: 1,
            endTime: 1
        },
        group3: { //ACT, AET
            startDay: 1, //1st Sunday in Oct
            endDay: 1, //1st Sunday in Apr
            startTime: 2,
            endTime: 3
        }, 
        group4: { //NZT
            startDay: 1, //last Sunday in Sep
            endDay: 1, //1st Sunday in Apr
            startTime: 2,
            endTime: 3
        }
    }
};

///////////////////////////////////////////////////////////

function find1stSun(date){

}

function find2ndSun(date){

}

function findLastSun(date){

}


function setTime() {
    var date = new Date();
    var month = date.getUTCMonth();
    var dayOfWeek = date.getUTCDay(); //0 == Sunday
    var dayOfMonth = date.getUTCDate();
    var hour = date.getUTCHours();
    WC_Clocks.forEach(function(clock){
        var savings = 0
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

function LC_CreateClock(c) {
    clockTags = '<span id="' + c.Name + '" style="width:' + c.Width + 'px;background-color:' + c.BackColor + ';border-top:1pt solid gray;border-left:1pt solid gray;border-bottom:1pt solid white;border-right:1pt solid white;"></span>';
    clockTags = '<span id="' + c.Name + '" class="ticktock"></span>';
}

function LC_InitializeClocks() { //refactor to get rid of eval!
    for (i = 0; i < LC_Clocks.length; i++) {
        LC_UpdateClock(i);
        if (LC_Clocks[i].Update) {
            eval('var ' + LC_Clocks[i].Name + '=setInterval("LC_UpdateClock("+' + i + '+")",' + LC_ClockUpdate[LC_Clocks[i].Update] + ')');
        }
    }
}

function LC_UpdateClock(Clock) {
    var c = LC_Clocks[Clock];

    var t = new Date();
    if (!isNaN(c.GMT)) {
        var offset = t.getTimezoneOffset();
        if (navigator.appVersion.indexOf('MSIE 3') != -1) {
            offset = offset * (-1);
        }
        t.setTime(t.getTime() + offset * 60000);
        t.setTime(t.getTime() + c.GMT * 3600000);
    }
    var day = t.getDay();
    var md = t.getDate();
    var mnth = t.getMonth();
    var monthName = LC_MonthsOfYear[mnth];
    //monthName = monthName.split(",");
    var hrs = t.getHours();
    var mins = t.getMinutes();
    var secs = t.getSeconds();
    var yr = t.getYear();

    if (yr < 1900) {
        yr += 1900;
    }

    var ampm = "";
    if (c.Hour12 == 1) {
        ampm = "am";
        if (hrs >= 12) {
            ampm = "pm";
            hrs -= 12;
        }
        if (hrs == 0) {
            hrs = 12;
        }
    }
    if (hrs <= 9) {
        hrs = "0" + hrs;
    }
    if (mins <= 9) {
        mins = "0" + mins;
    }
    if (secs <= 9) {
        secs = "0" + secs;
    }

    var html = '';
    html += c.OpenTags;
    html += '';
    html += hrs + ':' + mins;
    if (c.Update == 1) {
        html += ':' + secs;
    }
    if (c.Hour12) {
        html += ' ' + ampm;
    }
    html += '';

    if (c.DisplayDate == 1) {
        html += ' ' + md + '/' + (mnth + 1) + '/' + yr;
    }
    if (c.DisplayDate == 2) {
        html += ' ' + (mnth + 1) + '/' + md + '/' + yr;
    }

    if (c.DisplayDate == 3) {
        if ((mnth + 1) <= 9) {
            mnth = "0" + (mnth + 1);
        }
        html += ' ' + (mnth) + '/' + md + ' ';
    }

    if (c.DisplayDate == 4) {
        //html+=' '+yr;
    }
    if (c.DisplayDate > 4) {
        html += '<br/>' + md + ' ' + monthName + ", " + yr;
    }

    html += "<font>";
    html += c.CloseTags;

    document.getElementById(c.Name).innerHTML = html;
}


function LiveClock(a, b, c, d, e, f, g, h, i, j, k, l) {
    this.Name = 'LiveClock' + LC_Clocks.length;

    this.FntFace = a || LC_Style[0]; //1 Font
    this.FntSize = b || LC_Style[1]; //2
    this.FntColor = c || LC_Style[2]; //3
    this.BackColor = d || LC_Style[3]; //4
    this.OpenTags = e || LC_Style[4]; //5
    this.CloseTags = f || LC_Style[5]; //6
    this.Width = g || LC_Style[6]; //7
    this.Hour12 = h || LC_Style[7]; //8
    this.Update = i || LC_Style[8]; //9
    this.DisplayDate = k; //10 
    this.Abbreviate = j || LC_Style[10]; //11 Abbreviate y/n
    this.GMT = l || LC_Style[11]; //12 GMT adjustment
    LC_Clocks[LC_Clocks.length] = this;
    LC_CreateClock(this);
}

///////////////////////////////////////////////////////////

LC_OtherOnloads = (window.onload) ? window.onload : new Function; //old: refactor
window.onload = LC_InitializeClocks;