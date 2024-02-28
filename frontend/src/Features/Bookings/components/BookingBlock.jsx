import React, { useState } from "react";
import TimelineBlock from "../../../components/UI/Timeline/TimelineBlock";
import dayjs from "dayjs";
import { Button, Card, Drawer, Form, Modal } from "antd";
import BookingCard from "./BookingCard";
import BookingForm from "./BookingForm";

export default function BookingBlock({
  date,
  slot,
  createBooking,
  bookings,
  top,
  height,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleDrawerOpen = (e) => {
    e.stopPropagation();
    setDrawerOpen(true);
  };
  const handleDrawerClose = (e) => {
    e.stopPropagation();
    setDrawerOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const newBooking = {
          ...values,
          date: `${dayjs(date).format("YYYY-MM-DD")}T${slot.start_time}`,
        };
        fetch(`/api/slots/${slot.id}/bookings`, {
          method: "POST",
          body: JSON.stringify(newBooking),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            setIsModalOpen(false);
            setDrawerOpen(false);
            form.resetFields();
            createBooking(data);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  return (
    <TimelineBlock
      top={top}
      height={height}
      color={"blue"}
      onClick={handleDrawerOpen}
    >

      <Drawer open={drawerOpen} onClose={handleDrawerClose} placement="left">
        <Card
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            marginBottom: "1rem",
            overflowY: "auto",
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
        <Button block onClick={handleOpenModal}>
          {" "}
          Add Booking
        </Button>
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          title={`New Booking for ${dayjs(date).format(
            "dddd, MMM D"
          )} @ ${dayjs(slot.start_time, "HH:mm:ss").format("h:mm a")}`}
          okText="Create Booking"
          onOk={handleSubmit}
        >
          <BookingForm
            form={form}
            slot={slot}
            date={date}
            data={{ date, time: slot.start_time }}
          />
        </Modal>
      </Drawer>
    </TimelineBlock>
  );
}
