import requests
import os
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from firebase_admin import auth as firebase_auth
from auth import register_user, login_user, get_current_user
from schemas import UserRegisterSchema, TokenSchema, CommentSchema
from events import (
    create_event,
    EventSchema,
    edit_event,
    add_comment,
    delete_comment,
    get_all_events,
)
import database  # Ensure database.py is imported to initialize Firebase Admin SDK
from dotenv import load_dotenv
from typing import List

# Load environment variables from .env file
load_dotenv()

# Retrieve the API key from the environment variable
API_KEY = os.getenv("FIREBASE_API_KEY")

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def exchange_custom_token_for_id_token(custom_token: bytes):
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key={API_KEY}"
    payload = {
        "token": custom_token.decode("utf-8"),  # Decode the bytes to string
        "returnSecureToken": True,
    }
    response = requests.post(url, json=payload)
    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not exchange custom token for ID token",
        )
    id_token = response.json().get("idToken")
    return id_token


@app.post("/register", response_model=TokenSchema)
async def register(user_data: UserRegisterSchema):
    user = register_user(user_data)
    custom_token = firebase_auth.create_custom_token(user.uid)
    id_token = exchange_custom_token_for_id_token(custom_token)
    return {"access_token": id_token, "token_type": "bearer"}


@app.post("/login", response_model=TokenSchema)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    custom_token = login_user(form_data.username, form_data.password)
    id_token = exchange_custom_token_for_id_token(custom_token)
    return {"access_token": id_token, "token_type": "bearer"}


@app.get("/users/me", response_model=UserRegisterSchema)
async def read_users_me(
    current_user: firebase_auth.UserRecord = Depends(get_current_user),
):
    user_doc = database.db.reference(f"users/{current_user.uid}").get()
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    user_data = user_doc
    return user_data


@app.post("/events", response_model=str)
async def create_event_endpoint(
    event_data: EventSchema,
    current_user: firebase_auth.UserRecord = Depends(get_current_user),
):
    event_id = create_event(event_data, current_user.uid)
    return event_id


@app.put("/events/{event_id}", response_model=str)
async def edit_event_endpoint(
    event_id: str,
    event_data: EventSchema,
    current_user: firebase_auth.UserRecord = Depends(get_current_user),
):
    event_id = edit_event(event_id, event_data, current_user.uid)
    return event_id


@app.post("/events/{event_id}/comments", response_model=str)
async def add_comment_endpoint(
    event_id: str,
    comment_data: CommentSchema,
    current_user: firebase_auth.UserRecord = Depends(get_current_user),
):
    comment_data.user_id = current_user.uid
    comment_data.username = current_user.email
    event_id = add_comment(event_id, comment_data, current_user.uid)
    return event_id


@app.delete("/events/{event_id}/comments/{comment_id}", response_model=str)
async def delete_comment_endpoint(
    event_id: str,
    comment_id: str,
    current_user: firebase_auth.UserRecord = Depends(get_current_user),
):
    event_id = delete_comment(event_id, comment_id, current_user.uid)
    return event_id


@app.get("/events", response_model=List[EventSchema])
async def get_all_events_endpoint():
    events = get_all_events()
    return events


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)