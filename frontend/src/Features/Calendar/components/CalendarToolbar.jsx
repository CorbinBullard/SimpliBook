import React from "react";
import { Button, Flex } from "antd"; // Assuming you're using React Bootstrap for buttons
import {
  LeftOutlined,
  RightOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

export default function CalendarToolbar(toolbar) {
  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const goToToday = () => {
    toolbar.onNavigate("TODAY");
  };

  const handleCustomAction = () => {
    console.log("Custom action");
    // Define your custom button action here
  };
  const monthView = () => {
    toolbar.onView("month");
  };
  const weekView = () => {
    toolbar.onView("week");
  };
  const dayView = () => {
    toolbar.onView("day");
  };
  return (
    <Flex className="rbc-toolbar">
      <span className="rbc-btn-group">
        <Button type="button" onClick={goToToday}>
          Today
        </Button>
        <Button type="button" onClick={goToBack}>
          <LeftOutlined />
        </Button>
        <Button type="button" onClick={goToNext}>
          <RightOutlined />
        </Button>
      </span>
      <span className="rbc-btn-group">
        <Button onClick={handleCustomAction}>
          <PlusCircleOutlined />
          Create Booking
        </Button>
      </span>
      <span className="rbc-btn-group">
        <Button onClick={monthView}>Month</Button>
        <Button onClick={weekView}>Week</Button>
        <Button onClick={dayView}>Day</Button>
      </span>
    </Flex>
  );
}
