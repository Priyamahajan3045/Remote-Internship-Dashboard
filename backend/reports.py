from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import WeeklyReport, Feedback
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class ReportData(BaseModel):
    week_number: int
    content: str
    intern_id: int

class FeedbackData(BaseModel):
    content: str
    mentor_id: int

@router.get("/reports/")
def get_reports(intern_id: Optional[int] = None, db: Session = Depends(get_db)):
    if intern_id:
        reports = db.query(WeeklyReport).filter(WeeklyReport.intern_id == intern_id).all()
    else:
        reports = db.query(WeeklyReport).all()
    return reports

@router.post("/reports/")
def create_report(data: ReportData, db: Session = Depends(get_db)):
    report = WeeklyReport(
        week_number=data.week_number,
        content=data.content,
        intern_id=data.intern_id
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    return report

@router.put("/reports/{report_id}")
def update_report(report_id: int, data: ReportData, db: Session = Depends(get_db)):
    report = db.query(WeeklyReport).filter(WeeklyReport.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    report.content = data.content
    report.week_number = data.week_number
    db.commit()
    return report

@router.post("/feedback/{report_id}")
def add_feedback(report_id: int, data: FeedbackData, db: Session = Depends(get_db)):
    feedback = Feedback(
        content=data.content,
        report_id=report_id,
        mentor_id=data.mentor_id
    )
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    return feedback

@router.get("/feedback/{report_id}")
def get_feedback(report_id: int, db: Session = Depends(get_db)):
    feedback = db.query(Feedback).filter(Feedback.report_id == report_id).all()
    return feedback