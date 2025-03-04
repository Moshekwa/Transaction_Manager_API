from flask import Blueprint

blp = Blueprint('TransactionGetRequests',__name__)

@blp.get("/")
def HelloWorld():
    return {"Message":"Welcome To The Transaction API Manager Solution"},200
