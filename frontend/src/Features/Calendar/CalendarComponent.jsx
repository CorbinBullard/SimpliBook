import React, { useEffect, useReducer, useState } from "react";
import { Badge } from "antd";
import { list } from "postcss";
import * as dayjs from "dayjs";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useFetchData } from "../../utils/FetchData";

const localizer = momentLocalizer(moment);

export default function CalendarComponent({ bookings, onClick }) {
  const [formattedBookings, setFormattedBookings] = useState([]);
  useEffect(() => {
    setFormattedBookings(Object.values(bookings));
  }, [bookings]);

  return (
    <Calendar
      localizer={localizer}
      events={formattedBookings}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100%", marginRight: "1rem", overflow: "auto" }}
      onSelectEvent={onClick}
      defaultView="week"
    />
  );
}
