export function formatDay(dateString) {
  const date = new Date(dateString);

  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = {
    weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
    day: date.getDate(),
    month: date.toLocaleDateString('en-US', { month: 'long' }),
    dayName: getDayName(date),
  };

  return formattedDate;
}

function getDayName(date) {
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayIndex = date.getDay();
  return dayNames[dayIndex];
}

export function isSelected(source, day) {
  // Implement the logic to check if the day is selected.
  return false;
}
