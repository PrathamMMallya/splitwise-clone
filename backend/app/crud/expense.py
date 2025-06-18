from sqlalchemy.orm import Session
from app.models.expense import Expense
from app.models.group import Group
from app.schemas.expense import ExpenseCreate

def add_expense(db: Session, group_id: int, expense: ExpenseCreate):
    db_expense = Expense(
        description=expense.description,
        amount=expense.amount,
        paid_by=expense.paid_by,
        group_id=group_id,
        split_type=expense.split_type,
        splits=expense.splits
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

def get_expenses_for_group(db: Session, group_id: int):
    return db.query(Expense).filter(Expense.group_id == group_id).all()

