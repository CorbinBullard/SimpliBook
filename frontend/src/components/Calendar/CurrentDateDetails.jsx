import React, { useEffect, useMemo, useState } from "react";
import { Card, Collapse, Form, Modal, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import * as dayjs from "dayjs";
import BookingForm from "./Bookings/BookingForm";
import { useFetchData } from "../../utils/FetchData";
import DayTimeline from "../Services/Slots/DayTimeline";
const { Panel } = Collapse;
export default function CurrentDateDetails({ date }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [slots, setSlots] = useState([]);
  const [slotsObj, setSlotsObj] = useState({});
  const [form] = Form.useForm();

  const fetchedBookings = useFetchData(`/api/bookings/${date}/date`);
  const slots = useFetchData(`/api/slots?date=${dayjs(date).format("d")}`);
  console.log("Fetched Slots", date);
  const bookings = useMemo(() => {
    console.log("HEREEEEE");
    if (!fetchedBookings) return {};

    const obj = {};

    fetchedBookings.forEach((booking, i) => {
      const serviceName = booking.Slot.ServiceType.name;
      const startTime = booking.Slot.start_time;

      if (!obj[serviceName]) {
        obj[serviceName] = {};
      }

      if (!obj[serviceName][startTime]) {
        obj[serviceName][startTime] = [];
      }

      obj[serviceName][startTime].push(booking);
    });


    return obj;
  }, [fetchedBookings]);

  console.log(bookings);

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
    <Space direction="vertical" style={{ width: "100%" }}>
      {slots && <DayTimeline date={date} slots={slots} bookings={bookings} />}
      {/* <Modal
        title="New Booking"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="Create Booking"
        okType="primary"
      >
        <BookingForm form={form} slots={slots} />
      </Modal> */}
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
