from flask import Blueprint, jsonify
from sqlalchemy.exc import SQLAlchemyError
from models.transaction_model import Transaction
from schemas.transaction_schema import TransactionOutput

blp = Blueprint('TransactionPutRequests',__name__)

@blp.get("/")
def HelloWorld():
    return {"Message":"Welcome To The Transaction API Manager Solution"},200

@blp.get('/db_health')
def health_check():
    try:
        # Attempt to execute a simple query
        transaction_count = Transaction.query.count()

        return jsonify({
            "status": "success",
            "message": "Database connection is healthy",
            "transaction_count": transaction_count
        }), 200

    except SQLAlchemyError as e:
        # Handle database connection errors
        return jsonify({
            "status": "error",
            "message": "Database connection failed",
            "error": str(e)
        }), 500

@blp.get('/transactions')
def get_transactions():
    try:
        transactions = Transaction.query.all()

        # Return all transactions using the TransactionOutput schema
        return jsonify([TransactionOutput(
            id=txn.id,
            amount=txn.amount,
            date=txn.date,
            type=txn.type,
            description=txn.description
        ).dict() for txn in transactions]), 200

    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500

# Get a single transaction by ID
@blp.get('/transactions/<int:txn_id>')
def get_transaction(txn_id):
    try:
        txn = Transaction.query.get(txn_id)
        if txn:
            # Return the transaction using the TransactionOutput schema
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
        return jsonify({"error": str(e)}), 500

