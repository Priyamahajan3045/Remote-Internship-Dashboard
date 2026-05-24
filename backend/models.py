from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    password_hash = Column(String(255))
    role = Column(Enum("intern", "mentor"), default="intern")

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    description = Column(Text)
    deadline = Column(String(50))
    priority = Column(Enum("Low", "Medium", "High"), default="Low")
    status = Column(Enum("Todo", "In Progress", "Done"), default="Todo")
    intern_id = Column(Integer, ForeignKey("users.id"))
    created_by = Column(Integer, ForeignKey("users.id"))

class WeeklyReport(Base):
    __tablename__ = "weekly_reports"
    id = Column(Integer, primary_key=True, index=True)
    week_number = Column(Integer)
    content = Column(Text)
    submitted_at = Column(DateTime, default=datetime.datetime.utcnow)
    intern_id = Column(Integer, ForeignKey("users.id"))

class Feedback(Base):
    __tablename__ = "feedback"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    report_id = Column(Integer, ForeignKey("weekly_reports.id"))
    mentor_id = Column(Integer, ForeignKey("users.id"))