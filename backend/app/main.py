from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.emergency import EmergencyRequest
from app.routes.analyze import router as analyze_router

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
def latest_emergency():
    return {
        "patient_name": "Rahul Sharma",
        "age": 34,
        "gender": "Male",
        "blood_group": "O+",
        "phone": "9876543210",
        "emergency_type": "Road Accident",
        "severity": "Critical",
        "location": "KIIT University",

        "ambulance": {
            "vehicle_id": "AMB-12",
            "driver": "Ramesh",
            "current_location": "Patia",
            "destination": "AIIMS Bhubaneswar",
            "eta": "4 min",
            "distance": "2.1 km",
            "status": "En Route"
        },

        "hospital": {
            "name": "AIIMS Bhubaneswar",
            "distance": "2.1 km",
            "available_beds": 12,
            "icu_beds": 4,
            "capacity": "Available",
            "contact": "0674-2476789"
        },

        "doctor": {
            "name": "Dr. Priya Singh",
            "specialization": "Trauma Surgeon",
            "experience": "12 Years",
            "department": "Emergency",
            "contact": "9876501234",
            "availability": "Available"
        }
    }


@app.post("/emergency")
def emergency(request: EmergencyRequest):
    return {
        "message": f"Emergency received for {request.patient_name}"
    }