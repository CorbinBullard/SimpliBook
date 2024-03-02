import React, { useEffect, useReducer, useState } from "react";
import { Layout, Drawer, notification } from "antd";
import * as dayjs from "dayjs";
import CalendarComponent from "../Features/Calendar/CalendarComponent";
import CurrentSlotBookings from "../Features/Calendar/CurrentSlotBookings";
import { useFetchData } from "../utils/FetchData";
import {
  BookingsReducer,
  actionTypes,
} from "../Features/Bookings/BookingsReducer";
import { useNotification } from "../providers/notification";
const { Content } = Layout;

// Custom hook for handling bookings
function useBookings(initialState = {}) {
  const [bookings, dispatch] = useReducer(BookingsReducer, initialState);
  const fetchedBookings = useFetchData("/api/bookings");

  useEffect(() => {
    if (fetchedBookings) {
      dispatch({
        type: actionTypes.SET_BOOKINGS,
        payload: fetchedBookings,
      });
    }
  }, [fetchedBookings]);

  return [bookings, dispatch];
}

// Main component
export default function CalendarPage() {
  const openNotification = useNotification();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentSlot, setCurrentSlot] = useState({});
  const [bookings, dispatchBookings] = useBookings();

  const toggleDrawer = (isOpen) => setIsDrawerOpen(isOpen);

  const handleBookingOperation = async (booking, operationType) => {
    if (operationType !== actionTypes.CREATE_BOOKING) {
      const method =
        operationType === actionTypes.DELETE_BOOKING ? "DELETE" : "PUT";
      const endpoint = `/api/bookings/${
        operationType === actionTypes.DELETE_BOOKING ? booking : booking.id
      }`;
      await fetch(endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        ...(method === "PUT" && { body: JSON.stringify(booking) }),
      });
    }
    dispatchBookings({ type: operationType, payload: booking });
    toggleDrawer(false);

    const opMessage =
      operationType === actionTypes.DELETE_BOOKING
        ? "Deleted"
        : operationType === actionTypes.CREATE_BOOKING
        ? "Created"
        : "Updated";

    openNotification({
      message: "Success",
      description: `Booking has been ${opMessage}`,
      type: "success",
    });
  };

  const onSlotClick = (slot) => {
    setCurrentSlot(slot);
    toggleDrawer(true);
  };

  return (
    <Layout>
      <Content style={{ height: "85vh" }}>
        <CalendarComponent bookings={bookings} onClick={onSlotClick} />
      </Content>
      <Drawer open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
        <CurrentSlotBookings
          bookings={currentSlot.bookings}
          date={dayjs(currentSlot.start).format("ddd, MMM D ")}
          slot={currentSlot}
          handleBookingOperation={handleBookingOperation}
        />
      </Drawer>
    </Layout>
  );
}
