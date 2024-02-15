import React, { useEffect, useState } from "react";
import { useFetchData } from "../../utils/FetchData";
import WeekView from "./WeekView";

export default function SchedulePage() {
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    fetch("/api/slots")
      .then((res) => res.json())
      .then((data) => {
        setSlots(data);
      });
  }, []);
  console.log(slots);

  return <WeekView slots={slots} /> ;
}
