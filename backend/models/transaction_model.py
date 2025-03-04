from datetime import datetime
from ..db.db_service import db

class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime, nullable=False)
    type = db.Column(db.String(10), nullable=False)  # 'credit' or 'debit'
    description = db.Column(db.String(255), nullable=False)
