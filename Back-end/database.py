import firebase_admin
from firebase_admin import credentials, db

cred = credentials.Certificate("apiKey.json")
firebase_admin.initialize_app(
    cred,
    {
        "databaseURL": "https://stemgamesfoobar-default-rtdb.europe-west1.firebasedatabase.app/"  # Replace with your database URL
    },
)


database = db.reference()
