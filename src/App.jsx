import React, { useEffect, useState } from "react";
import "./App.css";
import { Form } from "./Form";
import { Nav } from "./Nav";

export const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState(0);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          "https://api.nbp.pl/api/exchangerates/tables/A"
        );
        const response = await data.json();
        const filterCurrencies = response[0].rates.filter((cur) => {
          return ["USD", "EUR", "CHF"].includes(cur.code);
        });
        setCurrencies(filterCurrencies);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      }
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
          {result} zł
        </span>
      </p>
      {isError && (
        <p>
          {" "}
          <span className="finish">
            We have a temporary problem, try again later
          </span>
        </p>
      )}
    </>
  );
};

export default App;
