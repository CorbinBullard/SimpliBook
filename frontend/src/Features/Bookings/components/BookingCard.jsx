import { Button, Card, Form, Popconfirm } from "antd";
import React, { useState } from "react";
import { EditOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { capitalize } from "../../../utils/utilFunctions";
import BookingForm from "./BookingForm";

export default function BookingCard({ booking, handleDelete, update }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const handleSumbitUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        setLoadingUpdate(true);
        fetch(`/api/bookings/${booking.id}`, {
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
  const [form] = Form.useForm();
  return (
    <Card
      type="inner"
      key={booking.id}
      title={
        <div>
          {capitalize(booking.name)}
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
      {" "}
      {isUpdating ? (
        <>
          <BookingForm form={form} data={booking} />
          <Button onClick={handleSumbitUpdate} loading={loadingUpdate}>
            Update
          </Button>
        </>
      ) : (
        <>
          <p>Email: {booking.email}</p>
          <p>Phone: {booking.number}</p>
          <p>Persons: {booking.persons}</p>
          <p>{booking.paid ? "Paid" : "Not Paid"}</p>
        </>
      )}
    </Card>
  );
}
