import { Form, Input, InputNumber, TimePicker } from "antd";
import moment from "moment";
import React from "react";
const { Item } = Form;

export default function ServiceForm({ form, data }) {

  return (
    <Form form={form} initialValues={data}>
      <Item label="Name" rules={[{ required: true }]} name="name">
        <Input style={{ width: "100%" }} />
      </Item>
      <Item label="Duration" name="duration" rules={[{ required: true }]}>
        <TimePicker format="HH:mm" showNow={false} style={{ width: "100%" }} />
      </Item>
      <Item label="Capacity" name="capacity" rules={[{ required: true }]}>
        <InputNumber min={1} style={{ width: "100%" }} />
      </Item>
      <Item label="Price" name="price" rules={[{ required: true }]}>
        <InputNumber
          style={{ width: "100%" }}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          min={0.01}
        />
      </Item>
    </Form>
  );
}
