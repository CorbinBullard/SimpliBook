import { Card } from "antd";
import React from "react";

export default function BookingCard({ booking }) {
  return (
    <Card type="inner" key={booking.id} title={booking.name}>
      <p>Email: {booking.email}</p>
      <p>Phone: {booking.number}</p>
      <p>Persons: {booking.persons}</p>
      <p>{booking.paid ? "Paid" : "Not Paid"}</p>
    </Card>
  );
}
