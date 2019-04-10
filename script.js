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

let d = new Date(2019, 3, 10);
let y = d.getFullYear();
let m = d.getMonth();
let firstInYear = new Date(y, 0, 1);
let currentDate = d.getCurrentDate();
let firstMDay = new Date(y, m, 1);
let lastMDay = new Date(y, m + 1, 0);
//console.log(firstInYear);

// function getMonday(d) {
//   d = new Date(d);
//   var day = d.getDay(),
//     diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
//   return new Date(d.setDate(diff));
// }
function getMonday(date) {
  var day = date.getDay() || 7; // Get current day number, converting Sun. to 7
  // Only manipulate the date if it isn't Mon.
  if (day !== 1) date.setHours(-24 * (day - 1)); // Set the hours to day number minus 1
  return date; // will be Monday
}
console.log(getMonday(d));

//this function will set the text value of tags;
function setText(id, val) {
  if (val < 10) val = '0' + val; //add leading 0 if val < 10
  document.getElementById(id).innerHTML = val;
}

const wCal = {
  //this function will find today's date
  calendar() {
    setText('weeknum', 'weeknum: ' + d.getWeekNumber());
    setText('weekday', 'weekday: ' + weekdays[d.getDay()]);
    setText('day', 'day: ' + d.getDate());
    setText('full-date', 'fulldate: ' + currentDate);
    setText('month', 'month: ' + months[d.getMonth()]);
    setText('year', 'year: ' + (1900 + d.getYear()));
  }
};

let week = document.createElement('div');
week.className = 'week';

let wkmon = d.getDate(getMonday(d));
// Create the inner div before appending to the body
for (let i = 0; i < weekdays.length; i++) {
  let day = document.createElement('div');
  day.className = 'day';
  day.id = `${wkmon + i}`;
  day.innerHTML = wkmon + i;
  // The variable week is still good... Just append to it.
  week.appendChild(day);
}

window.onload = function() {
  //call calendar() when page load
  wCal.calendar();
  // Then append the whole thing onto the body
  document.getElementsByClassName('calendar')[0].appendChild(week);
};
