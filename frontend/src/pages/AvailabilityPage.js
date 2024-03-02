import React, { useEffect, useState } from "react";
import { useFetchData } from "../utils/FetchData";
import WeekView from "../Features/Availability/WeekView";
import { Select } from "antd";

export default function AvailabilityPage() {
  const [currentService, setCurrentService] = useState({});
  const [slots, setSlots] = useState([]);
  const services = useFetchData("/api/services");
  useEffect(() => {
    if (services) setCurrentService(services[0]);
  }, [services]);

  const handleChange = (value) => {
    setCurrentService(services[value]);
  }

  if (!services?.length) return null;
  console.log(services)
  return (
    <>
      <Select
        style={{ width: "15vw", marginBottom: "1vh" }}
        value={currentService.name}
        onChange={handleChange}
      >
        {services &&
          services.map((service, i) => (
            <Select.Option key={service.id} value={i}>
              {service.name}
            </Select.Option>
          ))}
      </Select>
      <WeekView slots={currentService.Slots} />
    </>
  );
}
