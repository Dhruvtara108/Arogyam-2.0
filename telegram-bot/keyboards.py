from telegram import ReplyKeyboardMarkup


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