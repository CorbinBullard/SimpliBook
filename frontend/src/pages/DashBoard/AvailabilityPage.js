import React, { useEffect, useState } from "react";
import { useFetchData } from "../../utils/FetchData";
import WeekView from "../../components/Availability/WeekView";

export default function SchedulePage() {
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    fetch("/api/slots")
      .then((res) => res.json())
      .then((data) => {
        setSlots(data);
      });
  }, []);

  return <WeekView slots={slots} />;
}
