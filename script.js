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

//this function will find today's date
function calendar() {
  let d = new Date(2018, 3, 1);
  setText('calendar-day', day[d.getDay()]);
  setText('calendar-date', d.getDate());
  setText(
    'calendar-month-year',
    month[d.getMonth()] + ', ' + (1900 + d.getYear())
  );
}

//this function will set the text value of tags;
function setText(id, val) {
  if (val < 10) {
    val = '0' + val; //add leading 0 if val < 10
  }
  document.getElementById(id).innerHTML = val;
}

//call calendar() when page load
window.onload = calendar;
