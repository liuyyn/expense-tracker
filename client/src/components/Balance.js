import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

export const Balance = () => {
  // access state
  const { transactions } = useContext(GlobalContext); // destructuring

  // put all transaction amounts into an array
  const amounts = transactions.map((transaction) => transaction.amount);
  const balance = amounts.reduce((x, y) => (x += y), 0).toFixed(2);

  return (
    <>
      <h4>Your Balance</h4>
      <h1 id="balance">${numberWithCommas(balance)}</h1>
    </>
  );
};
