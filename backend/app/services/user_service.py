import sqlite3
from pathlib import Path


DATABASE = (
    Path(__file__).resolve().parents[3]
    / "telegram-bot"
    / "arogyam.db"
)


def get_latest_user():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM users
        ORDER BY rowid DESC
        LIMIT 1
    """)

    row = cursor.fetchone()
    conn.close()

    if row is None:
        return None

    if row is None:
        return None

    return {
        "name": row["name"],
        "age": row["age"],
        "medical_conditions": row["medical_conditions"],
        "latitude": row["latitude"],
        "longitude": row["longitude"],
    }