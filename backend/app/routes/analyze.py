from fastapi import APIRouter, UploadFile, File

from app.services.dispatch_service import dispatch_emergency
from app.services.mock_ai_service import analyze_injury
from app.services.user_service import get_latest_user
from app.services.notification_service import (
    notify_hospital,
    notify_ambulance
)
from app.state import latest_emergency

router = APIRouter()


@router.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):

    # DEVELOPMENT MODE
    # Change between "critical" and "mild"
    # mode = "critical"
    mode = "mild"

    # Gemini Vision analysis
    result = await analyze_injury(file)
    patient = get_latest_user()

    if patient:
        result["patient"] = patient

    # If emergency, dispatch services
    if result["needs_ambulance"]:

        dispatch = dispatch_emergency()

        result["hospital"] = dispatch["hospital"]
        result["doctor"] = dispatch["doctor"]
        result["ambulance"] = dispatch["ambulance"]

        result["hospital_notification"] = notify_hospital(
            dispatch["hospital"],
            dispatch["doctor"]
        )

        result["ambulance_notification"] = notify_ambulance(
            dispatch["ambulance"]
        )

        # Store latest emergency for dashboard
    latest_emergency.clear()

    latest_emergency.update({
        "status": "active",
        **result
    })

    return result