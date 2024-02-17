import React, { useEffect, useMemo, useState } from "react";
import { Card, Collapse, Form, Modal, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import * as dayjs from "dayjs";
import BookingForm from "./Bookings/BookingForm";
import { useFetchData } from "../../utils/FetchData";
import  DayTimeLine  from "../Timeline/DailyTimeline";
const { Panel } = Collapse;
export default function CurrentDateDetails({ date }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [slots, setSlots] = useState([]);
  const [form] = Form.useForm();

  const slots = useFetchData(`/api/slots?date=${date}`);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log(slots);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
        <div style={{ display: "flex", height: "80vh", overflow: "auto" }}>
          {slots && (
            <DayTimeLine
              slots={slots}
              day={dayjs(date).format("dddd")}
              date={date}
            />
          )}
        </div>
    </Space>
  );
}
