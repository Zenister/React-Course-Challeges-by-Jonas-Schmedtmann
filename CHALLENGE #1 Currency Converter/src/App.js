// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useState, useEffect } from "react";

export default function App() {
  const [money, setMoney] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [converted, setConverted] = useState(0);

  useEffect(
    function () {
      const controller = new AbortController();
      async function Conversion() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${money}&from=${fromCurrency}&to=${toCurrency}`
        );

        const data = await res.json();
        // console.log(data.rates[toCurrency]);
        setConverted(data.rates?.[toCurrency]);
      }

      Conversion();
      return function () {
        controller.abort();
      };
    },
    [money, fromCurrency, toCurrency]
  );
  return (
    <div>
      <input
        type="text"
        value={money}
        onChange={(e) => setMoney(Number(e.target.value))}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {converted} {toCurrency}
      </p>
    </div>
  );
}
