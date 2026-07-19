import os
from dotenv import load_dotenv

from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    MessageHandler,
    filters,
)

from handlers import start, handle_message, handle_photo

# Load environment variables
load_dotenv("telegram-bot/.env")

BOT_TOKEN = os.getenv("BOT_TOKEN")

if BOT_TOKEN is None:
    raise ValueError("BOT_TOKEN not found. Check your .env file.")


def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()

    # Commands
    app.add_handler(CommandHandler("start", start))

    # Handle button clicks / text messages
    app.add_handler(
        MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message)
    )
    # Handle uploaded photos
    app.add_handler(
        MessageHandler(filters.PHOTO, handle_photo)
    )

    print("🚀 Arogyam Telegram Bot is running...")

    app.run_polling()


if __name__ == "__main__":
    main()