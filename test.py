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
