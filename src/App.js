import "./App.css";
import React, { useEffect, useState } from "react";
import CurrencyRow from "./components/CurrencyRow";
import Amount from "./components/Amount";
import Result from "./components/Result";

const BASE_URL =
  "https://v6.exchangerate-api.com/v6/aa64059781b0b6a59d0b36e0/latest/USD";

const PAIR_URL =
  "https://v6.exchangerate-api.com/v6/aa64059781b0b6a59d0b36e0/pair/";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(100);
  const [exchangeRate, setExchangeRate] = useState();

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyOptions(Object.keys(data.conversion_rates));
        setFromCurrency(Object.keys(data.conversion_rates)[0]);
        setToCurrency(Object.keys(data.conversion_rates)[31]);
        setExchangeRate(Object.values(data.conversion_rates)[31]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${PAIR_URL}${fromCurrency}/${toCurrency}`)
        .then((res) => res.json())
        .then((data) => {
          setExchangeRate(data.conversion_rate);
          console.log(data);
        });
    }
  }, [fromCurrency, toCurrency]);

  const switchCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div>
      <div className="title">{`Convert ${amount} ${fromCurrency} to ${toCurrency}`}</div>
      <div className="converter-box">
        <div className="row">
          <Amount
            label="Amount"
            onTypeAmount={(e) => setAmount(e.target.value)}
            amount={amount}
          />
          <CurrencyRow
            label="From"
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          />
          <button onClick={switchCurrency} className="switch-button">
            <img src="./assets/exchange.png" alt="" />
          </button>
          <CurrencyRow
            label="To"
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
          />
        </div>
        <Result
          amount={amount}
          result={amount * exchangeRate}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
        />
      </div>
    </div>
  );
}

export default App;
