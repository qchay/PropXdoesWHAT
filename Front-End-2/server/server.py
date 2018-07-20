# server.py
from flask import Flask, render_template

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/laws/page/<int:page_number>')
def laws(page_number):
    return render_template('index.html', page_number=page_number)


@app.route('/laws/<law_name>/<int:id_number>')
def law_bio(law_name, id_number):
    return render_template('index.html', law_name=law_name, id_number=id_number)


@app.route('/politicians/page/<int:page_number>')
def politicians(page_number):
    return render_template('index.html', page_number=page_number)


@app.route('/politicians/<politician_name>/<int:id_number>')
def politician_bio(politician_name, id_number):
    return render_template('index.html', politician_name=politician_name, id_number=id_number)


@app.route('/action_groups/page/<int:page_number>')
def action_groups(page_number):
    return render_template('index.html', page_number=page_number)


@app.route('/action_groups/<action_group_name>/<int:id_number>')
def action_group_bio(action_group_name, id_number):
    return render_template('index.html', action_group_name=action_group_name, id_number=id_number)


@app.route('/affected_groups/page/<int:page_number>')
def affected_groups(page_number):
    return render_template('index.html', page_number=page_number)


@app.route('/affected_groups/<affected_group_name>')
def affected_group_bio(affected_group_name):
    return render_template('index.html', affected_group_name=affected_group_name)


@app.route('/about')
def about():
    return render_template('index.html')


if __name__ == "__main__":
	app.run(host='0.0.0.0', debug=True)