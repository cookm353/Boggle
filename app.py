from boggle import Boggle
from flask import Flask, render_template, request, session, redirect, jsonify

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = "mindboggling"


@app.route('/')
def index():
    board = boggle_game.make_board()
    session['board'] = board
    
    return render_template('index.html', board=session['board'])


@app.route('/check-word')
def check_word():
    guess = request.args['word'].lower()
    board = session['board']
    
    result = boggle_game.check_valid_word(board, guess)
    
    return jsonify({'result': result})