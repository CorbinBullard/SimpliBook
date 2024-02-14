export const actionTypes = {
  SET_SERVICES: "SET_SERVICES",
  CREATE_SERVICE: "CREATE_SERVICE",
  UPDATE_SERVICE: "UPDATE_SERVICE",
  DELETE_SERVICE: "DELETE_SERVICE",
};

export const servicesReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SERVICES:
      return action.payload;
    case actionTypes.CREATE_SERVICE:
      return [...state, action.payload];
    case actionTypes.UPDATE_SERVICE:
      return state.map((service) =>
        service.id === action.payload.id ? action.payload : service
      );
    case actionTypes.DELETE_SERVICE:
      return state.filter((service) => service.id !== action.payload);
    default:
      return state;
  }
};

