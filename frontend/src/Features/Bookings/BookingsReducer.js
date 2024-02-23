import dayjs from "dayjs";

export const actionTypes = {
  SET_BOOKINGS: "SET_BOOKINGS",
  CREATE_BOOKING: "CREATE_BOOKING",
  UPDATE_BOOKING: "UPDATE_BOOKING",
  DELETE_BOOKING: "DELETE_BOOKING",
};

export const BookingsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_BOOKINGS:
      const bookingsObj = {};
      action.payload.bookings.forEach((booking) => {
        console.log("Booking : ", booking)
        const slot = booking.Slot;
        if (bookingsObj[slot.id]) {
          bookingsObj[slot.id].bookings.push(booking);
        } else {
          bookingsObj[slot.id] = {
            start: new Date(booking.date),
            end: new Date(booking.end_time),
            title: booking.serviceName,
            bookings: [booking],
          };
        }
      });

      return bookingsObj;
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
