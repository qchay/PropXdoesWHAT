# pylint: disable-all
from flask import Flask, jsonify, g
from flask_restless import APIManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from elasticsearch import Elasticsearch
import sys

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://Propxdoeswhat:Propxdoeswhat@propxdoeswhatdb.cnsfq0o1clx8.us-east-2.rds.amazonaws.com/PropxdoeswhatDB'
db = SQLAlchemy(app)
CORS(app)

es = Elasticsearch(["http://search-propxdoeswhat-4wzolamil7fvs4ylzdfayxl6va.us-east-2.es.amazonaws.com:80"])

# adapted from blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xvi-full-text-search
def query_index(index, type, query, page, per_page):
    if not es:
        return [], 0
    search = es.search(
        index=index, doc_type=type,
        body={'query': {'match': {'merged': query}},
              'from': (page - 1) * per_page, 'size': per_page})
    ids = [int(hit['_id']) for hit in search['hits']['hits']]
    return ids, search['hits']['total']

class SearchableMixin(object):
    @classmethod
    def search(cls, query, page, per_page):
        type = cls.__tablename__ if cls.__tablename__ != 'laws' else 'law'
        ids, total = query_index(cls.__tablename__, type, query, page, per_page)
        return ids, total
        
    @classmethod
    def query(cls):
        query = db.session.query(cls)
        ids = g.pop('search_ids', None)
        if ids is not None:
            if ids != []:
                query = query.filter(cls.id.in_(ids))
                if('has_order' not in g):
                    when = []
                    for i in range(len(ids)):
                        when.append((ids[i], i))
                    query = query.order_by(db.case(when, value=cls.id))
            else:
                query = query.filter(cls.id.in_([0]))
        return query
    
    @classmethod
    def get_pre_handler(cls):
        def pre_handler(search_params=None, **kw):
            query = search_params.pop('search', None)
            #print(query, file=sys.stderr)
            if query is not None:
                hits, total = cls.search(query, 1, 64)
                g.setdefault('search_ids', hits)
                if('order_by' in search_params):
                    g.setdefault('has_order', True)
        return pre_handler

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


class Politicians (SearchableMixin, db.Model):
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

class Laws (SearchableMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    bill_id = db.Column(db.Unicode, nullable=False)
    name = db.Column(db.Unicode, nullable=False)
    title = db.Column(db.Unicode, nullable=False)
    subject = db.Column(db.Unicode, nullable=False)
    sponsor_id = db.Column(db.Integer, db.ForeignKey('politicians.id'))
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


class Action_groups (SearchableMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.Unicode, nullable=False)
    url = db.Column(db.Unicode, nullable=False)
    type = db.Column(db.Unicode, nullable=False)
    desc = db.Column(db.Unicode, nullable=False)

manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Politicians, methods=['GET'],
                   preprocessors={'GET_MANY': [Politicians.get_pre_handler()]},
                   results_per_page=12)
manager.create_api(Laws, methods=['GET'],
                   preprocessors={'GET_MANY': [Laws.get_pre_handler()]},
                   results_per_page=12)
manager.create_api(Affected_groups, methods=['GET'], results_per_page=12)
manager.create_api(Action_groups, methods=['GET'],
                   preprocessors={'GET_MANY': [Action_groups.get_pre_handler()]},
                   results_per_page=12)

app.run(host='0.0.0.0', debug=True)
