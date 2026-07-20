import json
from pathlib import Path

DATA_FILE = Path(__file__).parent.parent / "data" / "doctors.json"


def get_available_doctor(hospital_id):
    with open(DATA_FILE, "r") as f:
        doctors = json.load(f)

    for doctor in doctors:
        if (
            doctor["hospital_id"] == hospital_id
            and doctor["available"]
        ):
            return doctor

    return None