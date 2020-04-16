import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import Transaction from "./Transaction";

const TransactionList = () => {
  const transactionContext = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      <ul id="list" className="list">
        {transactionContext.transactions.map((tr) => (
          <Transaction key={tr.id} transaction={tr} />
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
