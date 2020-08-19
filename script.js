const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoterBtn = document.getElementById('new-quote');

//Getter for the quote form API: https://forismatic.com/en/api/
async function getQuote() {
    
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try {

        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        //checking for blanck author, if it is return unknown
        if (data.quoteAuthor ==='') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        //Check the length of the text for reduce the font size in case of ling text
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }

        //Set the quote in his space
        quoteText.innerText = data.quoteText;
        console.log(data);
    } catch(err) {
        getQuote();
        console.log('Uoppsi', err);
    }
}

//Event listener

//On page load
getQuote()