const localeStr = 'sv-SE';
const year = 2019;
const displayWeeks = 70;

const weekdays = [
  'wk',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
  'mth, year'
];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const wCal = {
  isOdd(x) {
    return x & 1;
  },
  getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); // Copy date so don't modify original
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7)); // Set to nearest Thursday: current date + 4 - current day number // Make Sunday's day number 7
    return Math.ceil(
      ((d - new Date(Date.UTC(d.getUTCFullYear(), 0, 1))) / 86400000 + 1) / 7 // Calculate full weeks to nearest Thursday
    );
  },
  mondayFromWeekNumber(week, y) {
    y = typeof y !== 'undefined' ? y : new Date().getFullYear(); // sets default year to current if undefined
    let fyD = new Date(y, 0, 1); // sets date of first in year
    let fyInWeek = fyD.getDay(); // gets day of week
    let res = 1; // multiplier to get a correct weekday number at the beginning of a year
    if (fyInWeek > 4) res = 7;
    if (fyInWeek == 6) res = 18;
    let noOfWeeks = 604800000 * (week - 1); // number of requested weeks in miliseconds
    let days = 3600000 * 24 * res * (fyInWeek - 1); // number of days in miliseconds
    return new Date(fyD.getTime() + noOfWeeks - days); // returns start of year plus nuOfweeks minus days in week
  },
  createCal() {
    //Set the parent element
    let calendar = [];
    for (let j = 0; j < displayWeeks; j++) {
      let x = this.mondayFromWeekNumber(j + 1, year);

      //Set the child element
      let week = [];
      // Create the inner elems before appending to parent
      for (let i = 0; i < 9; i++) {
        let xd = new Date(x.getFullYear(), x.getMonth(), x.getDate() + i - 1);

        let wkNum = this.getWeekNumber(
          new Date(x.getFullYear(), x.getMonth(), x.getDate() + i)
        );

        let month = new Date(x.getFullYear(), x.getMonth(), x.getDate() + 6);

        if (i == 0) {
          //add weeknumbers
          week.push(`<div 
              class="cell" 
              id="week#${wkNum}" 
              style="font-size:18px; color:white; background:#4abf8a">${wkNum}</div>`);
        } else if (i == 8) {
          // month and year
          week.push(`<div 
              class="cell" 
              id="month#${months[month]}" 
              style="color:white; background:#4abf8a">${months[
                month.getMonth()
              ] +
                ', ' +
                month.getFullYear()}</div>`);
        } else {
          // days
          this.isOdd(xd.getMonth())
            ? week.push(`<div 
              class="cell day"
              onclick="showIt(this)"
              id="${xd.toLocaleDateString(localeStr)}">${xd.getDate()}</div>`)
            : week.push(`<div 
              class="cell day odd"
              onclick="showIt(this)"
              id="${xd.toLocaleDateString(localeStr)}">${xd.getDate()}</div>`);
        }
      }
      // add every week to calendar array
      calendar.push(
        `<div class="week" id="week_${j + 1}" >${week.join('')}</div>`
      );
    }
    // fill clusterize with data
    var clusterize = new Clusterize({
      rows: calendar,
      scrollId: 'scrollArea',
      contentId: 'contentArea'
    });
  }
};

function showIt(element) {
  alert(element.id);
}

//call calendar() when page load
window.onload = function() {
  var timerStart = Date.now();
  wCal.createCal();
  // add headers after loading content
  wkDays = [];
  for (let i = 0; i < weekdays.length; i++) {
    wkDays.push(`<div 
              class="cell" 
              id="day#${weekdays[i]}" 
              style="color:white; background:#4abf8a">${weekdays[i]}</div>`);
  }
  document
    .querySelector('.clusterize-content')
    .insertAdjacentHTML(
      'afterbegin',
      `<div class="week header">${wkDays.join('')}</div>`
    );

  console.log('Load time: ', (Date.now() - timerStart) / 1000, 'seconds');
};
