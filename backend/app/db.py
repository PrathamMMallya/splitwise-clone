from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://splitwise_user:yvY6wSZ8fQPoYNYizrmNE6jHyzciZGhJ@dpg-d197jsvdiees73ak2odg-a.oregon-postgres.render.com/splitwise_fy1s"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

