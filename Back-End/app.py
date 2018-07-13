# pylint: disable-all
from flask import Flask
from flask_restless import APIManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://Propxdoeswhat:Propxdoeswhat@propxdoeswhatdb.cnsfq0o1clx8.us-east-2.rds.amazonaws.com/PropxdoeswhatDB'
db = SQLAlchemy(app)
CORS(app)

# politicians_laws=db.Table('politicians_laws',
# 	db.Column('politician_id',db.Integer, db.ForeignKey('politicians.id')),
# 	db.Column('laws_id',db.Integer, db.ForeignKey('laws.id'))
# 	# db.Column('affected_id',db.Integer, db.ForeignKey('affected_groups.id')),
# 	# db.Column('action_id',db.Integer, db.ForeignKey('action_groups.id'))
# 	)

# laws_affected=db.Table('laws_affected',
# 	db.Column('laws_id',db.Integer, db.ForeignKey('laws.id')),
# 	db.Column('affected_id',db.Integer, db.ForeignKey('affected_groups.id'))
# 	# db.Column('affected_id',db.Integer, db.ForeignKey('affected_groups.id')),
# 	# db.Column('action_id',db.Integer, db.ForeignKey('action_groups.id'))
# 	)

# affected_action=db.Table('affected_action',
# 	db.Column('affected_id',db.Integer, db.ForeignKey('affected_groups.id')),
# 	db.Column('action_id',db.Integer, db.ForeignKey('action_groups.id'))
# 	# db.Column('affected_id',db.Integer, db.ForeignKey('affected_groups.id')),
# 	# db.Column('action_id',db.Integer, db.ForeignKey('action_groups.id'))
# 	)

class Politicians (db.Model):
	id = db.Column(db.Integer, primary_key=True, nullable=False)
	first_name = db.Column(db.Unicode, nullable=False)
	last_name = db.Column(db.Unicode, nullable=False)
	dob = db.Column(db.Unicode, nullable=False) 
	bio_id = db.Column(db.Unicode, nullable=False) 
	chamber = db.Column(db.Unicode, nullable=False) 
	state = db.Column(db.Unicode, nullable=False)
	party = db.Column(db.Unicode, nullable=False)
	site = db.Column(db.Unicode, nullable=False)
	contact_form = db.Column(db.Unicode, nullable=False)
	phone = db.Column(db.Unicode, nullable=False)
	law = db.relationship('Laws', backref='sponsor')
	#raw = db.Column(db.Unicode, nullable=False)

class Laws (db.Model):
	id = db.Column(db.Integer, primary_key=True, nullable=False)
	bill_id = db.Column(db.Unicode, nullable=False)
	name = db.Column(db.Unicode, nullable=False)
	title = db.Column(db.Unicode, nullable=False)
	subject = db.Column(db.Unicode, nullable=False)
	sponsor_id = db.Column(db.Integer,db.ForeignKey('politicians.id'))
	sponsor_bio_id = db.Column(db.Unicode, nullable=False)
	cdotgov_url = db.Column(db.Unicode, nullable=False)
	govtrack_url = db.Column(db.Unicode, nullable=False)
	introduced = db.Column(db.Unicode, nullable=False)
	last_vote = db.Column(db.Unicode, nullable=False)
	house_pass = db.Column(db.Unicode, nullable=False)
	senate_pass = db.Column(db.Unicode, nullable=False)
	enacted = db.Column(db.Unicode, nullable=False)
	vetoed = db.Column(db.Unicode, nullable=False)
	desc = db.Column(db.Unicode, nullable=False)

class Affected_groups (db.Model):
	id = db.Column(db.Integer, primary_key=True, nullable=False)
	name = db.Column(db.Unicode, nullable=False)
	description = db.Column(db.Unicode, nullable=False)

class Action_groups (db.Model):
	id = db.Column(db.Integer, primary_key=True, nullable=False)
	name = db.Column(db.Unicode, nullable=False)
	description = db.Column(db.Unicode, nullable=False)

manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Politicians, methods =['GET'], results_per_page=12)
manager.create_api(Laws, methods =['GET'], results_per_page=12)
manager.create_api(Affected_groups, methods =['GET'], results_per_page=12)
manager.create_api(Action_groups, methods =['GET'], results_per_page=12)

app.run(host ='0.0.0.0', debug = True)

