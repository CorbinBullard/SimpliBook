import dayjs from "dayjs";

export const actionTypes = {
  SET_BOOKINGS: "SET_BOOKINGS",
  CREATE_BOOKING: "CREATE_BOOKING",
  UPDATE_BOOKING: "UPDATE_BOOKING",
  DELETE_BOOKING: "DELETE_BOOKING",
};

export const SlotsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SLOTS:
      const slotsObj = {};
      action.payload.slots.forEach((slot) => {
        const date = dayjs(slot.start).format("YYYY-MM-DD");
        if (slotsObj[date]) {
          slotsObj[date].push(slot);
        } else {
          slotsObj[date] = [slot];
        }
      });
      return slotsObj;
    case actionTypes.CREATE_SLOT:
      return [...state, action.payload];
    case actionTypes.UPDATE_SLOT:
      return state.map((slot) =>
        slot.id === action.payload.id ? action.payload : slot
      );
    case actionTypes.DELETE_SLOT:
      return state.filter((slot) => slot.id !== action.payload);
    default:
      return state;
  }
};
