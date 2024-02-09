const bookingCheck = (date, slot) => {
  const bookingDate = new Date(date);
  const today = new Date();
  const info = {};
  if (bookingDate < today) {
    return false;
  }

  const day = bookingDate.getDay();
  const start_time = bookingDate.toTimeString().split(" ")[0];

  if (day !== slot.day) return false;
  else info.day = day;

  if (start_time !== slot.start_time) return false;
  else info.start_time = start_time;

  return info;
};

module.exports = { bookingCheck };
