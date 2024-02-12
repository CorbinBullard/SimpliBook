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

export default function BookingForm({ date, form, setForm, slots }) {
  console.log("Slots", slots);
  return (
    <Form>
      <Space.Compact direction="vertical" style={{ display: "flex" }} className="">
        {Object.keys(form).map((key) => {
          return (
            <Item key={key}>
                <label htmlFor="">{capitalize(key)}</label>
              {formTypes[key] === "select" ? (
                <Select>
                  {slots.map((slot) => (
                    <Option value={slot.id} placeholder={capitalize(key)}>
                      {dayjs(`${date}${slot.start_time}`).format("h:mm a")}
                    </Option>
                  ))}
                </Select>
              ) : (
                <Input
                  placeholder={capitalize(key)}
                  type={formTypes[key]}
                  value={form[key]}
                  onChange={(e) => {
                    setForm({ ...form, [key]: e.target.value });
                  }}
                />
              )}
            </Item>
          );
        })}
      </Space.Compact>
    </Form>
  );
}
