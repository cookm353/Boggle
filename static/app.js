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
    
    showResult(guess, result)
    $formInput.val('');
    
    return resp;
}

function showResult(guess, result) {
    console.log(guess)
    let display_result;
    switch(result) {
        case 'ok':
            display_result = "Okay"            ;
            break;
        case 'not-word':
            display_result = 'Not a Word';
            break;
        case 'not-on-board':
            display_result = 'Not on Board'
            break;
    }
    $resultUL.append(`<li>${guess}: ${display_result}</li>`)
}