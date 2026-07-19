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

    await update.message.reply_text(
        f"""🩺 Injury Analysis

Possible Injury: {result['injury']}
Risk Level: {result['risk']}

Recommendation:
{result['recommendation']}
"""
    )