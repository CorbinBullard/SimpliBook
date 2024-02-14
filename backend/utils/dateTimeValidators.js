const validateTime = (req, res, next) => {
  const { start_time, end_time } = req.body;
  const start = new Date(`01/01/2000 ${start_time}`);
  const end = new Date(`01/01/2000 ${end_time}`);
  if (start >= end) {
    const err = new Error("End time must be after start time");
    err.status = 400;
    next(err);
  }
  if (isValidDate(start) && isValidDate(end)) return next();
  const err = new Error("Invalid time");
  next(err);
};
function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}
module.exports = { validateTime };
