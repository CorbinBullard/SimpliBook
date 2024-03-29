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
  const [start, end] = [
    +dayjs(start_time, "HH:mm:ss").format("HHmm"),
    +dayjs(end_time, "HH:mm:ss").format("HHmm"),
  ];
  for (const slot of timeSlotsArray) {
    const { start_time, end_time } = slot;
    const slotStart = +dayjs(start_time, "HH:mm:ss").format("HHmm");
    const slotEnd = +dayjs(end_time, "HH:mm:ss").format("HHmm");

    if (start < slotEnd && slotStart < end) {
      return true;
    }
  }
  return false;
}

export function deepCopy(obj) {
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  const target = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    let value = obj[key];
    if (value && typeof value === "object") {
      target[key] = deepCopy(value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

export function generateSecureKey(length) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}
