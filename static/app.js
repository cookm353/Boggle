"use strict";

const $board = $('#gameBoard');
const $tds = $("td");
const $form = $("form");
const $formInput = $("#guess");
const $formBttn = $("#guessForm button");
const $resultUL = $("#resultList")

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
    
    $resultUL.append(`<li>${guess}: ${result}</li>`)
    $formInput.val('');

    return resp;
}

function showResult(guess, result) {
}