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
    // first week of the year
    let firstDayOfTheYear = this.mondayFromWeekNumber(1, year);
    let x = firstDayOfTheYear;
    let xd = new Date(x.getFullYear(), x.getMonth(), x.getDate());
    let wkNum = this.getWeekNumber(xd);
    let lastDayOfTheYear = new Date(year, 11, 28);
    let lastWeekInYear = this.getWeekNumber(lastDayOfTheYear);
    console.log(1);

    let month = new Date(x.getFullYear(), x.getMonth(), x.getDate() + 6);

    //Set the parent element
    let calendar = [];
    let k = 0;
    for (let j = 1; j < displayWeeks; j++) {
      k++;
      if (j > lastWeekInYear) {
        k++;
      }
      //Set the child element
      let week = [];
      // Create the inner elems before appending to parent
      for (let i = 0; i < 9; i++) {
        if (i == 0) {
          //week number
          week.push(`<div 
              class="cell" 
              id="week#${wkNum + k}" 
              style="font-size:18px; color:white; background:#4abf8a">${wkNum +
                k}</div>`);
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
          //days
          week.push(`<div 
              class="cell day"
              onclick="showIt(this)"
              id="${xd.toLocaleDateString(localeStr)}">${xd.getDate()}</div>`);
        }
      }
      calendar.push(
        `<div class="week" id="week_${k + 1}" >${week.join('')}</div>`
      );

      //let content = calendar.join('');

      //append to DOM div
      //document.querySelector('.calendar').innerHTML = content;
    }
    document.getElementById('loading').style.display = 'none';

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
  // append header for calendar
  wkDays = [];
  for (let i = 0; i < weekdays.length; i++) {
    wkDays.push(`<div 
              class="cell" 
              id="day#${weekdays[i]}" 
              style="color:white; background:#4abf8a">${weekdays[i]}</div>`);
  }
  document
    .querySelector('.calendar')
    .insertAdjacentHTML(
      'afterbegin',
      `<div class="week header">${wkDays.join('')}</div>`
    );

  console.log('Load time: ', (Date.now() - timerStart) / 1000, 'seconds');
};
