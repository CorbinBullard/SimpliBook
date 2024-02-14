import { Form, Input, InputNumber, Select, TimePicker } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { checkTimeConflict } from "../../../utils/utilFunctions";
import dayjs from "dayjs";
const { Item } = Form;
const { Option } = Select;

export default function SlotForm({ form, data, days, slots, duration }) {
  const [conflicting, setConflicting] = useState(false);
  useEffect(() => {
    form.setFieldsValue(data);
    console.log(data, form);
  }, [data]);

  const checkTime = (time) => {
    const endTime = dayjs(time).add(duration, "minute");
    const isConflicting = checkTimeConflict(
      dayjs(time).format("HH:mm:ss"),
      duration,
      slots
    );
    setConflicting(isConflicting);
  };

  return (
    <Form form={form} initialValues={data}>
      <Item label="Day" name="day" rules={[{ required: true }]}>
        <Select>
          {days.map((day, index) => (
            <Option value={index}>{day}</Option>
          ))}
        </Select>
      </Item>
      <Item label="Time" name="start_time" rules={[{ required: true }]}>
        <TimePicker
          use12Hours
          format="h:mm a"
          onChange={checkTime}
          status={conflicting ? "error" : ""}
        />
      </Item>
    </Form>
  );
}
