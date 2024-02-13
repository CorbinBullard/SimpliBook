import { Space, Table } from "antd";
import React from "react";
import DayTimeline from "./DayTimeline";

export default function SlotsTable({ slots }) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <Space className="flex justify-between pt-5">
      {days.map((day, index) => (
        <DayTimeline day={day} slots={slots} />
      ))}
    </Space>
  );
}
