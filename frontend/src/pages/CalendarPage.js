import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import * as dayjs from "dayjs";
import { Drawer, Layout, notification } from "antd";
import CalendarComponent from "../Features/Calendar/CalendarComponent";
import CurrentSlotBookings from "../Features/Calendar/CurrentSlotBookings";
import { useFetchData } from "../utils/FetchData";
import {
  BookingsReducer,
  actionTypes,
} from "../Features/Bookings/BookingsReducer";
const { Sider, Content } = Layout;

export default function CalendarPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [bookings, dispatchBookings] = useReducer(BookingsReducer, {});
  const [currentSlot, setCurrentSlot] = useState({});

  // Fetch bookings from the server
  const fetchedBookings = useFetchData("/api/bookings");
  useEffect(() => {
    if (fetchedBookings) {
      dispatchBookings({
        type: actionTypes.SET_BOOKINGS,
        payload: fetchedBookings,
      });
    }
  }, [fetchedBookings]);

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const createNewBooking = async (booking) => {
    dispatchBookings({ type: actionTypes.CREATE_BOOKING, payload: booking });
    setIsDrawerOpen(false);
    // This should be reusable and show different outcomes as well
    notification.success({
      message: "Booking Created",
      description: "Booking has been created successfully",
    });
  };
  const handleUpdate = async (booking) => {
    await fetch(`/api/bookings/${booking.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });
    dispatchBookings({ type: actionTypes.UPDATE_BOOKING, payload: booking });
  };
  const handleDelete = async (id) => {
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    dispatchBookings({ type: actionTypes.DELETE_BOOKING, payload: id });
  };
  const onSlotClick = (slot) => {
    setCurrentSlot(slot);
    const date = dayjs(slot.start).format("YYYY-MM-DD");
    setIsDrawerOpen(true);
  };
  return (
    <Layout>
      <Content style={{ height: "85vh" }}>
        <CalendarComponent bookings={bookings} onClick={onSlotClick} />
      </Content>
      <Drawer open={isDrawerOpen} onClose={handleDrawerClose}>
        <CurrentSlotBookings
          bookings={currentSlot.bookings}
          date={dayjs(currentSlot.start).format("ddd, MMM D ")}
          slot={currentSlot}
          createNewBooking={createNewBooking}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </Drawer>
    </Layout>
  );
}
