const $formInput = $("#guess");
const submitGuessURL = 'http://localhost:5000/check-word';
const updateStatsURL = 'http://localhost:5000/update-stats';

class Game {
    constructor() {
        this.timeLeft = 60;
        this.currScore = 0;
        this.guesses = new Set();
        this.highScore, this.gamesPlayed, this.currGuess;
        this.updateStats();
    }

    addLetter(letter) {
        /**
         * Add letter to current guess
         * (used for clicking on letters)
         */
        const $guess = $('input').val();
        $('input').val($guess + letter);
    }

    tickDown() {
        /**
         * Decrement and update timer
         */
        this.timeLeft -= 1;
        $('#timer').text(this.timeLeft)
    }
    
    async checkGuess() {
        /**
         * Check current guess
         * Add to list of guesses if valid and update score
         */
        this.currGuess = $formInput.val();

        if (this.guesses.has(this.currGuess)) {
            this.showInvalidWordMessage('Word Already Used');
        } else {
            this.guesses.add(this.currGuess);
            const resp = await axios.get(`${submitGuessURL}`, { params: { guess: this.currGuess } })
            const result = (resp.data.result);
            
            this.showResult(this.currGuess, result)
            
            if (result === "ok") {
                this.updateScoreDisplay(this.currGuess);
            } 
        }    
        $formInput.val('');
    }
    
    async updateStats() {
        /**
         * Submit current score to server
         * to update number of games played and (potentially)
         * update high score
         */
        const score = this.currScore;
        const resp = await axios.get(`${updateStatsURL}`, { params: { score } });
        this.highScore = resp.data.high_score;
        this.gamesPlayed = resp.data.games_played;
        $('#high_score').text(this.highScore);
        
    }
    
    showResult(guess, result) {
        /**
         * Display valid words or provide error message
         * if word is invalid
         */
        let display_result;
        
        if (result === 'ok') {
            $('ul').append(`<li>${guess}</li>`)
        } else {
            if (result === 'not-word') { 
                display_result = 'Not a Word'; 
            } else {
                display_result = 'Not on Board'
            }
            this.showInvalidWordMessage(display_result)
        }
    }

    showInvalidWordMessage(display_result) {
        /**
         * Display message for invalid words
         */
        const $invalidWordDisplay = $('#invalidWord');

        $invalidWordDisplay.fadeIn(0);
        $invalidWordDisplay.text(display_result);
        $invalidWordDisplay.fadeOut(2000);
    }

    updateScoreDisplay(guess) {
        /**
         * Update current score
         */
        let currentScore = $('#score').text();
        const wordScore = guess.length;
        const newScore = parseInt(currentScore) + wordScore;
        this.currScore = newScore;
    
        $('#score').text(newScore);
    }
}