def analyze_injury(mode="critical"):

    if mode == "critical":
        return {
            "injury": "Deep Laceration",
            "severity": "Critical",
            "needs_hospital": True,
            "needs_ambulance": True
        }

    return {
        "injury": "Minor Scratch",
        "severity": "Low",
        "needs_hospital": False,
        "needs_ambulance": False,
        "first_aid": [
            "Clean the wound",
            "Apply antiseptic",
            "Use a bandage"
        ]
    }