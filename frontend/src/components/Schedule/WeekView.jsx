import dayjs from "dayjs";
import React from "react";
import "./WeekView.css";
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const hoursOfDay = Array.from({ length: 24 }, (_, i) =>
  `${i}:00`.padStart(5, "0")
);

// Helper function to calculate event position and height
const calculateEventStyle = (slot, hourHeight = 60) => {
  const startHour = parseInt(slot.start_time.split(":")[0], 10);
  const startMinute = parseInt(slot.start_time.split(":")[1], 10);
  const endHour = parseInt(slot.end_time.split(":")[0], 10);
  const endMinute = parseInt(slot.end_time.split(":")[1], 10);
  const durationHours = endHour - startHour;
  const durationMinutes = endMinute - startMinute;
  const top = startHour * hourHeight + (startMinute / 60) * hourHeight + 39;
  const height =
    durationHours * hourHeight + (durationMinutes / 60) * hourHeight;
  return { top, height };
};

const getServiceColor = (serviceType) => {
  switch (serviceType) {
    case 0:
      return "lightgreen";
    case 1:
      return "lightblue";
    case 2:
      return "lightpink";
    default:
      return "lightgrey";
  }
};

export default function WeekView({ slots }) {
  console.log("WeekView", slots);

  return (
    <div style={{ display: "flex", height: "80vh", overflow: "auto" }}>
      {daysOfWeek.map((day, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            borderRight: "1px solid #ccc",
            minWidth: "140px",
            position: "relative",
            height: "fit-content",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              borderBottom: "1px solid #ccc",
              position: "sticky",
              top: 0,
              background: "white",
              zIndex: 4,
            }}
          >
            <strong>{day}</strong>
          </div>
          {hoursOfDay.map((hour) => (
            <div
              key={hour}
              style={{
                borderBottom: "1px solid #eee",
                padding: "10px",
                fontSize: "14px",
                height: "60px",
                zIndex: 5,
              }}
            >
              {dayjs(hour, "HH:mm").format("h:mm a")}
            </div>
          ))}
          {slots
            .filter((slot) => daysOfWeek[slot.day] === day)
            .map((slot) => {
              const { top, height } = calculateEventStyle(slot);
              return (
                <Slot key={slot.title} slot={slot} top={top} height={height} />
              );
            })}
        </div>
      ))}
    </div>
  );
}

function Slot({ slot, top, height }) {
  const style = {
    position: "absolute",
    top: `${top}px`,
    left: 0,
    right: 0,
    height: `${height}px`,
    background: getServiceColor(slot.service_type_id),
    color: getServiceColor(slot.service_type_id),
    padding: "10px",
    borderRadius: "4px",
    boxSizing: "border-box",
    cursor: "pointer",
    
  };
  return (
    <div key={slot.title} style={style} className="schedule-slot">
      {slot.startTime} - {slot.endTime}
    </div>
  );
}
