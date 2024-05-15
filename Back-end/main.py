from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from firebase_admin import auth as firebase_auth
from auth import register_user, login_user, get_current_user
from schemas import UserRegisterSchema, TokenSchema
from events import create_event, EventSchema, edit_event
import database  # Ensure database.py is imported to initialize Firebase Admin SDK

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


@app.post("/register", response_model=TokenSchema)
async def register(user_data: UserRegisterSchema):
    user = register_user(user_data)
    token = firebase_auth.create_custom_token(user.uid)
    return {"access_token": token.decode("utf-8"), "token_type": "bearer"}


@app.post("/login", response_model=TokenSchema)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    token = login_user(form_data.username, form_data.password)
    return {"access_token": token.decode("utf-8"), "token_type": "bearer"}


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


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
