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
        booking.time = dayjs(booking.date).format("h:mm a");
        const date = dayjs(booking.date).format("YYYY-MM-DD");
        if (bookingsObj[date]) {
          bookingsObj[date].push(booking);
        } else {
          bookingsObj[date] = [booking];
        }
      });
      return bookingsObj;
    case actionTypes.CREATE_BOOKING:
      return [...state, action.payload];
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
