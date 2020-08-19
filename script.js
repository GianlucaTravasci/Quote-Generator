//text fields
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');

//buttons
const newQuoterBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter-button');

//Getter for the quote form API: https://forismatic.com/en/api/
async function getQuote() {
    
    const proxyUrl = 'https://afternoon-inlet-96116.herokuapp.com/';
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

//Quote tweet
function tweetQuote (){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blanck')
}

//Event listener
newQuoterBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On page load
getQuote()