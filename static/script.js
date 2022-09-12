"use strict";

const Boggle = new Game()
const $bttn = $('button')

// Add letters to guess by clicking on board
$('td').on('click', evt => {
    const $letter = $(evt.target).text().toLowerCase();
    Boggle.addLetter($letter)
})

// Keep page from refreshing when submitting guesses
$('form').on('click', 'button', evt => {
    evt.preventDefault()
})

// Start counting down after first guess
// $('button').on('click', evt => {
$bttn.on('click', evt => {
    evt.preventDefault();
    const timer = setInterval(() => {

        Boggle.tickDown()

        if (Boggle.timeLeft === 0) {
            clearInterval(timer)
            $bttn.off('click')
        }
    }, 100)
})

