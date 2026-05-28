from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Task
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class TaskData(BaseModel):
    title: str
    description: str
    deadline: str
    priority: str
    status: str
    intern_id: int
    created_by: int

class TaskUpdate(BaseModel):
    status: Optional[str] = None
    priority: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[str] = None

@router.get("/tasks/")
def get_tasks(intern_id: Optional[int] = None, db: Session = Depends(get_db)):
    if intern_id:
        tasks = db.query(Task).filter(Task.intern_id == intern_id).all()
    else:
        tasks = db.query(Task).all()
    return tasks

@router.post("/tasks/")
def create_task(data: TaskData, db: Session = Depends(get_db)):
    task = Task(
        title=data.title,
        description=data.description,
        deadline=data.deadline,
        priority=data.priority,
        status=data.status,
        intern_id=data.intern_id,
        created_by=data.created_by
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.put("/tasks/{task_id}")
def update_task(task_id: int, data: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if data.status: task.status = data.status
    if data.priority: task.priority = data.priority
    if data.title: task.title = data.title
    if data.description: task.description = data.description
    if data.deadline: task.deadline = data.deadline
    db.commit()
    return task

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"message": "Task deleted"}
@router.get("/interns/")
def get_interns(db: Session = Depends(get_db)):
    from models import User
    interns = db.query(User).filter(User.role == "intern").all()
    return [{"id": u.id, "name": u.name, "email": u.email} for u in interns]