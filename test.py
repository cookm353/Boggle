from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class FlaskTests(TestCase):
    # TODO -- write tests for every view function / feature!
    def test_page_display(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn("<h1>Hi!</h1>", html)
    
    def test_guess_submit(self):
        with app.test_client() as client:
            # with client.session_transaction() as change_session:
            #     change_session['guess'] = 'foo'
                
            resp = client.post("/guess", data={'guess': "foo"})
            # html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 302)
            
    def test_redirect(self):
        with app.test_client() as client:
            resp = client.get('/guess')
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 302)
            
    def test_redirect_follow(self):
        with app.test_client() as client:
            resp = client.get('/guess')