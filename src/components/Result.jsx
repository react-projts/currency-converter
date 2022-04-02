import React from "react";
import "../App.css";

function Result({ amount, result, fromCurrency, toCurrency }) {
  const formatedResult = result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$& ");

  return (
    <div className="result">
      <div>{`${amount} ${fromCurrency} = `}</div> <br />
      <span className="result-number">{`${formatedResult} ${toCurrency}`}</span>
    </div>
  );
}

export default Result;
