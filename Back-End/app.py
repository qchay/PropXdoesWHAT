from flask import Flask

from flask_restless import APIManager

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://Propxdoeswhat:Propxdoeswhat@propxdoeswhatdb.cnsfq0o1clx8.us-east-2.rds.amazonaws.com/PropxdoeswhatDB'

db = SQLAlchemy(app)

class politicians (db.Model):
   first_name = db.Column(db.Unicode)
   last_name = db.Column(db.Unicode)
   state = db.Column(db.Unicode)
   politician_id = db.Column(db.Integer, primary_key=True)

manager = APIManager(app, flask_sqlalchemy_db=db)

manager.create_api(politicians, methods =['GET'])

app.run(host ='0.0.0.0')