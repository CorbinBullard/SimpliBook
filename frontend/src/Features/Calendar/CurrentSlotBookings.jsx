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
import { BookingsReducer, actionTypes } from "../Bookings/BookingsReducer";
const { Panel } = Collapse;

export default function CurrentSlotBookings({
  slot,
  date,
  bookings,
  handleDelete,
  handleUpdate,
  handleBookingOperation,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const newBooking = {
          slot_id: slot.slot_id,
          ...values,
          date: dayjs(slot.start).format("YYYY-MM-DDTHH:mm:ss"),
        };
        // return
        fetch(`/api/slots/${slot.slot_id}/bookings`, {
          method: "POST",
          body: JSON.stringify(newBooking),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            form.resetFields();
            setIsModalOpen(false);
            handleBookingOperation(data, actionTypes.CREATE_BOOKING);
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
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {bookings &&
            bookings.map((booking) => (
              <BookingCard
                booking={booking}
                key={booking.id}
                handleDelete={() =>
                  handleBookingOperation(booking.id, actionTypes.DELETE_BOOKING)
                }
                update={(booking) =>
                  handleBookingOperation(booking, actionTypes.UPDATE_BOOKING)
                }
              />
            ))}
        </div>
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
          data={{ date, time: dayjs(slot.start).format("HH:mm:ss") }}
        />
      </Modal>
    </>
  );
}
