from pydantic import BaseModel


class EmergencyRequest(BaseModel):
    patient_name: str