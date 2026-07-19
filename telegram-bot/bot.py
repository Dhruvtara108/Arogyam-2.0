import os
from dotenv import load_dotenv

from telegram import Update
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    ContextTypes,
)

# Load environment variables
load_dotenv("telegram-bot/.env")

BOT_TOKEN = os.getenv("BOT_TOKEN")


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "🚑 Welcome to Arogyam 2.0!\n\n"
        "Your AI Emergency Response Assistant is now online."
    )


def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()

    app.add_handler(CommandHandler("start", start))

    print("🚀 Arogyam Telegram Bot is running...")

    app.run_polling()


if __name__ == "__main__":
    main()