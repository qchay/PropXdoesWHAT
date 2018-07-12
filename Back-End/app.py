# pylint: disable-all
from flask import Flask
from flask_restless import APIManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://Propxdoeswhat:Propxdoeswhat@propxdoeswhatdb.cnsfq0o1clx8.us-east-2.rds.amazonaws.com/PropxdoeswhatDB'
db = SQLAlchemy(app)
CORS(app)

class politicians (db.Model):
	id = db.Column(db.Integer, primary_key=True, nullable=False)
	first_name = db.Column(db.Unicode, nullable=False)
	last_name = db.Column(db.Unicode, nullable=False)
	chamber = db.Column(db.Unicode, nullable=False) 
	state = db.Column(db.Unicode, nullable=False)
	party = db.Column(db.Unicode, nullable=False)
	site = db.Column(db.Unicode, nullable=False)
	contact_form = db.Column(db.Unicode, nullable=False)
	phone = db.Column(db.Unicode, nullable=False)
	#raw = db.Column(db.Unicode, nullable=False)

manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(politicians, methods =['GET'])

app.run(host ='0.0.0.0', debug = True)