import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import * as dayjs from "dayjs";
import { Layout } from "antd";
import CalendarComponent from "./CalendarComponent";
import DateDetails from "./DateDetails";
import { useFetchData } from "../../utils/FetchData";
import { BookingsReducer, actionTypes } from "./Bookings/BookingsReducer";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";
const { Sider, Content } = Layout;
export default function CalendarPage() {
  const [date, setDate] = useState(Date.now());
  const [bookings, dispatchBookings] = useReducer(BookingsReducer, {});
  const navigate = useNavigate();

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
  console.log("Bookings", bookings);

  const createNewBooking = (booking) => {};
  return (
    <Layout>
      <Content>
        <CalendarComponent bookings={bookings} setDate={setDate} />
      </Content>

      <Sider style={{ paddingLeft: "1rem", background: "#fff" }} width={300}>
        <DateDetails
          date={date}
          bookings={bookings[date]}
          createNewBooking={createNewBooking}
        />
      </Sider>
    </Layout>
  );
}
