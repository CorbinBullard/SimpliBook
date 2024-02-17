import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { daysOfWeek } from "../../utils/constants";
import { Drawer } from "antd";
import DayTimeLine from "../Timeline/DailyTimeline";
const hoursOfDay = Array.from({ length: 24 }, (_, i) =>
  `${i}:00`.padStart(5, "0")
);

export default function WeekView({ slots }) {
  console.log("WeekView", slots);

  return (
    <div style={{ display: "flex", height: "80vh", overflow: "auto" }}>
      {daysOfWeek.map((day, i) => (
        <DayTimeLine key={i} slots={slots} day={day} i={i} />
      ))}
    </div>
  );
}
