from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.emergency import EmergencyRequest
from app.routes.analyze import router as analyze_router
from app.state import latest_emergency

app = FastAPI(
    title="Arogyam 2.0 API",
    description="AI Emergency Response Coordinator",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Arogyam 2.0 🚑",
        "status": "Running"
    }


@app.get("/health")
def health():
    return {
        "status": "Healthy"
    }

@app.get("/latest-emergency")
def get_latest_emergency():
    return latest_emergency

@app.post("/emergency")
def emergency(request: EmergencyRequest):
    return {
        "message": f"Emergency received for {request.patient_name}"
    }