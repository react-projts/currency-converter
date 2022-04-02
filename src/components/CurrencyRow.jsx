import React from "react";
import "./currency-row.css";

function CurrencyRow(props) {
  const { currencyOptions, selectedCurrency, onChangeCurrency, label } = props;
  return (
    <div className="row-label">
      <span style={{ fontWeight: "bold" }}>{label}</span>
      <select
        value={selectedCurrency}
        onChange={onChangeCurrency}
        className="currency-select"
      >
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyRow;
