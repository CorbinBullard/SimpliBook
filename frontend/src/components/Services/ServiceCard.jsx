import { Card, Col } from "antd";
import React, { useState } from "react";
import { capitalize } from "../../utils/utilFunctions";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { Divider } from "antd";

export default function ServiceCard({ service }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { name, capacity, price, duration } = service;
  return (
    <Col span={6}>
      <Card
        title={capitalize(name)}
        extra={
          <a
            style={{ cursor: "pointer" }}
            onClick={() => setIsUpdating(!isUpdating)}
          >
            {isUpdating ? <CloseOutlined /> : <EditOutlined />}
          </a>
        }
      >
        <p>Duration: {duration}</p>
        <p>Capacity: {capacity}</p>
        <p>Price: {`$${price.toFixed(2)}`}</p>
        <Divider />
      </Card>
    </Col>
  );
}
