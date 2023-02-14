# Imports
from flask import Flask, request, render_template, send_from_directory
import json




# Make the flask application
app = Flask(__name__)




# Website root
@app.route("/")
def root():
    return "Hello, World!"




# Run the flask app
if __name__ == "__main__":
    app.run()