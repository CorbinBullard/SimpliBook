import dayjs from "dayjs";
import { deepCopy } from "../../utils/utilFunctions";

export const actionTypes = {
  SET_BOOKINGS: "SET_BOOKINGS",
  CREATE_BOOKING: "CREATE_BOOKING",
  UPDATE_BOOKING: "UPDATE_BOOKING",
  DELETE_BOOKING: "DELETE_BOOKING",
};

export const BookingsReducer = (state, action) => {
  console.log("Current State: ", state);
  console.log("Action: ", action.payload);
  let newState;

  switch (action.type) {
    case actionTypes.SET_BOOKINGS: {
      const bookingsObj = {};
      action.payload.bookings.forEach((booking) => {
        const date = dayjs(booking.date).format("YYYY-MM-DDTHH:mm:ss");
        const slot = booking.Slot;
        if (bookingsObj[date]) {
          bookingsObj[date].bookings.push(booking);
        } else {
          bookingsObj[date] = {
            slot_id: slot.id,
            start: new Date(booking.date),
            end: new Date(booking.end_time),
            title: booking.serviceName,
            bookings: [booking],
          };
        }
      });

      return bookingsObj;
    }
    case actionTypes.CREATE_BOOKING: {
      newState = deepCopy(state);
      const date = dayjs(action.payload.date).format("YYYY-MM-DDTHH:mm:ss");
      console.log("Date: ", date, action.payload);
      if (newState[date]) {
        // If the date already exists, append the new booking
        newState[date].bookings = [...newState[date].bookings, action.payload];
      } else {
        // If the date doesn't exist, create a new entry
        newState[date] = {
          slot_id: action.payload.slot_id,
          start: new Date(action.payload.date),
          end: new Date(action.payload.end_time),
          title: action.payload.serviceName,
          bookings: [action.payload], // Initialize with the new booking
        };
      }
      return newState;
    }

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
