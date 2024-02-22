import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Space, Select, InputNumber } from "antd";
import dayjs from "dayjs";

const { Item } = Form;
const { Option } = Select;
const formTypes = {
  name: "text",
  email: "email",
  time: "select",
  number: "phone",
  persons: "number",
  paid: "checkbox",
};

export default function BookingForm({ date, form, slots, data }) {
  return (
    <Form form={form} initialValues={data}>
      <Item label="Name" rules={[{ required: true }]} name="name">
        <Input />
      </Item>
      <Item label="Email" rules={[{ required: true }]} name="email">
        <Input type="email" />
      </Item>
      <Item label="Phone" rules={[{ required: true }]} name="number">
        <Input type="phone" />
      </Item>
      <Item label="Persons" rules={[{ required: true }]} name="persons">
        <InputNumber />
      </Item>
    </Form>
  );
}
