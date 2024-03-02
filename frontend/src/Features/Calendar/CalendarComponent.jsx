import React, { useEffect, useMemo, useReducer, useState } from "react";
import { Badge } from "antd";
import { list } from "postcss";
import * as dayjs from "dayjs";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import moment from "moment";
import { useFetchData } from "../../utils/FetchData";
import "./Calendar.css";
import timezone from "dayjs/plugin/timezone";
import CalendarToolbar from "./components/CalendarToolbar";

dayjs.extend(timezone);

const localizer = dayjsLocalizer(dayjs);

export default function CalendarComponent({ bookings, onClick }) {
  const formattedBookings = useMemo(() => {
    const bookingsArray = Object.groupBy(
      Object.values(bookings),
      (booking) => booking.date
    );
    // change bookingsArray to an array of objects that have a nested array of bookings that have the same date and time
    return Object.entries(bookingsArray).map(([date, bookings]) => {
      return {
        slot_id: bookings[0].slot_id,
        start: new Date(date),
        end: new Date(bookings[0].end_time),
        title: (
          <Badge
            size="small"
            count={bookings.length}
            style={{ backgroundColor: "#52c41a" }}
          />
        ),
        bookings,
      };
    });
  }, [bookings]);

  return (
    <Calendar
      localizer={localizer}
      events={formattedBookings}
      startAccessor="start"
      endAccessor="end"
      style={{
        height: "100%",
        marginRight: "1rem",
        overflow: "auto",
        backgroundColor: "white",
      }}
      onSelectEvent={onClick}
      defaultView="week"
      views={["week", "month", "day"]}
      components={{ toolbar: (props) => <CalendarToolbar {...props} /> }}
    />
  );
}
