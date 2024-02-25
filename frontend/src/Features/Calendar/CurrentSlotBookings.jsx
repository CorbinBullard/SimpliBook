import React, { useEffect, useMemo, useState } from "react";
import { Card, Collapse, Form, Modal, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import * as dayjs from "dayjs";
import { useFetchData } from "../../utils/FetchData";
import DailyTimeLine from "../../components/UI/Timeline/DailyTimeline";
import BookingBlock from "../Bookings/components/BookingBlock";
import BookingCard from "../Bookings/components/BookingCard";
import BookingForm from "../Bookings/components/BookingForm";
const { Panel } = Collapse;

export default function CurrentSlotBookings({
  slot,
  date,
  bookings,
  createNewBooking,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  console.log(slot);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const newBooking = {
          ...values,
          date: dayjs(slot.start).format("YYYY-MM-DDTHH:mm:ss"),
        };
        console.log(newBooking);
        // return
        fetch(`/api/slots/${slot.slot_id}/bookings`, {
          method: "POST",
          body: JSON.stringify(newBooking),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            setIsModalOpen(false);
            form.resetFields();
            createNewBooking(data);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  return (
    <>
      <Card
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          marginBottom: "1rem",
          overflowY: "auto",
        }}
        title={dayjs(slot.start).format("ddd, MMM D @ h:mm a")}
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
        title={`New Booking for ${dayjs(date).format("dddd, MMM D")} @ ${dayjs(
          slot.start_time,
          "HH:mm:ss"
        ).format("h:mm a")}`}
        okText="Create Booking"
        onOk={handleSubmit}
      >
        <BookingForm
          form={form}
          slot={slot}
          date={date}
          data={{ date, time: dayjs(slot.start).format("HH:mm:ss")}}
        />
      </Modal>
    </>
  );
}
