import React, { useEffect, useReducer, useState } from "react";
import { Calendar, Badge } from "antd";
import { list } from "postcss";
import * as dayjs from "dayjs";
export default function CalendarComponent({ bookings, setDate }) {
  const onPanelChange = (value, mode) => {

  };
  const onSelect = (value) => {
    setDate(value.format("YYYY-MM-DD"));
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
  const monthCellRender = (value) => {
    const num = getListData(value).length;
    return num ? (
      <div className="notes-month">
        <section>{num} Bookings</section>
      </div>
    ) : null;
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <Calendar
    style={{minWidth: "600px"}}
      onSelect={onSelect}
      onPanelChange={onPanelChange}
      cellRender={cellRender}
      // mode="month" // Year will error right now
    />
  );
}
