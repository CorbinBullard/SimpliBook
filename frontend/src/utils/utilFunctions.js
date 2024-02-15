import dayjs from "dayjs";

// Capitolize the first letter of a string
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const convertToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours > 10 ? hours : "0" + hours}:${mins > 10 ? mins : "0" + mins}`;
};
export const convertToMinutes = (time) => {
  const [hours, minutes] = time.split(":");
  return parseInt(hours) * 60 + parseInt(minutes);
};

export function checkTimeConflict(start_time, end_time, timeSlotsArray) {
  console.log("times: ", start_time, end_time);
  const [start, end] = [
    +dayjs(start_time, "HH:mm:ss").format("HHmm"),
    +dayjs(end_time, "HH:mm:ss").format("HHmm"),
  ];
  console.log("TIMES ", start, end);
  for (const slot of timeSlotsArray) {
    const { start_time, end_time } = slot;
    const slotStart = +dayjs(start_time, "HH:mm:ss").format("HHmm");
    const slotEnd = +dayjs(end_time, "HH:mm:ss").format("HHmm");
    console.log("SLOT: ", slotStart, slotEnd, "\nNew Slot : ", start, end);

    if (start < slotEnd && slotStart < end) {
      return true;
    }
  }
  console.log("NO CONFLICT: RETURN FALSE");

  return false;
}
