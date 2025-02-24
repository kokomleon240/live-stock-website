async function fetchStockData() {
    let symbol = document.getElementById("stockSymbol").value.toUpperCase();
    let apiKey = "60S57XWIF5Y1JK6B";  // Replace with your actual API key
    let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        let stockInfo = data["Global Quote"];

        if (stockInfo) {
            document.getElementById("stockData").innerHTML = `
                <p><strong>${symbol}</strong></p>
                <p>Price: $${stockInfo["05. price"]}</p>
                <p>Change: ${stockInfo["09. change"]} (${stockInfo["10. change percent"]})</p>
            `;
        } else {
            document.getElementById("stockData").innerHTML = `<p>Invalid stock symbol. Try again.</p>`;
        }
    } catch (error) {
        document.getElementById("stockData").innerHTML = `<p>Error fetching data. Try again.</p>`;
    }
}
