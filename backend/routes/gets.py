from flask import Blueprint, jsonify
from sqlalchemy.exc import SQLAlchemyError
from models.transaction_model import Transaction

blp = Blueprint('TransactionGetRequests',__name__)

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

