"use strict";

const $board = $('#gameBoard');
const $tds = $("td");
const $form = $("form");
const $formInput = $("#guess");
const $formBttn = $("#guessForm button");
const $guessBttn = $('.clickableBttn');
const $resultUL = $("#resultList");
const $scoreDisplay = $('#score');
const $invalidWordDisplay = $("#invalidWord");
const $timer = $('#timer');

let score = 0;
let timerStarted = false;

const submitGuessURL = 'http://localhost:5000/check-word';
const updateStatsURL = 'http://localhost:5000/update-stats';


// Add letters by clicking on them
$tds.on('click', evt => {
    const $guess = $('#guess').val();
    const $lttr = $(evt.target).text().toLowerCase();
    $formInput.val($guess + $lttr);
})

$form.on('click', 'button', evt => {
    evt.preventDefault()
})

$guessBttn.on('click', evt => {
    evt.preventDefault();
    if ( $timer.text() === '0' ) {
    } else if ( $formInput.val() === "" ) {
        alert("Enter a guess first!")
    } else {
        checkGuess();
        if ( !timerStarted ) {
            updateTimer();
            timerStarted = true;
        }
    }
})

// Check guess and show result
async function checkGuess() {
    const guess = $formInput.val();
    const resp = await axios.get(`${submitGuessURL}`, { params: { guess } })
    const result = (resp.data.result);
    
    showResult(guess, result)

    if (result === "ok") {
        updateScoreDisplay(guess);
    }

    $formInput.val('');
}

// Show word if it's valid, give error if it isn't
function showResult(guess, result) {
    let display_result;

    if (result === 'ok') {
        $resultUL.append(`<li>${guess}</li>`)
    } else {
        if (result === 'not-word') { display_result = 'Not a Word'; } 
        else {display_result = 'Not on Board'; }
        
        $invalidWordDisplay.fadeIn(0);
        $invalidWordDisplay.text(display_result);
        $invalidWordDisplay.fadeOut(2000); 
    }
}


function updateScoreDisplay(guess) {
    let currentScore = $scoreDisplay.text();
    const wordScore = guess.length;
    const newScore = parseInt(currentScore) + wordScore;

    $scoreDisplay.text(newScore);
}

function updateTimer() {
    let timeLeft = parseInt($timer.text());

    const timer = setInterval(() => {
        timeLeft--;
        $timer.text(timeLeft)

        if (timeLeft === 0) {
            clearInterval(timer);
            $guessBttn.off();
        }
    }, 10);
}

async function submitScore() {
    const $score = $scoreDisplay.text();
    const resp = await axios.get(`${updateStatsURL}`, { params: { score: $score } })
    resp.data['high_score']
    console.log(resp)
}

function updateHighScore() {
    const $highScore = parseInt($('#high_score').text())
    console.log($highScore)
}