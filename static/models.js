/**
 * Functions to implement:
 * -Adding letters by clicking on board
 * -Decrementing timer
 * -Checking user's guess
 * -Add guess to word list or give feedback for invalid word
 * -Update score display
 * -Submit score and compare w/ high score
 */
 const $formInput = $("#guess");
 const submitGuessURL = 'http://localhost:5000/check-word';
const updateStatsURL = 'http://localhost:5000/update-stats';

class Game {
    constructor() {
        this.timeLeft = 60;
        this.currScore = 0;
        this.guesses = [];
        this.highScore, this.gamesPlayed, this.currGuess;
        this.updateStats();
    }

    getGuess() {
        return $('input').val();
    }

    addLetter(letter) {
        const $guess = $('input').val();
        $('input').val($guess + letter);
    }

    // Decrement and update timer
    tickDown() {
        this.timeLeft -= 1;
        $('#timer').text(this.timeLeft)
    }
    
    async checkGuess(guess) {
        this.currGuess = $formInput.val();
        const resp = await axios.get(`${submitGuessURL}`, { params: { guess } })
        const result = (resp.data.result);
        
        showResult(guess, result)
        
        if (result === "ok") {
            updateScoreDisplay(guess);
        }
        
        $formInput.val('');
    }
    
    // Submit score after game timer has reached 0
    async submitScore() {
        pass    
    }
    
    async updateStats() {
        const resp = await axios.get(`${updateStatsURL}`, { params: { score: this.currScore } });
        this.highScore = resp.data.high_score;
        this.gamesPlayed = resp.data.games_played;
        $('#high_score') = this.highScore;
    }
    
    showResult() {

    }

    updateScoreDisplay() {
        let currentScore = $scoreDisplay.text();
        const wordScore = guess.length;
        const newScore = parseInt(currentScore) + wordScore;
    
        $scoreDisplay.text(newScore);
    }


}