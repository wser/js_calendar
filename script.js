const localeStr = 'sv-SE';
const day = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const month = [
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

Date.prototype.getCurrentDate = function() {
  // Returns date in the format yyyy-mm-dd
  return d.toLocaleDateString(localeStr);
};

Date.prototype.getWeekNumber = function() {
  let d = new Date(
    Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())
  );
  let dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

let d_firstInYear = new Date(/*new Date().getFullYear()*/ 2016, 0, 1);
let d = new Date(2019, 4, 15);
let y = d.getFullYear();
let m = d.getMonth();
let currentDate = d.getCurrentDate();
let firstMDay = new Date(y, m, 1);
let lastMDay = new Date(y, m + 1, 0);
console.log(lastMDay);

//this function will set the text value of tags;
function setText(id, val) {
  if (val < 10) val = '0' + val; //add leading 0 if val < 10
  document.getElementById(id).innerHTML = val;
}

const wCal = {
  //this function will find today's date
  calendar() {
    setText('weeknum', 'weeknum: ' + d.getWeekNumber());
    setText('weekday', 'weekday: ' + day[d.getDay()]);
    setText('day', 'day: ' + d.getDate());
    setText('full-date', 'fulldate: ' + currentDate);
    setText('month', 'month: ' + month[d.getMonth()]);
    setText('year', 'year: ' + (1900 + d.getYear()));
  }
};

let week = document.createElement('div');
week.className = 'week';

// Create the inner div before appending to the body
for (let i = 0; i < day.length; i++) {
  let day = document.createElement('div');
  day.className = 'day';
  day.id = `${i}`;
  day.innerHTML = i;
  // The variable week is still good... Just append to it.
  week.appendChild(day);
}

window.onload = function() {
  //call calendar() when page load
  wCal.calendar();
  // Then append the whole thing onto the body
  document.getElementsByClassName('calendar')[0].appendChild(week);
};
