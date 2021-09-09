import React,{ useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import Coin from './Coin';

function App() {
 
  const[coins,setCoins]=useState([]);

  const[search, setSearch]=useState('')
  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
    }).catch(error=>console.log(error));
  },[]);

  const handleChange = e =>{
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="coin-app">
    <div className="coin-search">
      <h1 className="coin-text"> All Crypto-Currency</h1>
      <forms>
        <input type="text" placeholder="search" className="coin-input" onChange={handleChange}/>
      </forms>
      
      </div>
      <div className="hea">
        <p className="nam">Name</p>
        <p className="sam">Symbol</p>
        <p className="pam">Price</p>
        <p className="vam">Volume</p>
        <p className="pamc">Price Change</p>
        <p className="mak">Market Cap</p>
      </div>

    {filteredCoins.map(coin => {
      return(
        <Coin key={coin.id}
        name={coin.name}
        image={coin.image}
        symbol={coin.symbol}
        marketcap={coin.market_cap}
        price={coin.current_price}
        priceChange={coin.price_change_percentage_24h}
        volume={coin.total_volume}
        />
      );
    })}
    </div>
  );
}

export default App;
