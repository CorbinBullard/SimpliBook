import { Button, Card, Col, Form } from "antd";
import React, { useState } from "react";
import {
  capitalize,
  convertToMinutes,
  convertToTime,
} from "../../utils/utilFunctions";
import { EditOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Divider, Popconfirm } from "antd";
import ServiceForm from "./ServiceForm";
import dayjs from "dayjs";
import moment from "moment/moment";
import SlotsTable from "./Slots/SlotsTable";

export default function ServiceCard({ service, update, handleDelete, slots }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const { name, capacity, price, duration } = service;
  const [form] = Form.useForm();

  const formattedForm = {
    name,
    capacity,
    price,
    duration: moment(convertToTime(duration), "HH:mm"),
  };

  const handleSumbitUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        setLoadingUpdate(true);
        values.duration = convertToMinutes(values.duration.format("HH:mm"));
        fetch(`/api/services/${service.id}`, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => update(data))
          .then(() => {
            setLoadingUpdate(false);
            setIsUpdating(false);
          });
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  return (
    <Col span={6}>
      <Card
        title={
          <div>
            {capitalize(name) + " "}
            {isUpdating && (
              <Popconfirm
                title="Delete Service?"
                description={`Are you sure you want to delete this service?`}
                onConfirm={handleDelete}
              >
                <Button type="text" danger style={{ padding: ".3rem" }}>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            )}
          </div>
        }
        extra={
          <Button
            type="text"
            style={{ color: "skyblue", padding: ".3rem" }}
            onClick={() => setIsUpdating(!isUpdating)}
          >
            {isUpdating ? <CloseOutlined /> : <EditOutlined />}
          </Button>
        }
      >
        {isUpdating ? (
          <>
            <ServiceForm data={formattedForm} form={form} />
            <Button onClick={handleSumbitUpdate} loading={loadingUpdate}>
              Update
            </Button>
          </>
        ) : (
          <div>
            <p>Duration: {convertToTime(duration)}</p>
            <p>Capacity: {capacity}</p>
            <p>Price: {`$${price.toFixed(2)}`}</p>
          </div>
        )}
        <Divider />
        <SlotsTable service={service} />
      </Card>
    </Col>
  );
}
