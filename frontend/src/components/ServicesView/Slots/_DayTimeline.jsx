import { Card } from "antd";
import dayjs from "dayjs";
import React from "react";
import "./DayTimeline.css"; // Assuming you'll create a CSS file for additional styles.

export default function DayTimeline({ slots, date }) {
  console.log("Slots", slots);
  console.log("Day", date);
  return (
    <Card title={dayjs(date).format("DD MMM YYYY")} className="day-timeline-card">
      <Timeline slots={slots} />
    </Card>
  );
}

function Timeline({ slots }) {
  const calculateOffset = (time) => {
    const [hour, minute] = time.split(":");
    const minutesFromMidnight = parseInt(hour) * 60 + parseInt(minute);
    // Assuming each hour block is 60px high, calculate offset from the top of the timeline
    return `${(minutesFromMidnight / 60) * 60}px`;
  };

  const calculateHeight = (start, end) => {
    const [startHour, startMinute] = start.split(":");
    const [endHour, endMinute] = end.split(":");
    const startMinutes = parseInt(startHour) * 60 + parseInt(startMinute);
    const endMinutes = parseInt(endHour) * 60 + parseInt(endMinute);
    // Assuming each hour block is 60px high, calculate height of the slot
    return `${((endMinutes - startMinutes) / 60) * 60}px`;
  };

  return (
    <div className="timeline-container">
      {slots.map((slot, index) => (
        <div
          key={index}
          className="slot"
          style={{
            top: calculateOffset(slot.start_time),
            height: calculateHeight(slot.start_time, slot.end_time),
          }}
        >
          {`${dayjs(slot.start_time, "HH:mm:ss").format("h:mm a")} - ${dayjs(slot.end_time, "HH:mm:ss").format("h:mm a")}`}
        </div>
      ))}
      <div className="time-labels">
        {Array.from({ length: 24 }).map((_, index) => (
          <div key={index} className="time-label">{`${index % 12 || 12}${
            index < 12 ? "AM" : "PM"
          }`}</div>
        ))}
      </div>
    </div>
  );
}
