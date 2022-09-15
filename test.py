from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class FlaskTests(TestCase):
    # TODO -- write tests for every view function / feature!
    def test_homepage(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn("<h1>Boggle</h1>", html)
            self.assertIn('board', session)
            self.assertIsNone(session.get('high_score'))
            self.assertIsNone(session.get('games_played'))
            self.assertIn('<h3 id="timer">60</h3>', html)
        
    def test_valid_word(self):
        with app.test_client() as client:
            with client.session_transaction() as session:
                session['board'] = [['O', 'L', 'D', 'U', 'R'],
                                    ['W', 'D', 'C', 'J', "G"],
                                    ['E', 'A', 'X', 'X', 'H'],
                                    ['N', 'D', 'S', 'F', 'E'],
                                    ['H', 'D', 'U', 'L', 'N']]
            resp = client.get('/check-word?guess=cur')
            self.assertEqual(resp.json['result'], 'ok')
            
    def test_missing_word(self):
        with app.test_client() as client:
            with client.session_transaction() as session:
                session['board'] = [['O', 'L', 'D', 'U', 'R'],
                                    ['W', 'D', 'C', 'J', "G"],
                                    ['E', 'A', 'X', 'X', 'H'],
                                    ['N', 'D', 'S', 'F', 'E'],
                                    ['H', 'D', 'U', 'L', 'N']]
            resp = client.get('/check-word?guess=felt')
            self.assertEqual(resp.json['result'], 'not-on-board')
            
    def test_non_word(self):
        with app.test_client() as client:
            with client.session_transaction() as session:
                session['board'] = [['O', 'L', 'D', 'U', 'R'],
                                    ['W', 'D', 'C', 'J', "G"],
                                    ['E', 'A', 'X', 'X', 'H'],
                                    ['N', 'D', 'S', 'F', 'E'],
                                    ['H', 'D', 'U', 'L', 'N']]
            resp = client.get('/check-word?guess=asdf')
            self.assertEqual(resp.json['result'], 'not-word')
    
    def test_stats(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['high_score'] = 42
                change_session['games_played'] = 80
                
            resp = client.get('/')
            self.assertEqual(resp.status_code, 200)
            self.assertIsNotNone(session.get('high_score'))
            self.assertEqual(session['high_score'], 42)
            self.assertEqual(session['games_played'], 80)