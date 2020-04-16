import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { RUPEE_SYMBOL } from "../constants";
const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((tr) => tr.amount);
  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expenses = (
    amounts
      .filter((amount) => amount < 0)
      .reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p id="money-plus" className="money plus">
          +{RUPEE_SYMBOL}
          {income}
        </p>
      </div>
      <div>
        <h4>Expense</h4>
        <p id="money-minus" className="money minus">
          -{RUPEE_SYMBOL}
          {expenses}
        </p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
