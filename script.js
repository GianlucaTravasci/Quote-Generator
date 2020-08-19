//text fields
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');

//buttons
const newQuoterBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter-button');

//loader
const quoteContainer = document.getElementById('quote-container');
const loader = document.getElementById('loader')

//show loader
function addLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//remove loader
function removeLoadingSpinner() {
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//if there are so many errors in the catch statement with the getQuot() call everthing is stopped.
//counter is just a counter in order to stop execute after 10 consecutive errors
let counter = 0;
//Getter for the quote form API: https://forismatic.com/en/api/
async function getQuote() {
    addLoadingSpinner();
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

        //stop loading and show quote
        removeLoadingSpinner();

    } catch(err) {
        if (counter === 10) {
            console.log('something wrong!')
        } else {
            getQuote();
            counter++;
        }
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
