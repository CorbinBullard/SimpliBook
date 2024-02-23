import React, { useEffect, useReducer, useState } from "react";
import { Badge } from "antd";
import { list } from "postcss";
import * as dayjs from "dayjs";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useFetchData } from "../../../utils/FetchData";

const localizer = momentLocalizer(moment);

export default function CalendarComponent({ bookings, onClick }) {
  return (
    <Calendar
      localizer={localizer}
      events={bookings}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100%", marginRight: "1rem", overflow: "auto" }}
      onSelectEvent={onClick}
      defaultView="week"
    />
  );
}
