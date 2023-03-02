import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  cars: [],
  loading: false,
  error: null,
};

export const CarContext = createContext(INITIAL_STATE);

const CarReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CAR":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_CAR_SUCCESS":
      return {
        cars: [...state.cars, action.payload],
        loading: false,
        error: null,
      };
    case "ADD_CAR_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "CAR_UPDATE_START":
      return {
        ...state,
        loading: true,
      };
    case "CAR_UPDATE_SUCCESS":
      return {
        cars: action.payload,
        loading: false,
        error: null,
      };
    case "CAR_UPDATE_FAILURE":
      return {
        cars: state.user,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const CarContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CarReducer, INITIAL_STATE);

  return (
    <CarContext.Provider
      value={{
        cars: state.cars,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
