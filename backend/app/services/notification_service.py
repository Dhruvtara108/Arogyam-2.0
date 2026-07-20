def notify_hospital(hospital, doctor):

    return {
        "status": "sent",
        "hospital": hospital["name"],
        "doctor": doctor["name"],
        "message": f"Emergency alert sent to {hospital['name']}. {doctor['name']} has acknowledged the request."
    }


def notify_ambulance(ambulance):

    return {
        "status": "dispatched",
        "ambulance": ambulance["id"],
        "driver": ambulance["driver"],
        "eta": ambulance["eta_min"]
    }