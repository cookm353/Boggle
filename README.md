## Step 2: Displaying the Board
* Generate the board on the backend using boggle.py
* Send the board to a Jinja template and display it on page
* The board will be used in other routes, so it'll need to be in the session
* Add a form to let the user submit a guess

## Step 3: Checking for Valid Words
* Submitting guesses should be done without reloading the page
    * Make AJAX requests w/ Axios WITHOUT refreshing the page
* Take the form value, use Axios to make an AJAX request, and send it to the server
* Checking guesses
    1. Get the form value w/ jQuery and make an AJAX request w/ Axios
    2. Use the words variable to check if it's a valid word in the dictionary w/ 
        the words variable in app.py
    3. Make sure it's a valid word on the board using check_valid_word() in 
        boggle.py
    4. Make a JSON response using jsonify from Flask
    5. Send a JSON response with a dictionary of {'result': 'ok'}, 
        {'result': 'not-on-board'}, or {'result': 'not-a-word'} so front end can 
        provide different responses depending on the response
* Front end will display the response

## Step 4: Posting a Score
* Start keeping track of the score
* A word's value is equal to its length
* Score can be stored on the front-end for the time being

## Step 5: Add a Timer
* If a turn lasts for over 60 seconds, lock the game so no more guesses can be
    made

## Step 6: More Stats
* Keep track of how many times the user has played and their best score so far
* When game ends, send an AJAX request to server w/ score stored on front-end
* Increment number of games played and store score on back-end
* Data will be sent as JSON, so data will come to Flask inside request.json, 
    not request.form
* request.json has a different data structure than request.form!

## Step 7: Refectoring
* Try to refactor front-end to OOP
* Make sure view functions have docstrings w/ descriptions
* Make sure players can't submit the same word twice

## Additional Challenges
* Make it prettier
* Before displaying a board, have a form that lets the player decide how large
    they want the board to be
    * The class in boggle.py will need to be changed!
* Offer a hint to players