const localeStr = 'sv-SE';
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

Date.prototype.getWeekNumber = function() {
  let d = new Date(
    Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())
  );
  let dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

Date.prototype.getMonday = function() {
  let d = new Date(
    Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())
  );
  let day = d.getDay() || 7; // Get current day number, converting Sun. to 7
  // Only manipulate the d if it isn't Mon.
  if (day !== 1) d.setHours(-24 * (day - 1)); // Set the hours to day number minus 1
  return d; // will be Monday
};

let ccontainer = document.createElement('div');
ccontainer.className = 'ccontainer';
//this function will set the text value for a tags;
function domText(id, val) {
  let item = document.createElement('div');
  item.id = id;
  item.innerHTML = val;
  ccontainer.appendChild(item);
}

// let yv = 2019,
//   mv = 5,
//   dv = 1;

// let dt = `${yv}, ${mv}, ${dv}`;
// // let dt = new Date();

// let d = new Date(dt);
// let y = d.getFullYear();
// let m = d.getMonth();

// let dayInWeek = weekdays[d.getDay()]; //string
// let monthName = months[m];
// let weeknum = parseInt(d.getWeekNumber()); //int // get week from date
// let monday = parseInt(d.getMonday().getDate()); //int
// let monMonth = parseInt(d.getMonday().getMonth() + 1); //int
// let year = parseInt(1900 + d.getYear()); //int
// let firstInYearDate = new Date(y, 0, 1);
// let currentDate = d.toLocaleDateString(localeStr); //string
// let firstMDay = new Date(y, m, 1).getDate();
// let eoThisMonth = parseInt(new Date(y, m + 1, 0).getDate()); //int
// let eoPrevMonth = parseInt(new Date(y, m, 0).getDate()); //int

const mondayFromWeekNumber = function(week, y) {
  // sets default year to current if undefined
  y = typeof y !== 'undefined' ? y : new Date().getFullYear();
  // sets date of first in year
  let fyD = new Date(y, 0, 1);
  // gets day of week
  let fyInWeek = fyD.getDay();

  // multiplies with days in correspondence to day in week of first year date
  // to get a correct weekday number at the beginning of a year
  let res = 1;
  if (fyInWeek > 4) res = 7;
  if (fyInWeek == 6) res = 18;

  // number of requested weeks in miliseconds
  let noOfWeeks = 604800000 * (week - 1);
  // number of days in miliseconds
  let days = 3600000 * 24 * res * (fyInWeek - 1);
  // returns start of year plus nuOfweeks minus days in week
  return new Date(fyD.getTime() + noOfWeeks - days);
};

// console.log(parseInt(mondayFromWeekNumber(1).getDate()));

const wCal = {
  // calendarHelp() {
  //   domText('fulldate', 'fulldate: ' + currentDate);
  //   domText('weekday', 'weekday: ' + dayInWeek);
  //   domText('weeknum', 'weeknum: ' + weeknum);
  //   domText('monday', 'monday: ' + monday + '.' + monMonth);
  //   domText('month', 'month: ' + monthName);
  //   domText('eoThisMonth', 'end of month: ' + eoThisMonth);
  //   domText('eoprevmonth', 'end of  prev month: ' + eoPrevMonth);
  //   domText('year', 'year: ' + year);
  //   //append to DOM div
  //   document.getElementsByClassName('calendarHelp')[0].appendChild(ccontainer);
  // },
  createWeek() {
    for (let j = 0; j < 5; j++) {
      let x = mondayFromWeekNumber(j + 1, 2019);

      //Set the parent element
      let week = document.createElement('div');
      week.className = 'week';
      week.id = `week_${j + 1}`;

      // Create the inner elems before appending to parent
      for (let i = 0; i < 8; i++) {
        //Set the child element
        let cell = document.createElement('div');
        cell.className = 'cell';

        let xd = new Date(x.getFullYear(), x.getMonth(), x.getDate() + i - 1);
        let xxd = xd.toLocaleDateString(localeStr);
        let xxxd = xd.getDate();

        if (i == 0) {
          cell.id = `week#${j + 1}`;
          cell.innerHTML = j + 1;
          cell.style =
            'text-align: center; font-size:24px; color:white; background:#4abf8a';
        } else {
          cell.id = `${xxd}`;
          cell.innerHTML = xxxd;
        }

        // append to parent
        week.appendChild(cell);
      }
      //append to DOM div
      document.getElementsByClassName('calendar')[0].appendChild(week);
    }
  }
};

window.onload = function() {
  //call calendar() when page load
  // wCal.calendarHelp();
  wCal.createWeek();
};
