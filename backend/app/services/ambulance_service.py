import json
from pathlib import Path

DATA_FILE = Path(__file__).parent.parent / "data" / "ambulances.json"


def get_best_ambulance():
    with open(DATA_FILE, "r") as f:
        ambulances = json.load(f)

    available = [a for a in ambulances if a["available"]]

    if not available:
        return None

    best = min(available, key=lambda a: a["distance_km"])

    return best