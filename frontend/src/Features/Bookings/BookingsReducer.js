import { deepCopy } from "../../utils/utilFunctions";

export const actionTypes = {
  SET_BOOKINGS: "SET_BOOKINGS",
  CREATE_BOOKING: "CREATE_BOOKING",
  UPDATE_BOOKING: "UPDATE_BOOKING",
  DELETE_BOOKING: "DELETE_BOOKING",
};

export const BookingsReducer = (state, action) => {
  let newState = deepCopy(state);

  switch (action.type) {
    case actionTypes.SET_BOOKINGS: {
      // Transform the array of bookings into an object with booking IDs as keys
      const bookingsById = action.payload.bookings.reduce((acc, booking) => {
        acc[booking.id] = booking;
        return acc;
      }, {});

      return bookingsById;
    }

    case actionTypes.CREATE_BOOKING: {
      // For both CREATE and UPDATE, overwrite or set the booking by ID
      newState = deepCopy(state);

      newState[action.payload.id] = action.payload;
      return newState;
    }

    case actionTypes.UPDATE_BOOKING: {
      // For both CREATE and UPDATE, overwrite or set the booking by ID
      const originalBooking = state[action.payload.id];
      newState = deepCopy(state);
      newState[action.payload.id] = { ...originalBooking, ...action.payload };
      return newState;
    }

    case actionTypes.DELETE_BOOKING: {
      // Copy state and delete the booking by ID
      newState = deepCopy(state);
      delete newState[action.payload]; // action.payload should be the ID of the booking to delete
      return newState;
    }

    default:
      return state;
  }
};
