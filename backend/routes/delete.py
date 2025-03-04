
from flask import Blueprint, jsonify, request
from models.transaction_model import Transaction
from db.db_service import db

from sqlalchemy.exc import SQLAlchemyError

blp = Blueprint('TransactionDeleteOperation',__name__)

# Delete a transaction by ID
@blp.delete('/transactions/<int:txn_id>')
def delete_transaction(txn_id):
    try:
        txn = Transaction.query.get(txn_id)
        if txn:
            db.session.delete(txn)
            db.session.commit()

            return jsonify({"message": "Transaction deleted", "id": txn.id}), 200
        else:
            return jsonify({"error": "Transaction not found"}), 404
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500