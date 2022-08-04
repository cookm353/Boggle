## Step 2: Displaying the Board
* Generate the board on the backend using boggle.py
* Send the board to a Jinja template and display it on page
* The board will be used in other routes, so it'll need to be in the session
* Add a form to let the user submit a guess

## Step 3: Checking for Valid Words
* Submitting guesses should be done without reloading the page
    * Make AJAX requests w/ Axios
* Take the form value, use Axios to make an AJAX request, and send it to the server
* 