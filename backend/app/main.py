from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.db import SessionLocal, engine, Base
from app.crud import user, group, expense
from app.schemas import user as user_schema, group as group_schema, expense as expense_schema
from app.utils import calculate_balances

# Create DB tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI()

# CORS setup to allow React frontend access
origins = [
    "http://localhost:5173",   # Vite React dev server
    "http://127.0.0.1:5173",   # Alternate localhost
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],     # Allow all HTTP methods including OPTIONS
    allow_headers=["*"],
)

# Dependency for getting DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ======== ROUTES ========

# POST /users/ - Create a new user
@app.post("/users/", response_model=user_schema.User)
def create_user(user_req: user_schema.UserCreate, db: Session = Depends(get_db)):
    return user.create_user(db, user_req)

# POST /groups/ - Create a new group
@app.post("/groups/", response_model=group_schema.Group)
def create_group(group_req: group_schema.GroupCreate, db: Session = Depends(get_db)):
    return group.create_group(db, group_req)

# GET /groups/{group_id} - Get group details
@app.get("/groups/{group_id}", response_model=group_schema.Group)
def get_group(group_id: int, db: Session = Depends(get_db)):
    db_group = group.get_group(db, group_id)
    if not db_group:
        raise HTTPException(status_code=404, detail="Group not found")
    return db_group

# POST /groups/{group_id}/expenses - Add an expense
@app.post("/groups/{group_id}/expenses", response_model=expense_schema.Expense)
def add_expense(group_id: int, expense_req: expense_schema.ExpenseCreate, db: Session = Depends(get_db)):
    return expense.add_expense(db, group_id, expense_req)

# GET /groups/{group_id}/balances - Get calculated balances
@app.get("/groups/{group_id}/balances")
def get_group_balances(group_id: int, db: Session = Depends(get_db)):
    db_group = group.get_group(db, group_id)
    if not db_group:
        raise HTTPException(status_code=404, detail="Group not found")
    return calculate_balances(db_group)
