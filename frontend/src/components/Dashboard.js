// frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [newSymbol, setNewSymbol] = useState('');

  // This function fetches prices and merges them into our stocks state
  const fetchPrices = async (currentStocks) => {
    try {
      const token = localStorage.getItem('access_token');
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/stock-prices/`;
      const response = await axios.get(apiUrl, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const prices = response.data.reduce((acc, stock) => {
        acc[stock.symbol] = stock.price;
        return acc;
      }, {});

      setStocks(currentStocks.map(stock => ({
        ...stock,
        price: prices[stock.symbol] || 'N/A'
      })));
    } catch (error) {
      console.error('Failed to fetch prices', error);
    }
  };

  // This effect runs only once to fetch the user's saved stock symbols
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/stocks/`;
        const response = await axios.get(apiUrl, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const initialStocks = response.data;
        setStocks(initialStocks);
        if (initialStocks.length > 0) {
          fetchPrices(initialStocks);
        }
      } catch (error) {
        console.error('Failed to fetch stocks', error);
      }
    };
    fetchStocks();
  }, []);

  // This effect sets up the 1-minute interval for fetching prices
  useEffect(() => {
    const interval = setInterval(() => {
      if (stocks.length > 0) {
        fetchPrices(stocks);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [stocks]);

  const handleAddStock = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/stocks/`;
      const response = await axios.post(apiUrl, 
        { symbol: newSymbol },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const newStock = response.data;
      setStocks([...stocks, newStock]);
      fetchPrices([...stocks, newStock]);
      setNewSymbol('');
    } catch (error) {
      console.error('Failed to add stock', error.response.data);
      alert('Failed to add stock. It might already be in your list.');
    }
  };

  const handleDeleteStock = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/stocks/${id}/`;
      await axios.delete(apiUrl, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setStocks(stocks.filter(stock => stock.id !== id));
    } catch (error) {
      console.error('Failed to delete stock', error);
      alert('Failed to delete stock.');
    }
  };

  return (
    <div>
      <h2>Your Stocks</h2>
      <form onSubmit={handleAddStock}>
        <input 
          type="text"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g., AAPL)"
          required
        />
        <button type="submit">Add Stock</button>
      </form>

      <ul>
        {stocks.map(stock => (
          <li key={stock.id}>
            {stock.symbol} - <strong>{stock.price ? `$${stock.price}` : 'Loading...'}</strong>
            <button onClick={() => handleDeleteStock(stock.id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;