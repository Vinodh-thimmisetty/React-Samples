import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { RUPEE_SYMBOL } from "../constants";

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const [sign, amount, colorCode] =
    transaction.amount < 0
      ? ["-", -1 * transaction.amount, "minus"]
      : ["+", transaction.amount, "plus"];

  return (
    <>
      <li className={colorCode}>
        {transaction.text} <span> {transaction.trDate}</span>
        <span>
          {sign}
          {RUPEE_SYMBOL}
          {amount}
        </span>
        <button
          className="delete-btn"
          onClick={() => deleteTransaction(transaction.id)}
        >
          x
        </button>
      </li>
    </>
  );
};

export default Transaction;
