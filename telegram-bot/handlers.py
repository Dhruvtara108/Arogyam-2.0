import os
import requests

from telegram import Update
from telegram.ext import ContextTypes

from keyboards import main_keyboard


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    print("START COMMAND RECEIVED")

    await update.message.reply_text(
        "🚑 Welcome to Arogyam 2.0!\n\nChoose an option:",
        reply_markup=main_keyboard()
    )


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text

    if text == "📸 Upload Injury":
        await update.message.reply_text(
            "📸 Please upload a clear picture of the injury."
        )

    elif text == "🚨 Emergency":
        await update.message.reply_text(
            "🚨 Emergency mode activated.\n\nPlease share your location or upload an injury image."
        )

    else:
        await update.message.reply_text(
            "Please choose one of the available options."
        )


async def handle_photo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    photo = update.message.photo[-1]

    file = await photo.get_file()

    os.makedirs("telegram-bot/uploads", exist_ok=True)

    file_path = f"telegram-bot/uploads/{photo.file_unique_id}.jpg"

    await file.download_to_drive(file_path)

    url = "http://127.0.0.1:8000/analyze-image"

    with open(file_path, "rb") as image_file:
        response = requests.post(
            url,
            files={"file": image_file}
        )

    result = response.json()

    if result["needs_ambulance"]:

        hospital = result["hospital"]
        doctor = result["doctor"]
        ambulance = result["ambulance"]

        message = (
            "🚨 EMERGENCY DETECTED\n\n"
            f"🩺 Injury: {result['injury']}\n"
            f"⚠️ Severity: {result['severity']}\n\n"
            "🏥 Hospital\n"
            f"{hospital['name']}\n"
            f"📍 Distance: {hospital['distance_km']} km\n\n"
            "👨‍⚕️ Doctor\n"
            f"{doctor['name']}\n\n"
            "🚑 Ambulance\n"
            f"{ambulance['id']}\n"
            f"👤 Driver: {ambulance['driver']}\n"
            f"⏱ ETA: {ambulance['eta_min']} minutes\n\n"
            "✅ Hospital Notified\n"
            "✅ Doctor Alerted\n"
            "✅ Ambulance Dispatched"
        )

    else:

        first_aid = "\n".join(
            f"• {step}" for step in result["first_aid"]
        )

        message = (
            "🩺 Injury Analysis\n\n"
            f"Injury: {result['injury']}\n"
            f"Severity: {result['severity']}\n\n"
            "🩹 First Aid\n"
            f"{first_aid}"
        )

    await update.message.reply_text(message)