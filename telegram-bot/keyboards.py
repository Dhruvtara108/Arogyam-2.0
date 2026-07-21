from telegram import ReplyKeyboardMarkup, KeyboardButton


def main_keyboard():
    keyboard = [
        ["🚨 Emergency"],
        ["📸 Upload Injury"],
    ]

    return ReplyKeyboardMarkup(
        keyboard,
        resize_keyboard=True,
        one_time_keyboard=False,
    )

def location_keyboard():
    keyboard = [
        [KeyboardButton("📍 Share Location", request_location=True)]
    ]

    return ReplyKeyboardMarkup(
        keyboard,
        resize_keyboard=True,
        one_time_keyboard=True,
    )