import React, { useRef } from "react";
import { SimpliBookKeys } from "../utils/constants";
import { Button } from "antd";
import Calendar from "simplibook-external-calendar";
export default function ExternalTestPage() {
  const childRef = useRef();

  const testExternalCalendar = () => {
    childRef.current.handleSubmitBooking({
      name: "newName",
      number: "555",
      email: "email",
      slot_id: 1,
      date: "2024-03-04T12:00:00",
      persons: 2,
    });
  };
  const keys = {
    public_key: SimpliBookKeys.public_key,
    private_key: SimpliBookKeys.private_key,
  };
  const handleSelectBooking = (booking) => {
    console.log(booking);
  };

  return (
    <div>
      <Calendar
        ref={childRef}
        keys={keys}
        selectBooking={handleSelectBooking}
      />
      <Button onClick={testExternalCalendar}>Test</Button>
    </div>
  );
}
