import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { RUPEE_SYMBOL } from "../constants";

const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const totalBalance = transactions
    .map((tr) => tr.amount)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  return (
    <div>
      <h4>Your Balance</h4>
      <h1 id="balance">
        {RUPEE_SYMBOL}
        {totalBalance}
      </h1>
    </div>
  );
};

export default Balance;
