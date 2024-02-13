import React, { useEffect, useReducer, useState } from "react";
import SlotsTable from "./SlotsTable"; // Assuming you're using it elsewhere
import ServiceCard from "./ServiceCard";
import { Button, Card, Col, Empty, Form, Modal, Row } from "antd";
import ServiceForm from "./ServiceForm";

// Define action types
const actionTypes = {
  SET_SERVICES: "SET_SERVICES",
  CREATE_SERVICE: "CREATE_SERVICE",
};

// Define reducer function
const servicesReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SERVICES:
      return action.payload;
    case actionTypes.CREATE_SERVICE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default function UserServices() {
  const [services, dispatchServices] = useReducer(servicesReducer, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetch("/api/slots")
      .then((res) => res.json())
      .then((data) => setSlots(data));
  }, []);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) =>
        dispatchServices({ type: actionTypes.SET_SERVICES, payload: data })
      );
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        values.duration = convertToMinutes(values.duration.format("HH:mm"));
        console.log("Values : ", values);
        fetch("/api/services", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            dispatchServices({
              type: actionTypes.CREATE_SERVICE,
              payload: data,
            });
            // form.resetFields();
          });
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="pt-5">
      <Row gutter={16}>
        {services.length > 0 &&
          services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        <Col span={6}>
          <Card title={"Create New Service"} style={{ height: "14.1rem" }}>
            <Button
              type="dashed"
              block
              style={{ height: "7.5rem" }}
              onClick={showModal}
            >
              Create
            </Button>
          </Card>
        </Col>
      </Row>
      <Modal
        title="New Service"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="Create"
        okType="primary"
      >
        <ServiceForm form={form} />
      </Modal>
    </div>
  );
}
// convert HH:mm to minutes as an integer
const convertToMinutes = (time) => {
  const [hours, minutes] = time.split(":");
  return parseInt(hours) * 60 + parseInt(minutes);
};
