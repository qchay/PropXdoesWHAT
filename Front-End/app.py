# pylint: disable-all

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/laws/page/<int:page_number>')
def laws(page_number):
	return render_template('laws.html', page_number=page_number)

@app.route('/laws/<law_name>/<int:id_number>')
def law_bio(law_name, id_number):
	return render_template('law_bio.html', law_name=law_name, id_number=id_number)

@app.route('/politicians/page/<int:page_number>')
def politicians(page_number):
	return render_template('politicians.html', page_number=page_number)

@app.route('/politicians/<politician_name>/<int:id_number>')
def politician_bio(politician_name, id_number):
	return render_template('politician_bio.html', politician_name=politician_name, id_number=id_number)

@app.route('/action_groups')
def action_groups():
	return render_template('action_groups.html')

@app.route('/action_groups/<action_group_name>')
def action_group_bio(action_group_name):
	return render_template('action_group_bio.html', action_group_name=action_group_name)

@app.route('/impacted_groups')
def impacted_groups():
	return render_template('impacted_groups.html')

@app.route('/impacted_groups/<impacted_group_name>')
def impacted_group_bio(impacted_group_name):
	return render_template('impacted_group_bio.html', impacted_group_name=impacted_group_name)

@app.route('/about')
def about():
	return render_template('about.html')

if __name__ == '__main__':
	app.run(host='0.0.0.0', debug = True)