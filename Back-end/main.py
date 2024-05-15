from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from firebase_admin import auth as firebase_auth
from auth import register_user, login_user, get_current_user
from database import db
from schemas import UserRegisterSchema, TokenSchema

app = FastAPI()


@app.post("/register", response_model=TokenSchema)
async def register(user_data: UserRegisterSchema):
    try:
        user = register_user(user_data)
        token = firebase_auth.create_custom_token(user.uid)
        return {"access_token": token.decode("utf-8"), "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@app.post("/login", response_model=TokenSchema)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    token = login_user(form_data.username, form_data.password)
    return {"access_token": token.decode("utf-8"), "token_type": "bearer"}


@app.get("/users/me", response_model=UserRegisterSchema)
async def read_users_me(
    current_user: firebase_auth.UserRecord = Depends(get_current_user),
):
    user_doc = db.collection("users").document(current_user.uid).get()
    if not user_doc.exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    user_data = user_doc.to_dict()
    return user_data


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
