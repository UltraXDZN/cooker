from pydantic import BaseModel, EmailStr, Field, root_validator
from typing import List, Optional
from datetime import datetime


class UserRegisterSchema(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    surname: str = Field(..., min_length=1, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)


class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str


class TokenSchema(BaseModel):
    access_token: str
    token_type: str


class CommentSchema(BaseModel):
    comment: str = Field(..., max_length=1000)
    timestamp: Optional[datetime] = None
    username: str = Field(..., max_length=100)
    user_id: str = Field(..., max_length=100)

    @root_validator(pre=True)
    def set_timestamp(cls, values):
        timestamp = values.get("timestamp")
        if timestamp is None:
            values["timestamp"] = datetime.utcnow()
        elif isinstance(timestamp, str):
            if timestamp.endswith("Z"):
                timestamp = timestamp[:-1]  # Remove the 'Z'
                values["timestamp"] = datetime.strptime(
                    timestamp, "%Y-%m-%dT%H:%M:%S.%f"
                )
            else:
                values["timestamp"] = datetime.fromisoformat(timestamp)
        return values

    def dict(self, **kwargs):
        data = super().dict(**kwargs)
        data["timestamp"] = data["timestamp"].isoformat() if data["timestamp"] else None
        return data


class EventSchema(BaseModel):
    name: str = Field(..., max_length=100)
    affected_brand: str = Field(..., max_length=100)
    description: str = Field(..., max_length=1500)
    malicious_url: str = Field(..., max_length=200)
    malicious_domain_registration_date: datetime
    dns_records: List[str]
    matching_keywords: List[str]
    status: str = Field(..., max_length=20)
    analyst_comments: Optional[List[CommentSchema]] = []

    @root_validator(pre=True)
    def convert_dates(cls, values):
        if isinstance(values.get("malicious_domain_registration_date"), str):
            values["malicious_domain_registration_date"] = datetime.fromisoformat(
                values["malicious_domain_registration_date"]
            )
        return values

    def dict(self, **kwargs):
        data = super().dict(**kwargs)
        data["malicious_domain_registration_date"] = data[
            "malicious_domain_registration_date"
        ].isoformat()
        return data

class ForgotPasswordSchema(BaseModel):
    email: EmailStr