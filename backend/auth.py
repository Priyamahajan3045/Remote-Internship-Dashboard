from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User
from passlib.context import CryptContext
from jose import jwt
from pydantic import BaseModel

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "internship_secret_key"

class RegisterData(BaseModel):
    name: str
    email: str
    password: str
    role: str

class LoginData(BaseModel):
    email: str
    password: str

class ChangePasswordData(BaseModel):
    old_password: str
    new_password: str

@router.post("/auth/register")
def register(data: RegisterData, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = pwd_context.hash(data.password[:72])
    user = User(name=data.name, email=data.email, password_hash=hashed, role=data.role)
    db.add(user)
    db.commit()
    return {"message": "Registration successful"}

@router.post("/auth/login")
def login(data: LoginData, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not pwd_context.verify(data.password[:72], user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = jwt.encode({"id": user.id, "role": user.role}, SECRET_KEY, algorithm="HS256")
    return {"token": token, "role": user.role, "user_id": user.id, "name": user.name}

@router.get("/users/")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return [{"id": u.id, "name": u.name, "email": u.email, "role": u.role} for u in users]

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}

@router.put("/users/{user_id}/reset-password")
def reset_password(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    new_password = "intern123"
    user.password_hash = pwd_context.hash(new_password[:72])
    db.commit()
    return {"message": "Password reset to 'intern123'"}

@router.put("/users/{user_id}/change-password")
def change_password(user_id: int, data: ChangePasswordData, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not pwd_context.verify(data.old_password[:72], user.password_hash):
        raise HTTPException(status_code=400, detail="Old password is incorrect")
    user.password_hash = pwd_context.hash(data.new_password[:72])
    db.commit()
    return {"message": "Password changed successfully"}
class ForgotPasswordData(BaseModel):
    email: str
    new_password: str

@router.post("/auth/forgot-password")
def forgot_password(data: ForgotPasswordData, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email not found")
    user.password_hash = pwd_context.hash(data.new_password[:72])
    db.commit()
    return {"message": "Password reset successfully"}