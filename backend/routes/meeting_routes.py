from fastapi import APIRouter, UploadFile, File, Form
from database import audio_collection
from datetime import datetime
import os
import shutil

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/api/meetings/upload-audio")
def upload_audio(
    file: UploadFile = File(...),
    email: str = Form(...)
):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    audio_collection.insert_one({
        "email": email,
        "audio_path": file_path,
        "uploaded_at": datetime.utcnow()
    })

    return {
        "success": True,
        "message": "Audio uploaded successfully",
        "audio_path": file_path
    }