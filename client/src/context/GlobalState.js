// Context provides a way to pass data through the component tree without having to pass props down manually at every level.
import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
// Initial sate
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

// Create context
export const GlobalContext = createContext(initialState);

// to use the State, we need to wrap our app in a Provider component
// Porvider component
export const GlobalProvider = ({ children }) => {
  // access state values
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions() {
    axios
      .get("/api/v1/transactions")
      .then((res) =>
        dispatch({
          type: "GET_TRANSACTIONS",
          payload: res.data.data,
        })
      )
      .catch((e) =>
        dispatch({
          type: "TRANSACTION_ERROR",
          payload: e.response.data.error,
        })
      );
  }

  async function deleteTransaction(id) {
    axios
      .delete(`/api/v1/transactions/${id}`)
      .then((res) =>
        dispatch({
          type: "DELETE_TRANSACTION",
          payload: id,
        })
      )
      .catch((e) =>
        dispatch({
          type: "TRANSACTION_ERROR",
          payload: e.response.data.error,
        })
      );
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("/api/v1/transactions", transaction, config)
      .then((res) =>
        dispatch({
          type: "ADD_TRANSACTION",
          payload: res.data.data,
        })
      )
      .catch((e) =>
        dispatch({
          type: "TRANSACTION_ERROR",
          payload: e.response.data.error,
        })
      );
  }

  return (
    // passing state into the value of our Provider
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
