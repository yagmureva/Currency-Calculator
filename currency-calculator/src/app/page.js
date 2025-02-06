"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function CurrencyCalculator() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    "EUR",
    "GBP",
    "JPY",
    "CAD",
    "AUD",
  ]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedAmounts, setConvertedAmounts] = useState({});
  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "CAD",
    "AUD",
    "CHF",
    "CNY",
    "INR",
    "MXN",
    "BRL",
    "RUB",
    "KRW",
    "SGD",
    "NZD",
    "SEK",
    "NOK",
    "PLN",
    "ZAR",
    "TRY",
    "ARS",
    "SAR",
    "DKK",
    "THB",
    "MYR",
    "HKD",
    "IDR",
    "VND",
    "EGP",
    "CLP",
  ];

  // Fetch exchange rates for the selected base currency
  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        const rates = data.rates;
        setExchangeRates(rates);
      });
  }, [fromCurrency]);

  // Calculate the converted amounts for selected currencies
  useEffect(() => {
    const updatedConvertedAmounts = {};
    selectedCurrencies.forEach((currency) => {
      updatedConvertedAmounts[currency] = (
        amount * exchangeRates[currency] || 0
      ).toFixed(2);
    });
    setConvertedAmounts(updatedConvertedAmounts);
  }, [amount, exchangeRates, selectedCurrencies]);

  // Handle selected currencies change
  const handleCurrencyChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCurrencies(selectedOptions);
  };

  // Add a new currency to the list, with a maximum of 5 currencies
  const addCurrency = () => {
    if (selectedCurrencies.length < 5) {
      const newCurrency = currencies.find(
        (currency) => !selectedCurrencies.includes(currency)
      );
      if (newCurrency) {
        setSelectedCurrencies((prev) => [...prev, newCurrency]);
      }
    }
  };

  // Remove a currency from the list
  const removeCurrency = (currency) => {
    setSelectedCurrencies((prev) => prev.filter((curr) => curr !== currency));
  };

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
            <label>Select Currencies</label>
            <select
              multiple
              value={selectedCurrencies}
              onChange={handleCurrencyChange}
              className={styles.multiSelect}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <div className={styles.buttonGroup}>
              <button
                className={styles.addButton}
                onClick={addCurrency}
                disabled={selectedCurrencies.length >= 5}
              >
                Add Currency
              </button>
            </div>
          </div>
        </div>
        <div className={styles.resultList}>
          {selectedCurrencies.map((currency) => (
            <div key={currency} className={styles.resultItem}>
              <div className={styles.currencyName}>{currency}</div>
              <div className={styles.convertedAmount}>
                {convertedAmounts[currency]} {currency}
              </div>
              <button
                className={styles.removeButton}
                onClick={() => removeCurrency(currency)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
