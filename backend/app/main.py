from fastapi import FastAPI
from backend.app.models.emergency import EmergencyRequest

app = FastAPI(
    title="Arogyam 2.0 API",
    description="AI Emergency Response Coordinator",
    version="1.0.0"
)


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


@app.post("/emergency")
def emergency(request: EmergencyRequest):
    return {
        "message": f"Emergency received for {request.patient_name}"
    }