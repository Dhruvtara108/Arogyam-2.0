import os
from dotenv import load_dotenv

from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    MessageHandler,
    ConversationHandler,
    filters,
)

from handlers import (
    start,
    get_name,
    get_age,
    get_medical,
    get_location,
    handle_message,
    handle_photo,
    NAME,
    AGE,
    MEDICAL,
    LOCATION,
)

from db import init_db

# Load environment variables
load_dotenv(".env")

BOT_TOKEN = os.getenv("BOT_TOKEN")

if BOT_TOKEN is None:
    raise ValueError("BOT_TOKEN not found. Check your .env file.")


def main():
    init_db()

    app = ApplicationBuilder().token(BOT_TOKEN).build()

    # Registration Conversation
    registration_handler = ConversationHandler(
        entry_points=[
            CommandHandler("start", start)
        ],
        states={
    NAME: [
        MessageHandler(filters.TEXT & ~filters.COMMAND, get_name)
    ],
    AGE: [
        MessageHandler(filters.TEXT & ~filters.COMMAND, get_age)
    ],
    MEDICAL: [
        MessageHandler(filters.TEXT & ~filters.COMMAND, get_medical)
    ],
    LOCATION: [
        MessageHandler(filters.LOCATION, get_location)
    ],
},
        fallbacks=[],
    )

    app.add_handler(registration_handler)

    # Handle uploaded photos
    app.add_handler(
        MessageHandler(
            filters.PHOTO,
            handle_photo,
        )
    )

    # Handle menu buttons / normal text
    app.add_handler(
        MessageHandler(
            filters.TEXT & ~filters.COMMAND,
            handle_message,
        )
    )

    print("🚀 Arogyam Telegram Bot is running...")

    app.run_polling()


if __name__ == "__main__":
    main()