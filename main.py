# Imports
from flask import Flask, request, render_template, send_from_directory
import json




# Make the flask application
app = Flask(__name__, template_folder="./resources/templates/", static_folder="./resources/static")




# Website root
@app.route("/")
def root():
    return render_template("index.html", page_title="Home")




# Run the flask app
if __name__ == "__main__":
    app.run()