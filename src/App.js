import "./index.css";
import "./App.css";
import Coin from "./coin";
import React, { useState, useEffect } from "react";
import { useFetch } from "./fetchHuks";

const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=NOK&order=market_cap_desc&per_page=100&page=1&sparkline=false";

function App(coins) {
  const { loading, products } = useFetch(url);
  const [search, setSearch] = useState("");
  // console.log(products);

  const filteredCoin = products.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">
          Dagens kryptovalutapriser etter markedsverdi
        </h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>

      <ul className="titles">
        <li> Name</li>
        <li> Kode</li>
        <li>Pris</li>
        <li>Markedsverdi</li>
        <li>24t</li>
        <li>Volume</li>
      </ul>
      {filteredCoin.map((coin) => {
        return <Coin key={coin.id} {...coin} />;
      })}
    </div>
  );
}

export default App;
