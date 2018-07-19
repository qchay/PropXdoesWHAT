# server.py
from flask import Flask, render_template

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/example/page/<int:page_number>")
def mang(page_number):
    return render_template("index.html", page_number=page_number)

@app.route('/politicians/page/<int:page_number>')
def politicians(page_number):
    return render_template('index.html', page_number=page_number)

@app.route("/hello")
def hello():
    return "Hello World!"

if __name__ == "__main__":
	app.run(host='0.0.0.0', debug=True)