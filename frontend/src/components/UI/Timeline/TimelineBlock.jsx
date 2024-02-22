import React, { useState } from "react";
import { Card, Drawer, Button, Modal, Form } from "antd";
import dayjs from "dayjs";
import BookingCard from "../../../Features/Bookings/components/BookingCard";
import BookingForm from "../../../Features/Bookings/components/BookingForm";

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

export default function TimelineBlock({
  children,
  top,
  height,
  color,
  onClick,
}) {
  const style = {
    position: "absolute",
    top: `${top}px`,
    left: 0,
    right: 0,
    height: `${height}px`,
    background: color,
    color: "black",
    padding: "10px",
    // borderRadius: "4px",
    boxSizing: "border-box",
    cursor: "pointer",
    textAlign: "center",
  };

  return (
    <div style={style} className="schedule-slot" onClick={onClick}>
      {children}
    </div>
  );
}
