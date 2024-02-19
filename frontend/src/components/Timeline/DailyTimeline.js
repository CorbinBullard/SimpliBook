import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import "./WeekView.css";
import { daysOfWeek } from "../../utils/constants";
import { Button, Card, Drawer } from "antd";
import BookingCard from "../Bookings/BookingCard";
import BookingForm from "../Bookings/BookingForm";
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

export default function DayTimeLine({ slots, day, i, date }) {
  return (
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
        <strong>{`${day}${
          date ? ", " + dayjs(date).format("MMM d - YYYY") : ""
        } `}</strong>
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
      {slots?.length &&
        slots
          .filter((slot) => daysOfWeek[slot.day] === day)
          .map((slot) => {
            console.log("Current Slot ", slot);
            const { top, height } = calculateEventStyle(slot);
            return (
              <ScheduleSlot
                key={slot.title}
                slot={slot}
                top={top}
                height={height}
                bookings={slot.Bookings}
                date={date}
              />
            );
          })}
    </div>
  );
}

// need a way to determine if this is availability view or calendar view
export function ScheduleSlot({ slot, top, height, bookings, date, view }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [childDrawerOpen, setChildDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    if (view === "availability") return;
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleChildDrawerOpen = () => {
    setChildDrawerOpen(true);
  };
  const style = {
    position: "absolute",
    top: `${top}px`,
    left: 0,
    right: 0,
    height: `${height}px`,
    background: getServiceColor(slot.service_type_id),
    color: "black",
    padding: "10px",
    borderRadius: "4px",
    boxSizing: "border-box",
    cursor: "pointer",
    textAlign: "center",
  };

  return (
    <>
      <div
        key={slot.title}
        style={style}
        className="schedule-slot"
        onClick={handleDrawerOpen}
      >
        {bookings.length ? `Bookings: ${bookings.length}` : ""}
      </div>
      <Drawer open={drawerOpen} onClose={handleDrawerClose} placement="left">
        <Card
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            marginBottom: "1rem",
          }}
          title={
            <p>
              {dayjs(slot.start_time, "HH:mm:ss").format("h:mm a")} -{" "}
              {dayjs(slot.end_time, "HH:mm:ss").format("h:mm a")}
              {}
            </p>
          }
        >
          {bookings.map((booking) => (
            <BookingCard booking={booking} key={booking.id} />
          ))}
        </Card>
        <Button block onClick={handleChildDrawerOpen}>
          {" "}
          Add Booking
        </Button>
        {/* ADD BOOKING 2nd DRAWER */}
        <Drawer
          open={childDrawerOpen}
          onClose={() => setChildDrawerOpen(false)}
          placement="left"
        >
          <BookingForm slot={slot} date={date} />
        </Drawer>
      </Drawer>
    </>
  );
}
