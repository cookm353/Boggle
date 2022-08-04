from boggle import Boggle
from flask import Flask, render_template, request, session, redirect


boggle_game = Boggle()
app = Flask(__name__)
app.config['SECRET_KEY'] = "mindboggling"

# board = boggle_game.make_board()
# session['board'] = board

@app.route('/')
def index():   
    # Only make new board if one doesn't exist in session
    if not session['board']:
        session['board'] = boggle_game.make_board()
        
    print(session['board'])
    return render_template('index.html', board=session['board'])

@app.route('/guess', methods=['POST'])
def submit_guess():
    guess = request.form.get("guess")
    
    guesses = session.get('guesses', [])
    guesses.append(guess)

    session['guess'] = guess
    print(f"Guess: {guess}")
    print(f"Guesses: {session['guesses']}")
    return redirect('/')