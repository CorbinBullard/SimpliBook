import dayjs from "dayjs";

export const actionTypes = {
  SET_BOOKINGS: "SET_BOOKINGS",
  CREATE_BOOKING: "CREATE_BOOKING",
  UPDATE_BOOKING: "UPDATE_BOOKING",
  DELETE_BOOKING: "DELETE_BOOKING",
};

export const BookingsReducer = (state, action) => {
  console.log("STATE : ", state);
  switch (action.type) {
    case actionTypes.SET_BOOKINGS:
      const bookingsArr = [];
      // action.payload.bookings.forEach((booking) => {
      //   booking.time = dayjs(booking.date).format("h:mm a");
      //   const date = dayjs(booking.date).format("YYYY-MM-DD");
      //   if (bookingsObj[date]) {
      //     bookingsObj[date].push(booking);
      //   } else {
      //     bookingsObj[date] = [booking];
      //   }
      // });

      return action.payload.bookings.map((booking) => {
        console.log("Booking : ", booking);
        return {
          title: booking.serviceName,
          start: new Date(booking.date),
          end: new Date(booking.end_time),
        };
      });
    case actionTypes.CREATE_BOOKING:
      console.log("Action Payload : ", action.payload);
      return {
        ...state,
        [dayjs(action.payload.date).format("YYYY-MM-DD")]: [
          ...(state[dayjs(action.payload.date).format("YYYY-MM-DD")] || []),
          action.payload,
        ],
      };
    case actionTypes.UPDATE_BOOKING:
      return state.map((booking) =>
        booking.id === action.payload.id ? action.payload : booking
      );
    case actionTypes.DELETE_BOOKING:
      return state.filter((booking) => booking.id !== action.payload);
    default:
      return state;
  }
};
