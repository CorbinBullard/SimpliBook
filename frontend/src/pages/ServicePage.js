import React, { useEffect, useReducer, useState } from "react";
import {
  servicesReducer,
  actionTypes,
} from "../Features/Services/ServicesReducer";
import { useFetchData } from "../utils/FetchData";
import { Button, Card, Col, Form, Modal, Row } from "antd";
import ServiceForm from "../Features/Services/components/ServiceForm";
import ServiceCard from "../Features/Services/components/ServiceCard";
import { convertToMinutes } from "../utils/utilFunctions";
import { useForm } from "antd/lib/form/Form";
import WeekView from "../Features/Availability/WeekView";

export default function UserServices() {
  const [services, dispatchServices] = useReducer(servicesReducer, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const slots = useFetchData("/api/slots");

  // Assuming /api/services returns an array
  const fetchedServices = useFetchData("/api/services");
  useEffect(() => {
    if (fetchedServices) {
      dispatchServices({
        type: actionTypes.SET_SERVICES,
        payload: fetchedServices,
      });
    }
  }, [fetchedServices]);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      values.duration = convertToMinutes(values.duration.format("HH:mm"));
      const response = await fetch("/api/services", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      dispatchServices({ type: actionTypes.CREATE_SERVICE, payload: data });
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const handleUpdate = (service) =>
    dispatchServices({ type: actionTypes.UPDATE_SERVICE, payload: service });

    const handleDelete = async (id) => {
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    dispatchServices({ type: actionTypes.DELETE_SERVICE, payload: id });
  };

  return (
    <div className="pt-5">
      <Row gutter={16}>
        {services.length > 0 &&
          services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              update={handleUpdate}
              handleDelete={() => handleDelete(service.id)}
            />
          ))}
        <Col span={6}>
          <Card title="Create New Service" style={{ height: "14.1rem" }}>
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
