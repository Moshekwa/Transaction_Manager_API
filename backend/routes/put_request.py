from flask import Blueprint, jsonify, request
from models.transaction_model import Transaction
from db.db_service import db
from datetime import datetime
from schemas.transaction_schema import TransactionInput
from schemas.transaction_schema import TransactionOutput

from pydantic import ValidationError
from sqlalchemy.exc import SQLAlchemyError

blp = Blueprint('TransactionPostRequests',__name__)

# Update a transaction by ID
@blp.put('/transactions/<int:txn_id>')
def update_transaction(txn_id):
    try:
        # Validate input data using the TransactionInput schema
        data = TransactionInput(**request.get_json())
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400

    try:
        txn = Transaction.query.get(txn_id)
        if txn:
            # Update the transaction
            txn.amount = data.amount
            txn.type = data.type
            txn.description = data.description
            db.session.commit()

            # Return the updated transaction using the TransactionOutput schema
            return jsonify(TransactionOutput(
                id=txn.id,
                amount=txn.amount,
                date=txn.date,
                type=txn.type,
                description=txn.description
            ).dict()), 200
        else:
            return jsonify({"error": "Transaction not found"}), 404
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500