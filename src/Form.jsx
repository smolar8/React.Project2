import { useState } from "react";

export const Form = ({ currencies, setResult }) => {
  const [amount, setAmount] = useState("");
  const [currencySelected, setCuurrencySelected] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setResult(amount * currencySelected);
  };

  return (
    <form name="convert" id="form" onSubmit={handleSubmit}>
      <input
        type="number"
        name="amount"
        id="userInput"
        placeholder="amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        name="ofWhich"
        id="currencySelection"
        value={currencySelected}
        onChange={(e) => setCuurrencySelected(Number(e.target.value))}
      >
        <option disabled value="">
          wybierz walutę
        </option>
        {currencies.map((item, index) => (
          <option value={item.mid} key={index}>
            {item.code}
          </option>
        ))}
      </select>
      <input type="submit" value="convert" />
    </form>
  );
};
