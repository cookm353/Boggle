from boggle import Boggle
from flask import Flask, render_template, request, session, redirect


boggle_game = Boggle()
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')