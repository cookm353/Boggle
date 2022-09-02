"use strict";

const $board = $('#gameBoard');
const $tds = $("td");
const $form = $("form");
const $formInput = $("#guess");
const $formBttn = $("#guessForm button");
const $resultUL = $("#resultList");
const $scoreDisplay = $('#score');
const $invalidWordDisplay = $("#invalidWord");

let score = 0;

const submitURL = 'http://localhost:5000/check-word';

// Add letters to form input by clicking on them
$board.on("click", "td", evt => {
    const $lttr = $(evt.target).text();
    console.log($lttr);
})


$form.on('click', 'button', evt => {
    console.log("Click!");
    evt.preventDefault();
    const resp = checkGuess();
})

// Check guess and show result
async function checkGuess() {
    const guess = $formInput.val();
    const resp = await axios.get(`${submitURL}?word=${guess}`)
    const result = (resp.data.result);
    
    showResult(guess, result)

    if (result === "ok") {
        updateScoreDisplay(guess);
    }

    $formInput.val('');
    
    return resp;
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

