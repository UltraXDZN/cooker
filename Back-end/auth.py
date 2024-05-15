from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from firebase_admin import auth as firebase_auth
from firebase_admin import db

from passlib.context import CryptContext

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def register_user(user_data):
    try:
        # Hash the password
        hashed_password = get_password_hash(user_data.password)

        # Create user in Firebase Auth
        user = firebase_auth.create_user(
            email=user_data.email,
            password=user_data.password,
            display_name=f"{user_data.name} {user_data.surname}",
        )

        # Store user data in Realtime Database
        user_ref = db.reference(f"users/{user.uid}")
        user_ref.set(
            {
                "name": user_data.name,
                "surname": user_data.surname,
                "email": user_data.email,
                "password": hashed_password,
            }
        )

        return user
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


def login_user(email, password):
    try:
        # Get user by email
        user = firebase_auth.get_user_by_email(email)

        # Verify password (Firebase Authentication handles this internally, so we simulate it here)
        user_ref = db.reference(f"users/{user.uid}")
        user_data = user_ref.get()

        if not user_data or not verify_password(password, user_data.get("password")):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        custom_token = firebase_auth.create_custom_token(user.uid)
        return custom_token
    except firebase_auth.AuthError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password"
        )


async def get_current_user(token: str):
    try:
        decoded_token = firebase_auth.verify_id_token(token)
        user = firebase_auth.get_user(decoded_token["uid"])
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )
