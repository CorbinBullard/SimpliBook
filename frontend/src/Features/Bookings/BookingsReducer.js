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
      console.log("Old State: ", newState);
      const date = dayjs(action.payload.date).format("YYYY-MM-DDTHH:mm:ss");
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
      console.log("New State: ", newState);
      return newState;
    }

    case actionTypes.UPDATE_BOOKING: {
      newState = deepCopy(state);

      // Format the date from the action payload
      const date = dayjs(action.payload.date).format("YYYY-MM-DDTHH:mm:ss");

      // Check if the date exists in the newState
      if (!newState[date]) {
        console.error(
          "Date does not exist in the state, cannot update booking."
        );
        return newState; // Return the unchanged state if the date doesn't exist
      }

      // Update the booking in the existing date
      const updatedBookings = newState[date].bookings.map((booking) =>
        booking.id === action.payload.id
          ? { ...booking, ...action.payload }
          : booking
      );

      // Update the bookings for the date
      newState[date].bookings = updatedBookings;

      console.log("Updated State: ", newState);
      return newState;
    }

    case actionTypes.DELETE_BOOKING: {
      newState = deepCopy(state);
      const date = dayjs(action.payload.date).format("YYYY-MM-DDTHH:mm:ss");
      newState[date].bookings = newState[date].bookings.filter(
        (booking) => booking.id !== action.payload
      );
      return newState;
    }
    default:
      return state;
  }
};
