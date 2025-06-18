from pydantic import BaseModel
from typing import Dict

class ExpenseCreate(BaseModel):
    description: str
    amount: float
    paid_by: int
    split_type: str  # "equal" or "percentage"
    splits: Dict[int, float]  # {user_id: percentage or amount}

class Expense(BaseModel):
    id: int
    description: str
    amount: float
    paid_by: int
    split_type: str
    splits: Dict[int, float]

    class Config:
        orm_mode = True
 
