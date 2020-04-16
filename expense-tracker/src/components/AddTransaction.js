import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const { transactions, addTransaction } = useContext(GlobalContext);
  let id = 1;
  const newTransaction = (e) => {
    e.preventDefault();
    if (transactions.length > 0) {
      id =
        transactions
          .map((tr) => tr.id)
          .reduce((a, b) => (a > b ? a : b), Number.MIN_VALUE) + 1;
    }
    const transaction = {
      id,
      text,
      amount: +amount,
      trDate: new Date().toLocaleDateString(),
    };
    addTransaction(transaction);
  };
  return (
    <>
      <h3>Add new transaction</h3>
      <form id="form" onSubmit={newTransaction}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            placeholder="Enter amount..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
