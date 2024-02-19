import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Space, Table, Tree } from "antd";
import dayjs from "dayjs";
// import DayTimeline from "../DayTimeline";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import SlotForm from "./SlotForm";
import { useFetchData } from "../../utils/FetchData";
import { checkTimeConflict } from "../../utils/utilFunctions";

export default function SlotsTable({ service }) {
  const [slots, setSlots] = useState([]);
  const [data, setData] = useState({ service_type_id: service.id });
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchSlots = async () => {
      const response = await fetch(`/api/services/${service.id}/slots`);
      const data = await response.json();
      setSlots(data);
    };
    fetchSlots();
  }, []);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const treeData = days.map((day, index) => {
    return {
      value: index,
      title: day,
      selectable: false,
      children: [
        ...slots
          .filter((slot) => slot.day === index)
          .map((slot) => {
            return {
              selectable: false,
              value: slot.id,
              icon: <ClockCircleOutlined />,
              title: dayjs(`2024-03-12T${slot.start_time}`).format("h:mm a"),
            };
          }),
        {
          title: "Add Slot",
          icon: <PlusCircleOutlined />,
          key: index,
        },
      ],
    };
  });
  const handleSelect = (selectedKeys, info) => {
    setSelectedNodes(selectedKeys);
    setData({ ...data, day: info.node.key });
    setIsModalOpen(true);
  };
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Values", values);
        const newSlot = {
          ...values,
          service_type_id: service.id,
          start_time: dayjs(values.start_time).format("HH:mm:ss"),
          end_time: dayjs(values.start_time, "HH:mm:ss")
            .add(service.duration, "minute")
            .format("HH:mm:ss"),
        };
        console.log("New Slot", newSlot);
        fetch(`/api/services/${service.id}/slots`, {
          method: "POST",
          body: JSON.stringify(newSlot),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            setSlots([...slots, data]);
            form.resetFields();
            setIsModalOpen(false);
          });
      })
      .catch((error) => {
        return;
      });

    return;
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tree
        // selectable={false}
        style={{ width: "100%" }}
        showIcon
        onSelect={handleSelect}
        treeData={[
          {
            selectable: false,
            title: "Schedule",
            value: "",
            icon: <CalendarOutlined />,
            children: treeData,
          },
        ]}
      />

      <Modal
        title="New Slot"
        selectedNodes={selectedNodes}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="Create Slot"
        okType="primary"
      >
        <SlotForm
          form={form}
          days={days}
          data={data}
          slots={slots.filter((slot) => slot.day === data.day)}
          duration={service.duration}
        />
      </Modal>
    </>
  );
}
