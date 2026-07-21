import json
import os

from dotenv import load_dotenv
from fastapi import UploadFile
from google import genai
from google.genai import types

load_dotenv()

print("Current working directory:", os.getcwd())
print("Gemini Key Loaded:", os.getenv("GEMINI_API_KEY"))

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


async def analyze_injury(file: UploadFile):
    image_bytes = await file.read()

    # Use Telegram's MIME type if available, otherwise default to JPEG
    mime_type = file.content_type or "image/jpeg"

    print("Filename:", file.filename)
    print("Content-Type:", file.content_type)
    print("Using MIME:", mime_type)

    prompt = """
You are an AI emergency first responder.

Analyze the injury image.

Return ONLY valid JSON.

{
  "injury": "",
  "severity": "",
  "priority": "",
  "confidence": 0,
  "reasoning": "",
  "eta": "",
  "needs_hospital": true,
  "needs_ambulance": true,
  "first_aid": []
}

Rules:
- confidence should be between 0 and 100.
- severity should be one of:
  Critical, High, Medium, Low.
- priority should be:
  CRITICAL, HIGH, MEDIUM, LOW.
- eta:
  If ambulance required, estimate arrival time.
  Otherwise return "Not Required".
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            prompt,
            types.Part.from_bytes(
                data=image_bytes,
                mime_type=mime_type,
            ),
        ],
        config=types.GenerateContentConfig(
            temperature=0,
        ),
    )

    text = response.text.strip()

    # Remove Markdown code fences if Gemini returns them
    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()
    elif text.startswith("```"):
        text = text.replace("```", "").strip()

    return json.loads(text)