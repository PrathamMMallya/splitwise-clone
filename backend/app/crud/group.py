from sqlalchemy.orm import Session
from app.models.group import Group
from app.models.user import User
from app.schemas.group import GroupCreate

def create_group(db: Session, group: GroupCreate):
    users = db.query(User).filter(User.id.in_(group.user_ids)).all()
    db_group = Group(name=group.name, users=users)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group

def get_group(db: Session, group_id: int):
    return db.query(Group).filter(Group.id == group_id).first()

