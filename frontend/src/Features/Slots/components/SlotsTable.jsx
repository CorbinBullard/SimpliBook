import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, Modal, Popconfirm, Space, Table, Tree } from "antd";
import dayjs from "dayjs";
import { daysOfWeek } from "../../../utils/constants";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import SlotForm from "./SlotForm";
import { useFetchData } from "../../../utils/FetchData";
import { checkTimeConflict } from "../../../utils/utilFunctions";
import moment from "moment";

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
  }, [service.id]);

  const treeData = useMemo(
    () =>
      daysOfWeek.map((day, index) => {
        return {
          value: index,
          key: `day-${index}`,
          title: day,
          selectable: false,
          children: [
            ...slots
              .filter((slot) => slot.day === index)
              .map((slot) => {
                return {
                  slot_id: slot.id,
                  selectable: true,
                  value: slot.id,
                  icon: <ClockCircleOutlined />,
                  title: (
                    <>
                      <Popconfirm
                        title="Are you sure to delete this slot?"
                        onConfirm={() => handleDelete(slot.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        {dayjs(slot.start_time, "HH:mm:ss").format("h:mm a")}{" "}
                      </Popconfirm>
                    </>
                  ),
                  time: slot.start_time,
                  day: index,
                  key: slot.id,
                };
              }),
            {
              title: "Add Slot",
              icon: <PlusCircleOutlined />,
              key: `add-${index}`,
              day: index,
            },
          ],
        };
      }),
    [daysOfWeek, slots]
  );

  const handleSelect = (selectedKeys, info) => {
    const node = info.node;
    if (node.slot_id) {
    } else {
      setSelectedNodes(selectedKeys);
      setData({
        ...data,
        day: node.day,
      });
      setIsModalOpen(true);
    }
  };
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const newSlot = {
          ...values,
          service_type_id: service.id,
          start_time: dayjs(values.start_time).format("HH:mm:ss"),
          end_time: dayjs(values.start_time, "HH:mm:ss")
            .add(service.duration, "minute")
            .format("HH:mm:ss"),
        };
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
            setSelectedNodes([]);
          });
      })
      .catch((error) => {
        return;
      });

    return;
  };
  const handleDelete = (id) => {
    fetch(`/api/slots/${id}`, { method: "DELETE" }).then(() => {
      setSlots(slots.filter((slot) => slot.id !== id));
    });
  };

  const handleCancel = () => {
    setSelectedNodes([]);
    setIsModalOpen(false);
  };

  return (
    <>
      <Tree
        selectedKeys={selectedNodes}
        style={{ width: "100%" }}
        showIcon
        onSelect={handleSelect}
        treeData={[
          {
            key: "Schedule",
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
          days={daysOfWeek}
          data={data}
          slots={slots.filter((slot) => slot.day === data.day)}
          duration={service.duration}
        />
      </Modal>
    </>
  );
}
