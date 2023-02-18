// set endpoint and your API key
endpoint = 'convert';
access_key = 'wcq6l2hS2IeQAQg4dYjy9hBD34Ej0XBD';

// define from currency, to currency, and amount
from = 'EUR';
to = 'GBP';
amount = '10';

// execute the conversion using the "convert" endpoint:
$.ajax({
    url: 'https://data.fixer.io/api/' + endpoint + '?access_key=wcq6l2hS2IeQAQg4dYjy9hBD34Ej0XBD' + access_key +'&from=' + from + '&to=' + to + '&amount=' + amount,
    dataType: 'jsonp',
    success: function(json) {

        // access the conversion result in json.result
        alert(json.result);
    }
});