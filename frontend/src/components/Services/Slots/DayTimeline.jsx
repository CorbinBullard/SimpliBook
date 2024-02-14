import { Card, Col, Divider, Row } from "antd";
import dayjs from "dayjs";
import React from "react";

export default function DayTimeline({ slots, day }) {
  return (
    <Card title={day} className="w-56">
      <Timeline slots={slots} />
    </Card>
  );
}

function Timeline({ slots }) {
  // Create a list of times from 12:00 AM to 12:00 PM
  function calculateOffset(time) {
    const [hour, minute] = time.split(":");
    const hours = parseInt(hour);
    const minutes = parseInt(minute);
    return `${(hours * 60 + minutes) / 1.53}px`;
  }
  function calculateHeight(start, end) {
    const [startHour, startMinute] = start.split(":");
    const [endHour, endMinute] = end.split(":");
    const startMinutes = parseInt(startHour) * 60 + parseInt(startMinute);
    const endMinutes = parseInt(endHour) * 60 + parseInt(endMinute);
    console.log("Start", startMinutes, "End", endMinutes, "Diff", endMinutes - startMinutes)
    return `${(endMinutes - startMinutes) / 12.6}px`
  }

  const times = [
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  return (
    <div className="relative">
      <Row className="bg-blue-100 absolute h-[99%] w-20 right-0">
        {slots.map((slot) => (
          <Col
            className="w-20 bg-blue-300 absolute right-0 rounded-sm"
            style={{
              top: `${calculateOffset(slot.start_time)}`,
              height: `${calculateHeight(slot.start_time, slot.end_time)}`,
            }}
          ></Col>
        ))}
      </Row>
      {times.map((time) => (
        <Divider key={time} className="" orientation="left" plain>
          {time}
        </Divider>
      ))}
      
    </div>
  );
}
