from fastapi import APIRouter, HTTPException
from database import users_collection
from models import RegisterRequest, LoginRequest
from auth import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter()


@router.post("/api/auth/register")
def register(user: RegisterRequest):

    # ✅ FIXED FIELD NAME
    if user.password != user.confirm_password:
        raise HTTPException(
            status_code=400,
            detail="Passwords do not match"
        )

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    users_collection.insert_one({
        "username": user.username,
        "email": user.email,
        "password": hash_password(user.password)
    })

    return {
        "success": True,
        "message": "User registered successfully"
    }


@router.post("/api/auth/login")
def login(user: LoginRequest):

    db_user = users_collection.find_one(
        {"email": user.email}
    )

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        user.password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token({
        "email": db_user["email"],
        "username": db_user["username"]
    })

    return {
        "success": True,
        "token": token,
        "username": db_user["username"],
        "email": db_user["email"]
    }