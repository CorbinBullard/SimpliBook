import React, { useState, useEffect } from "react";
import { Form, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"; // Import customParseFormat plugin
import { checkTimeConflict } from "../../../utils/utilFunctions";

dayjs.extend(customParseFormat); // Extend dayjs with customParseFormat plugin

export default function SlotForm({ form, data, days, slots, duration }) {
  const [conflicting, setConflicting] = useState(false);
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (data.start_time) {
      // Convert the incoming start_time to a dayjs object and set it
      const startTime = dayjs(data.start_time, "HH:mm:ss");
      setTime(startTime);
    } else {
      setTime(null);
    }
    // Prepopulate form fields with incoming data
    form.setFieldsValue({
      ...data,
      start_time: data.start_time ? dayjs(data.start_time, "HH:mm:ss") : null,
    });
  }, [data, form]);

  const handleTimeChange = (timeValue) => {
    setTime(timeValue);
    if (timeValue) {
      const formattedTime = timeValue.format("HH:mm:ss");
      const endTime = timeValue.add(duration, "minute").format("HH:mm:ss");
      const isConflicting = checkTimeConflict(formattedTime, endTime, slots);
      setConflicting(isConflicting);

      // Update form's start_time with the new dayjs value
      form.setFieldsValue({ start_time: timeValue, end_time: endTime });
    }
  };

  return (
    <Form
      form={form}
      initialValues={{
        ...data,
        start_time: data.start_time ? dayjs(data.start_time, "HH:mm:ss") : null,
      }}
    >
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
            validator(_, value) {
              if (!value)
                return Promise.reject(new Error("Please select a time"));
              if (conflicting)
                return Promise.reject(
                  new Error("Time conflicts with another slot")
                );
              return Promise.resolve();
            },
          }),
        ]}
        status={conflicting ? "error" : ""}
      >
        <TimePicker
          showNow={false}
          use12Hours
          format="h:mm a"
          onChange={handleTimeChange}
          value={time}
        />
      </Form.Item>
    </Form>
  );
}
