import React, { useEffect, useState } from "react";
import CalendarComponent from "../../../frontend/src/components/Calendar/CalendarComponent";
import * as dayjs from "dayjs";
import { Layout } from "antd";
import BookingsDetails from "../../../frontend/src/components/Calendar/BookingsDetails";

const { Sider, Content } = Layout;
export default function CalendarPage() {
  const [date, setDate] = useState(null);
  const [bookings, setBookings] = useState({});
  const [slots, setSlots] = useState([]);
  // Fetch bookings from the server
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      const bookingsObj = {};
      console.log(data);
      data.bookings.forEach((booking) => {
        booking.time = dayjs(booking.date).format("h:mm a");
        const date = dayjs(bookings.date).format("YYYY-MM-DD");
        if (bookingsObj[date]) {
          bookingsObj[date].push(booking);
        } else {
          bookingsObj[date] = [booking];
        }
      });
      setBookings(bookingsObj);
    };
    fetchData();
  }, []);
  // Fetch slots from the server
  // useEffect(() => {
  //   const fetchSlots = async () => {
  //     const response = await fetch("/api/slots");
  //     const data = await response.json();
  //     setSlots(data.slots);
  //   };
  //   fetchSlots();
  // }, []);
  const createNewBooking = (booking) => {};
  return (
    <Layout>
      <Content>
        <CalendarComponent bookings={bookings} setDate={setDate} />
      </Content>
      {date && (
        <Sider style={{ background: "#fff" }} width={300}>
          <BookingsDetails
            date={date}
            bookings={bookings[date]}
            createNewBooking={createNewBooking}
          />
        </Sider>
      )}
    </Layout>
  );
}
