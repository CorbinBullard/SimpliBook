import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import * as dayjs from "dayjs";
import { Drawer, Layout } from "antd";
import CalendarComponent from "../Features/Calendar/components/CalendarComponent";
import CurrentDateDetails from "../Features/Calendar/components/CurrentDateDetails";
import { useFetchData } from "../utils/FetchData";
import {
  BookingsReducer,
  actionTypes,
} from "../Features/Bookings/BookingsReducer";
const { Sider, Content } = Layout;

export default function CalendarPage() {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [bookings, dispatchBookings] = useReducer(BookingsReducer, {});


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

  const createNewBooking = async (booking) => {
    dispatchBookings({ type: actionTypes.CREATE_BOOKING, payload: booking });
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
  const handleBookingClicked = (booking) => {
    console.log(booking);
    setIsDrawerOpen(true);
  };

  return (
    <Layout>
      <Content style={{ height: "85vh" }}>
        <CalendarComponent
          bookings={bookings}
          setDate={setDate}
          onClick={handleBookingClicked}
        />
      </Content>
      <Drawer open={isDrawerOpen}></Drawer>

      {/* <Sider style={{ paddingLeft: "1rem", background: "#fff" }} width={350}>
        <CurrentDateDetails
          date={date}
          createBooking={createNewBooking}
        />
      </Sider> */}
    </Layout>
  );
}
