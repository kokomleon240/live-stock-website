const API_KEY = "60S57XWIF5Y1JK6B";  // Replace with actual API Key
const API_URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`;

async function fetchStocks() {
    try {
        let response = await fetch(API_URL);
        let data = await response.json();
        let stocks = data.top_gainers.slice(0, 10);  // Get Top 10 stocks

        let stockTable = document.getElementById("stockData");
        stockTable.innerHTML = "";

        stocks.forEach(stock => {
            let row = `<tr>
                        <td>${stock.symbol}</td>
                        <td>${stock.price}</td>
                        <td>${stock.change_percent}</td>
                      </tr>`;
            stockTable.innerHTML += row;
        });

    } catch (error) {
        console.error("Error fetching stock data:", error);
    }
}

async function searchStock() {
    let symbol = document.getElementById("searchStock").value.toUpperCase();
    let searchAPI = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

    try {
        let response = await fetch(searchAPI);
        let data = await response.json();
        let stock = data["Global Quote"];

        if (stock) {
            alert(`Stock: ${symbol}\nPrice: ${stock["05. price"]}\nChange: ${stock["10. change percent"]}`);
        } else {
            alert("Stock not found!");
        }

    } catch (error) {
        console.error("Error fetching stock data:", error);
    }
}

fetchStocks();  // Load stocks on page load
