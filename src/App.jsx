import React, { useEffect, useState } from "react";
import "./App.css";
import { Form } from "./Form";
import { Nav } from "./Nav";

export const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://api.nbp.pl/api/exchangerates/tables/A/today/"
      );
      const response = await data.json();
      const filterCurrencies = response[0].rates.filter((cur) => {
        return ["USD", "EUR", "CHF"].includes(cur.code);
      });
      setCurrencies(filterCurrencies);
    };
    fetchData();
  }, []);

  return (
    <>
      <Nav />
      <Form currencies={currencies} setResult={setResult} />

      <hr className="hr" />
      <p>
        <span className="finish" id="result">
          {result}
        </span>
      </p>
    </>
  );
};

export default App;
