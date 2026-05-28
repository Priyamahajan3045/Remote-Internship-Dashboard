from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from database import get_db
from models import WeeklyReport, Feedback
from pydantic import BaseModel
from typing import Optional
import os
import shutil

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

class ReportData(BaseModel):
    week_number: int
    content: str
    intern_id: int

class FeedbackData(BaseModel):
    content: str
    mentor_id: int
    document_path: Optional[str] = None

@router.get("/reports/")
def get_reports(db: Session = Depends(get_db)):
    reports = db.query(WeeklyReport).all()
    return reports

@router.post("/reports/")
def create_report(data: ReportData, db: Session = Depends(get_db)):
    report = WeeklyReport(
        week_number=data.week_number,
        content=data.content,
        intern_id=data.intern_id,
        status="Pending"
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    return report

@router.post("/reports/{report_id}/upload")
async def upload_report_document(report_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_path = f"{UPLOAD_DIR}/{report_id}_{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    report = db.query(WeeklyReport).filter(WeeklyReport.id == report_id).first()
    if report:
        report.document_path = file_path
        db.commit()
    return {"document_path": file_path}

@router.put("/reports/{report_id}")
def update_report(report_id: int, data: ReportData, db: Session = Depends(get_db)):
    report = db.query(WeeklyReport).filter(WeeklyReport.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    report.content = data.content
    report.week_number = data.week_number
    db.commit()
    return report

@router.put("/reports/{report_id}/status")
def update_report_status(report_id: int, status: str, db: Session = Depends(get_db)):
    report = db.query(WeeklyReport).filter(WeeklyReport.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    report.status = status
    db.commit()
    return report

@router.post("/feedback/{report_id}")
def add_feedback(report_id: int, data: FeedbackData, db: Session = Depends(get_db)):
    feedback = Feedback(
        content=data.content,
        report_id=report_id,
        mentor_id=data.mentor_id,
        document_path=data.document_path
    )
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    return feedback

@router.post("/feedback/{report_id}/upload")
async def upload_feedback_document(report_id: int, file: UploadFile = File(...)):
    file_path = f"{UPLOAD_DIR}/feedback_{report_id}_{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"document_path": file_path}

@router.get("/feedback/{report_id}")
def get_feedback(report_id: int, db: Session = Depends(get_db)):
    feedback = db.query(Feedback).filter(Feedback.report_id == report_id).all()
    return feedback