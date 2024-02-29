import React from "react";
import TimelineBlock from "../../../components/UI/Timeline/TimelineBlock";

export default function SlotBlock({ children, top, height, color, onClick }) {
  return (
    <TimelineBlock top={top} height={height} color={"blue"}></TimelineBlock>
  );
}
