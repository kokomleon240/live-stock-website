document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "60S57XWIF5Y1JK6B"; // Replace with your actual API key
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=RELIANCE.BSE&interval=5min&apikey=60S57XWIF5Y1JK6B?apikey=${apiKey}`; // Replace with correct API endpoint

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("API Response:", data); // Debug: Check actual API response format

      let stocks = data.stocks || data.data || []; // Adjust based on your API's response structure

      let tableBody = document.getElementById("stock-table-body");
      tableBody.innerHTML = ""; // Clear old data before updating

      if (stocks.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3">No stock data available</td></tr>`;
        return;
      }

      stocks.forEach(stock => {
        let symbol = stock.symbol || "N/A";  // Fix: Handles undefined values
        let price = stock.price !== undefined ? stock.price : "N/A";  
        let change = stock.change !== undefined ? stock.change : "N/A";

        let row = `<tr>
          <td>${symbol}</td>
          <td>${price}</td>
          <td>${change}</td>
        </tr>`;

        tableBody.innerHTML += row;
      });
    })
    .catch(error => {
      console.error("Error fetching stock data:", error);
      document.getElementById("stock-table-body").innerHTML = `<tr><td colspan="3">Error loading data</td></tr>`;
    });
});
