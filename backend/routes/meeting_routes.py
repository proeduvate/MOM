from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
    Depends
)

from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)

from database import audio_collection
from auth import verify_token

from datetime import datetime
import os
import shutil

router = APIRouter()

security = HTTPBearer()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/api/meetings/upload-audio")
def upload_audio(
    file: UploadFile = File(...),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

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
        shutil.copyfileobj(file.file, buffer)

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