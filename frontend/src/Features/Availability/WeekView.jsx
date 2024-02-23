import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { daysOfWeek } from "../../utils/constants";
import { Drawer } from "antd";
import DailyTimeLine from "../../components/UI/Timeline/DailyTimeline";
import SlotBlock from "../Slots/components/SlotBlock";
const hoursOfDay = Array.from({ length: 24 }, (_, i) =>
  `${i}:00`.padStart(5, "0")
);

export default function WeekView({ slots }) {
  return (
    <div style={{ display: "flex", height: "80vh", overflow: "auto" }}>
      {daysOfWeek.map((day, i) => (
        <DailyTimeLine key={i} slots={slots} day={day} Block={SlotBlock} />
      ))}
    </div>
  );
}
