from boggle import Boggle
from flask import Flask, render_template, request, session, redirect, jsonify

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = "mindboggling"


@app.route('/')
def index():
    board = boggle_game.make_board()
    session['board'] = board
    
    return render_template('index.html', board=session['board'], 
                           high_score=session.get('high_score', 0))


@app.route('/check-word')
def check_word():
    guess = request.args['guess'].lower()
    board = session['board']
    
    result = boggle_game.check_valid_word(board, guess)
    
    return jsonify({'result': result})


@app.route('/update-stats')
def update_stats():
    # Update high score
    score = int(request.args['score'])
    
    if score > session.get('high_score', 0):
        session['high_score'] = score
    
    # Update times played
    session['games_played'] = session.get('games_played', 0) + 1
        
    return jsonify({'high_score': session['high_score'],
                    'games_played': session['games_played']})
    return redirect('/')