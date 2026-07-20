import json
from pathlib import Path

DATA_FILE = Path(__file__).parent.parent / "data" / "hospitals.json"


def get_best_hospital():
    with open(DATA_FILE, "r") as f:
        hospitals = json.load(f)

    available = [
        h for h in hospitals
        if h["doctor_available"] and h["available_beds"] > 0
    ]

    if not available:
        return None

    best = min(available, key=lambda h: h["distance_km"])

    return best