# 💸 Splitwise Clone

A full-stack expense-sharing web application inspired by Splitwise, built using **FastAPI**, **PostgreSQL**, **React**, **TypeScript**, and **TailwindCSS**.

---

## 🔧 Features

- 👥 Create and manage groups
- ➕ Add shared expenses with ease
- 🧾 View individual and group balances
- ⚖️ Automatic calculation of who owes whom
- 🎨 Beautiful UI with responsive design and animations

---

## 🖼️ UI Preview

> Include screenshots or a Loom demo here!

---

## 🏗️ Tech Stack

| Frontend          | Backend          | Database     | Deployment |
|------------------|------------------|--------------|------------|
| React + Vite     | FastAPI (Python) | PostgreSQL   | Render.com |
| TypeScript       | SQLAlchemy       | Render-hosted DB | GitHub |
| TailwindCSS      | Pydantic         |              |           |

---

---

## 🚀 Getting Started

### 🐍 Backend (FastAPI)

#### 📦 Install dependencies

```bash
cd backend
pip install -r requirements.txt

pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic

uvicorn app.main:app --reload

```
## 🌐 Frontend (React + Vite)
### 📦 Install dependencies
```
cd frontend

npm install

npm run dev
```
## 🌍 Deployment
Database: Hosted on Render PostgreSQL

### .env Example (Backend)

    DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<db_name>
### Update backend/app/db.py to use this with:
    from dotenv import load_dotenv
    import os
    
    load_dotenv()
    SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

###  TODOs

 Invite users via email

 Responsive mobile support

