import React, { useEffect, useState } from "react";
import { Card, Modal, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import * as dayjs from "dayjs";
import BookingForm from "./BookingForm";
export default function BookingsDetails({ bookings, date, createNewBooking }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slots, setSlots] = useState([]);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    time: "",
    number: "",
    paid: false,
    persons: 1,
  });
  // Fetch slots from the server
  useEffect(() => {
    const fetchSlots = async () => {
      const response = await fetch(
        `/api/slots?date=${dayjs(date).format("d")}`
      );
      const data = await response.json();
      setSlots(data);
    };
    fetchSlots();
  }, [date]);
  console.log("Slots", slots);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Space direction="vertical" className="pl-5 w-[100%]">
      <Card title={dayjs(date).format("dddd, MMM D")}>
        {bookings &&
          bookings.map((booking) => (
            <BookingCard booking={booking} key={booking.id} />
          ))}
        <Button type="default" block onClick={showModal}>
          Add Booking
        </Button>
      </Card>
      <Modal
        title="New Booking"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <BookingForm
          date={date}
          form={bookingForm}
          setForm={setBookingForm}
          handleSubmit={handleSubmit}
          slots={slots}
        />
      </Modal>
    </Space>
  );
}

function BookingCard({ booking }) {
  return (
    <Card
      type="inner"
      title={booking.name}
      key={booking.id}
      extra={<EditOutlined className="cursor-pointer hover:text-blue-500" />}
    >
      <p>{booking.time}</p>
      <p>{booking.notes}</p>
    </Card>
  );
}
