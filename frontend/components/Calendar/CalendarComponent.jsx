import React, { useEffect, useReducer, useState } from "react";
import { Calendar, Badge } from "antd";
import { list } from "postcss";
import * as dayjs from "dayjs";
export default function CalendarComponent() {
  const [date, setDate] = useState(null);
  const [bookings, setBookings] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      const bookingsObj = {};
      console.log(data);
      data.bookings.forEach((booking) => {
        booking.time = dayjs(booking.date).format("h:mm a");
        const date = dayjs(bookings.date).format("YYYY-MM-DD");
        if (bookingsObj[date]) {
          bookingsObj[date].push(booking);
        } else {
          bookingsObj[date] = [booking];
        }
      });
      setBookings(bookingsObj);
    };
    fetchData();
  }, []);

  const onPanelChange = (value, mode) => {
    // console.log(value.format("YYYY-MM-DD"), mode);
  };
  console.log("BOOKINGS: ", bookings);
  const onSelect = (value) => {
    // console.log(value.format("YYYY-MM-DD"));
    setDate(value.format("YYYY-MM-DD"));
    // console.log(date);
  };

  const getListData = (value) => {
    let listData;
    if (bookings[value.format("YYYY-MM-DD")]) {
      listData = bookings[value.format("YYYY-MM-DD")]
        .map((booking) => {
          return {
            content: `${booking.time}, ${booking.name}`,
            type: "success",
          };
        })
        .sort((a, b) => a.start_time - b.start_time);
    }
    return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    // console.log("CELL RENDER",info)
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <Calendar
      onSelect={onSelect}
      onPanelChange={onPanelChange}
      cellRender={cellRender}
      mode="month" // Year will error right now
    />
  );
}
