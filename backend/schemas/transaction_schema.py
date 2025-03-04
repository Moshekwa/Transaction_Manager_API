from pydantic import BaseModel, conint, constr
from datetime import datetime
from typing import Literal

# Input Schema for Transaction Creation and Update
class TransactionInput(BaseModel):
    amount: conint(ge=-1_000_000, le=1_000_000) # We assume the range to be between these two values and allow for -ve
    type: Literal["credit", "debit"]  # Type must be either "credit" or "debit"
    description: constr(min_length=1, max_length=255)  # Description must be a non-empty string

# Output Schema for Transaction Response
class TransactionOutput(BaseModel):
    id: int
    amount: int
    date: datetime # YYYY-MM-DD
    type: Literal["credit", "debit"]
    description: str