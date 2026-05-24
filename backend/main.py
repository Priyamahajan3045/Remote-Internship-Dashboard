from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models
from auth import router as auth_router
from tasks import router as tasks_router
from reports import router as reports_router

app = FastAPI()

# Database tables banana
Base.metadata.create_all(bind=engine)

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router)
app.include_router(tasks_router)
app.include_router(reports_router)

@app.get("/")
def read_root():
    return {"message": "Internship Dashboard API Running!"}