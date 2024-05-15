from pydantic import BaseModel, EmailStr, Field
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
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    username: str = Field(..., max_length=100)
    user_id: str = Field(..., max_length=100)


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
