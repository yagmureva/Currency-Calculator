"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function CurrencyCalculator() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(1);
  const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        setExchangeRate(data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    setConvertedAmount((amount * exchangeRate).toFixed(2));
  }, [amount, exchangeRate]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Currency Converter</h1>
      <div className={styles.converterBox}>
        <div className={styles.inputGroup}>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.grid}>
          <div>
            <label>From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className={styles.select}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className={styles.select}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.result}>
          {convertedAmount} {toCurrency}
        </div>
      </div>
    </div>
  );
}
