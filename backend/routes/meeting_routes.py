from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
    Header
)

from database import audio_collection
from auth import verify_token

from datetime import datetime
import os
import shutil

router = APIRouter()

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/api/meetings/upload-audio")
def upload_audio(
    file: UploadFile = File(...),
    authorization: str = Header(None)
):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization token missing"
        )

    token = authorization.replace(
        "Bearer ",
        ""
    )

    payload = verify_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    audio_collection.insert_one({
        "username": payload["username"],
        "email": payload["email"],
        "audio_path": file_path,
        "uploaded_at": datetime.utcnow()
    })

    return {
        "success": True,
        "message": "Audio uploaded successfully",
        "audio_path": file_path
    }


# Future Placeholder
def generate_summary(audio_path):
    pass


def send_summary_email(email, summary):
    pass