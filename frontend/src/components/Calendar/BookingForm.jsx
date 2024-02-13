import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Space, Select } from "antd";
import { capitalize } from "../../utils/utilFunctions";
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

export default function BookingForm({ date, form, slots }) {
  console.log("Slots", slots);
  return (
    <Form form={form}>
      <Item label="Name" rules={[{ required: true }]} name="name">
        <Input />
      </Item>
      <Item label="Email" rules={[{ required: true }]} name="email">
        <Input type="email" />
      </Item>
      <Item label="Time" rules={[{ required: true }]} name="time">
        <Select>
          {slots.map((slot) => (
            <Option value={slot.id} placeholder="Time">
              {dayjs(`${date}${slot.start_time}`).format("h:mm a")}
            </Option>
          ))}
        </Select>
      </Item>
    </Form>
  );
}

