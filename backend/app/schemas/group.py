from pydantic import BaseModel
from typing import List
from app.schemas.user import User

class GroupCreate(BaseModel):
    name: str
    user_ids: List[int]

class Group(BaseModel):
    id: int
    name: str
    users: List[User]

    class Config:
        orm_mode = True
