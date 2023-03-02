import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  bookings: [],
  loading: false,
  error: null,
};

export const BookingContext = createContext(INITIAL_STATE);

const BookingReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOKING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_BOOKING_SUCCESS":
      return {
        bookings: [...state.bookings, action.payload],
        loading: false,
        error: null,
      };
    case "ADD_BOOKING_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const BookingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BookingReducer, INITIAL_STATE);

  return (
    <BookingContext.Provider
      value={{
        bookings: state.bookings,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
