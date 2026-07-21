import sqlite3

DATABASE = "arogyam.db"


def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
    telegram_id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER,
    medical_conditions TEXT,
    latitude REAL,
    longitude REAL
)    
    """)

    conn.commit()
    conn.close()


def user_exists(telegram_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute(
        "SELECT telegram_id FROM users WHERE telegram_id = ?",
        (telegram_id,)
    )

    user = cursor.fetchone()

    conn.close()

    return user is not None

def create_user(
    telegram_id,
    name,
    age,
    medical_conditions,
    latitude,
    longitude,
):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT OR REPLACE INTO users (
            telegram_id,
            name,
            age,
            medical_conditions,
            latitude,
            longitude
        )
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            telegram_id,
            name,
            age,
            medical_conditions,
            latitude,
            longitude,
        )
    )

    conn.commit()
    conn.close()