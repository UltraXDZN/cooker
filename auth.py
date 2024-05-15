from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from firebase_admin import auth as firebase_auth
import firebase_admin.auth
from .database import db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def register_user(user_data):
    user = firebase_auth.create_user(
        email=user_data.email,
        password=user_data.password,
        display_name=f"{user_data.name} {user_data.surname}",
    )
    user_doc_ref = db.collection("users").document(user.uid)
    user_doc_ref.set(
        {"name": user_data.name, "surname": user_data.surname, "email": user_data.email}
    )
    return user


def login_user(email, password):
    try:
        user = firebase_auth.get_user_by_email(email)
        custom_token = firebase_auth.create_custom_token(user.uid)
        return custom_token
    except firebase_auth.AuthError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password"
        )


async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        decoded_token = firebase_auth.verify_id_token(token)
        user = firebase_auth.get_user(decoded_token["uid"])
        return user
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )
