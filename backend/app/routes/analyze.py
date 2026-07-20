from fastapi import APIRouter, UploadFile, File

from backend.app.services.dispatch_service import dispatch_emergency
from backend.app.services.mock_ai_service import analyze_injury
from backend.app.services.notification_service import (
    notify_hospital,
    notify_ambulance
)

router = APIRouter()


@router.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):

    # DEVELOPMENT MODE
    # Change between "critical" and "mild"
    mode = "critical"
    # mode = "mild"

    # Mock AI analysis
    result = analyze_injury(mode)

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

    return result