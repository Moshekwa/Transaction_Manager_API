import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from dotenv import load_dotenv

load_dotenv()
db = SQLAlchemy()
ma = Marshmallow()

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        "DATABASE_URL", "postgresql://myuser:mypassword@db:5432/transactions_db"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    ma.init_app(app)

    class Transaction(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        amount = db.Column(db.Numeric, nullable=False)
        date = db.Column(db.DateTime, nullable=False)
        type = db.Column(db.String(10), nullable=False)
        description = db.Column(db.String(255), nullable=True)

    # Marshmallow schema for serialization
    class TransactionSchema(ma.SQLAlchemyAutoSchema):
        class Meta:
            model = Transaction

    transaction_schema = TransactionSchema()
    transactions_schema = TransactionSchema(many=True)

    # Ensure database tables exist
    with app.app_context():
        db.create_all()

    # ------------------- ROUTES -------------------

    # Get all transactions
    @app.route("/transactions", methods=["GET"])
    def get_transactions():
        transactions = Transaction.query.all()
        return jsonify(transactions_schema.dump(transactions))

    # Get a single transaction by ID
    @app.route("/transactions/<int:transaction_id>", methods=["GET"])
    def get_transaction(transaction_id):
        transaction = Transaction.query.get(transaction_id)
        if not transaction:
            return jsonify({"error": "Transaction not found"}), 404
        return jsonify(transaction_schema.dump(transaction))

    # Create a new transaction
    @app.route("/transactions", methods=["POST"])
    def create_transaction():
        data = request.get_json()
        if "amount" not in data or "type" not in data or "date" not in data:
            return jsonify({"error": "Missing required fields"}), 400
        if data["type"] not in ["credit", "debit"]:
            return jsonify({"error": "Invalid transaction type"}), 400

        new_transaction = Transaction(
            amount=data["amount"],
            date=data["date"],
            type=data["type"],
            description=data.get("description", "")
        )
        db.session.add(new_transaction)
        db.session.commit()
        return jsonify(transaction_schema.dump(new_transaction)), 201

    # Update an existing transaction
    @app.route("/transactions/<int:transaction_id>", methods=["PUT"])
    def update_transaction(transaction_id):
        transaction = Transaction.query.get(transaction_id)
        if not transaction:
            return jsonify({"error": "Transaction not found"}), 404

        data = request.get_json()
        transaction.amount = data.get("amount", transaction.amount)
        transaction.date = data.get("date", transaction.date)
        transaction.type = data.get("type", transaction.type)
        transaction.description = data.get("description", transaction.description)

        db.session.commit()
        return jsonify(transaction_schema.dump(transaction))

    # Delete a transaction
    @app.route("/transactions/<int:transaction_id>", methods=["DELETE"])
    def delete_transaction(transaction_id):
        transaction = Transaction.query.get(transaction_id)
        if not transaction:
            return jsonify({"error": "Transaction not found"}), 404

        db.session.delete(transaction)
        db.session.commit()
        return jsonify({"message": "Transaction deleted successfully"}), 200

    return app
