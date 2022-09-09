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


class Game {
    constructor() {
        this.secs = 60;
        this.highScore;
        this.currScore;
        this.guesses = [];
        this.currGuess;
    }

    async checkGuess() {
        this.currGuess = $formInput.val();
        const resp = await axios.get(`${submitGuessURL}`, { params: { guess } })
        const result = (resp.data.result);
    
        showResult(guess, result)

        if (result === "ok") {
            updateScoreDisplay(guess);
        }

        $formInput.val('');
        }

    showResult() {

    }

    updateScoreDisplay() {
        let currentScore = $scoreDisplay.text();
        const wordScore = guess.length;
        const newScore = parseInt(currentScore) + wordScore;
    
        $scoreDisplay.text(newScore);
    }

    tickDown() {
        let timeLeft = parseInt($timer.text());

        const timer = setInterval(() => {
            timeLeft--;
            $timer.text(timeLeft)
    
            if (timeLeft === 0) {
                clearInterval(timer);
                $guessBttn.off();
                submitScore()
            }
        }, 1000);
    }
}