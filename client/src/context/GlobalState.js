// Context provides a way to pass data through the component tree without having to pass props down manually at every level.
import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
// Initial sate
const initialState = {
  transactions: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// to use the State, we need to wrap our app in a Provider component
// Porvider component
export const GlobalProvider = ({ children }) => {
  // access state values
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  return (
    // passing state into the value of our Provider
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
