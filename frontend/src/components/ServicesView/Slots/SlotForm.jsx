import React, { useState, useEffect } from "react";
import { Form, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import { checkTimeConflict } from "../../../utils/utilFunctions";

export default function SlotForm({ form, data, days, slots, duration }) {
  const [conflicting, setConflicting] = useState(false);
  const [time, setTime] = useState(null);

  useEffect(() => {
    // Ensure you're also setting the time state if data.start_time changes
    // setTime(data.start_time ? moment(data.start_time, "HH:mm:ss") : null);
    form.setFieldsValue(data);
    console.log(data, form);
  }, [data, form]);

  const handleTimeChange = (time) => {
    setTime(time);
    console.log("Time", duration);
    if (time) {
      const formattedTime = dayjs(time, "HH:mm:ss").format("HH:mm:ss");
      const endTime = dayjs(time, "HH:mm:ss")
        .add(duration, "minute")
        .format("HH:mm:ss");
      console.log("End Time", endTime);
      const isConflicting = checkTimeConflict(formattedTime, endTime, slots);
      console.log("Conflicting? ", isConflicting);
      setConflicting(isConflicting);

      // Update form's start_time with the new value
      form.setFieldsValue({ start_time: time });
      form.setFieldsValue({ end_time: endTime });
    }
  };
  console.log("RENDER");

  return (
    <Form form={form} initialValues={data}>
      <Form.Item label="Day" name="day" rules={[{ required: true }]}>
        <Select>
          {days.map((day, index) => (
            <Select.Option key={index} value={index}>
              {day}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Time"
        name="start_time"
        rules={[
          { required: true },
          () => ({
            validator(value) {
              if (!value) return Promise.reject("Please select a time");
              if (conflicting)
                return Promise.reject("Time conflicts with another slot");
              return Promise.resolve();
            },
          }),
        ]}
        status={conflicting ? "error" : ""}
      >
        <TimePicker
          use12Hours
          format="h:mm a"
          onChange={handleTimeChange}
          value={time}
        />
      </Form.Item>
    </Form>
  );
}
