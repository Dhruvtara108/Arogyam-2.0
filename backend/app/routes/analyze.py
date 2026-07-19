from fastapi import APIRouter, UploadFile, File

router = APIRouter()


@router.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    return {
        "filename": file.filename,
        "injury": "Possible Deep Cut",
        "risk": "Moderate",
        "recommendation": "Visit the nearest hospital within 2 hours."
    }