import { Form, Input, InputNumber, TimePicker } from "antd";
import React from "react";
const { Item } = Form;

export default function ServiceForm({ form }) {
  return (
    <Form form={form}>
      <Item label="Name" rules={[{ required: true }]} name="name">
        <Input />
      </Item>
      <Item label="Duration" name="duration" rules={[{ required: true }]}>
        <TimePicker format="HH:mm" showNow={false} />
      </Item>
      <Item label="Capacity" name="capacity" rules={[{ required: true }]}>
        <InputNumber min={1} />
      </Item>
      <Item label="Price" name="price" rules={[{ required: true }]}>
        <InputNumber
          className="w-full"
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
