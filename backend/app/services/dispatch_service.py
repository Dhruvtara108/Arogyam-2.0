from app.services.hospital_service import get_best_hospital
from app.services.ambulance_service import get_best_ambulance
from app.services.doctor_service import get_available_doctor


def dispatch_emergency():

    hospital = get_best_hospital()

    if not hospital:
        return {
            "success": False,
            "message": "No hospital available."
        }

    doctor = get_available_doctor(hospital["id"])
    ambulance = get_best_ambulance()

    return {
        "success": True,
        "hospital": hospital,
        "doctor": doctor,
        "ambulance": ambulance
    }