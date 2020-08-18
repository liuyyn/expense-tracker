import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState"; // by importing this, we will be able to use the app's state using the useContext hook
import { Transaction } from "./Transaction";

export const TransactionList = () => {
  // pull the state out to use it with useContext hook
  // const context = useContext(GlobalContext); // returns the state
  const { transactions } = useContext(GlobalContext); // destructuring
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};
