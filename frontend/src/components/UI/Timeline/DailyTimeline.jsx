import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import "./WeekView.css";
import { daysOfWeek } from "../../../utils/constants";
import { Button, Card, Divider, Drawer, Form, Modal } from "antd";
import BookingCard from "../../../Features/Bookings/components/BookingCard";
import BookingForm from "../../../Features/Bookings/components/BookingForm";
import {
  BookingsReducer,
  actionTypes,
} from "../../../Features/Bookings/BookingsReducer";
import TimelineBlock from "./TimelineBlock";
import BookingBlock from "../../../Features/Bookings/components/BookingBlock";
const hoursOfDay = Array.from({ length: 24 }, (_, i) =>
  `${i}:00`.padStart(5, "0")
);
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

export default function DailyTimeLine({
  slots,
  day,
  date,
  createBooking,
  Block,
}) {
  return (
    <div
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
        <strong>{`${day}${
          date ? ", " + dayjs(date).format("MMM d - YYYY") : ""
        } `}</strong>
      </div>
      {hoursOfDay.map((hour) => (
        <>
          <Divider
            style={{ padding: 0, margin: 0, height: 0 }}
            orientation="left"
            orientationMargin={5}
          >
            {dayjs(hour, "HH:mm").format("h:mm a")}
          </Divider>
          <div
            style={{
              padding: "10px",
              fontSize: "14px",
              height: "60px",
              zIndex: 5,
            }}
          ></div>
        </>
      ))}
      {slots?.length &&
        slots
          .filter((slot) => daysOfWeek[slot.day] === day)
          .map((slot) => {
            const { top, height } = calculateEventStyle(slot);
            return (
              <Block
                key={slot.title}
                slot={slot}
                top={top}
                height={height}
                bookings={slot.Bookings || []}
                date={date}
                createBooking={createBooking}
              />
            );
          })}
    </div>
  );
}
