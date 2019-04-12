const localeStr = 'sv-SE';
const year = 2019;
const displayWeeks = 50;

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

const wCal = {
  getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // // Get first day of year
    // var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    return Math.ceil(
      ((d - new Date(Date.UTC(d.getUTCFullYear(), 0, 1))) / 86400000 + 1) / 7
    );
  },
  mondayFromWeekNumber(week, y) {
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
  },
  createCal() {
    //Set the parent element
    let calendar = [];
    for (let j = 0; j < displayWeeks; j++) {
      let x = this.mondayFromWeekNumber(j + 1, year);

      //Set the child element
      let week = [];
      // Create the inner elems before appending to parent
      for (let i = 0; i < 8; i++) {
        let xd = new Date(x.getFullYear(), x.getMonth(), x.getDate() + i - 1);

        let wkNum = this.getWeekNumber(
          new Date(x.getFullYear(), x.getMonth(), x.getDate() + i)
        );
        //console.log(wkNum);

        if (i == 0) {
          let wk = x.getFullYear() + '-' + wkNum;
          week.push(`<div 
              class="cell" 
              id="week#${wk}" 
              style="font-size:18px; color:white; background:#4abf8a">${wk}</div>`);
        } else {
          week.push(`<div 
              class="cell" 
              id="${xd.toLocaleDateString(localeStr)}" >${xd.getDate()}</div>`);
        }
      }
      calendar.push(
        `<div class="week" id="week_${j + 1}" >${week.join('')}</div>`
      );
      //append to DOM div
      document.querySelector('.calendar').innerHTML = calendar.join('');
    }
    document.getElementById('loading').style.display = 'none';
  }
};

//call calendar() when page load
window.onload = function() {
  var timerStart = Date.now();
  wCal.createCal();
  console.log('Load time: ', (Date.now() - timerStart) / 1000, 'seconds');
};
