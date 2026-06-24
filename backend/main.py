from fastapi import FastAPI

from routes.auth_routes import router as auth_router
from routes.meeting_routes import router as meeting_router
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(
    title="AI Meeting Summarizer API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Backend is running"
    }


app.include_router(auth_router)
app.include_router(meeting_router)