import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { DELETE_TRANSACTION, ADD_TRANSACTION } from "./types";

// initial State
const initialState = {
  transactions: [
    // { id: 1, text: "Flower", amount: -20 },
    // { id: 2, text: "Salary", amount: 300 },
    // { id: 3, text: "Book", amount: -10 },
    // { id: 4, text: "Camera", amount: 150 },
  ],
};

// Global scope of data available for other components
export const GlobalContext = createContext(initialState);

// expose to other components
export const GlobalProvider = ({ children }) => {
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const deleteTransaction = (id) => {
    dispatch({ type: DELETE_TRANSACTION, payload: id });
  };
  const addTransaction = (transaction) => {
    dispatch({ type: ADD_TRANSACTION, payload: transaction });
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
