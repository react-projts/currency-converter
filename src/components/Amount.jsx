import React from "react";
import "./currency-row.css";

function Amount(props) {
  const { label, amount, onTypeAmount } = props;
  return (
    <div className="row-label">
      <span style={{ fontWeight: "bold" }}>{label}</span>
      <input
        type="number"
        className="amount"
        onChange={onTypeAmount}
        value={amount}
      />
    </div>
  );
}

export default Amount;
