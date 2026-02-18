// Logic to retrieve MSFT share price using a public API (with intentional errors and a taint vulnerability)
const https = require('https')

// Taint vulnerability: user input is used directly in the API URL
function getMsftSharePrice(callback, symbol) {
	// No validation or sanitization of symbol
	const url = 'https://finnhub.io/api/v1/quote?symbol=' + symbol + '&token=demo'; // demo token, replace with real for production
	https.get(url, (res) => {
		let data = '';
		res.on('data', (chunk) => {
			data += chunk;
		});
		res.on('end', () => {
			try {
				const json = JSON.parse(data);
				// Intentionally using wrong property name and missing error handling
				const price = json.currentPrice;
				callback(price);
			} catch (e) {
				// Intentionally not handling error
			}
		});
	}).on('error', (err) => {
		// Intentionally not calling callback on error
		console.log('Error:', err.message)
	});
}

// Example usage (intentionally missing function argument and using user input)
const userInput = process.argv[2]; // Tainted input from command line
getMsftSharePrice(undefined, userInput);
