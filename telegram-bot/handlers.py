import os
import requests

from telegram import Update, ReplyKeyboardRemove
from telegram.ext import ContextTypes, ConversationHandler

from keyboards import main_keyboard, location_keyboard
from db import user_exists, create_user

NAME = 1
AGE = 2
MEDICAL = 3
LOCATION = 4


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):

    telegram_id = update.effective_user.id

    if user_exists(telegram_id):
        await update.message.reply_text(
            "🚑 Welcome back to Arogyam 2.0!\n\nChoose an option:",
            reply_markup=main_keyboard()
        )
        return ConversationHandler.END

    await update.message.reply_text(
        "👋 Welcome to Arogyam 2.0!\n\n"
        "Before using the service, let's complete your one-time registration.\n\n"
        "Please enter your full name."
    )

    return NAME

async def get_name(update: Update, context: ContextTypes.DEFAULT_TYPE):

    telegram_id = update.effective_user.id
    name = update.message.text.strip()

    context.user_data["telegram_id"] = telegram_id
    context.user_data["name"] = name

    await update.message.reply_text(
        "🎂 Please enter your age."
    )

    return AGE

async def get_age(update: Update, context: ContextTypes.DEFAULT_TYPE):

    age = update.message.text.strip()

    if not age.isdigit():
        await update.message.reply_text(
            "❌ Please enter a valid age."
        )
        return AGE

    context.user_data["age"] = int(age)

    await update.message.reply_text(
        "🩺 Please enter your medical conditions.\n\nType 'None' if you don't have any."
    )

    return MEDICAL

async def get_medical(update: Update, context: ContextTypes.DEFAULT_TYPE):

    medical = update.message.text.strip()

    context.user_data["medical_conditions"] = medical

    await update.message.reply_text(
        "📍 Please share your current location.",
        reply_markup=location_keyboard(),
    )

    return LOCATION

async def get_location(update: Update, context: ContextTypes.DEFAULT_TYPE):

    location = update.message.location

    create_user(
        telegram_id=context.user_data["telegram_id"],
        name=context.user_data["name"],
        age=context.user_data["age"],
        medical_conditions=context.user_data["medical_conditions"],
        latitude=location.latitude,
        longitude=location.longitude,
    )

    await update.message.reply_text(
        "✅ Registration completed successfully!\n\nWelcome to Arogyam 2.0.",
        reply_markup=main_keyboard(),
    )

    return ConversationHandler.END

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