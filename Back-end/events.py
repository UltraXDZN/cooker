from fastapi import HTTPException, status
from firebase_admin import db
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


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


def create_event(event_data: EventSchema, user_id: str):
    try:
        event_ref = db.reference("events").push()
        event_id = event_ref.key
        event_ref.set(
            {
                "name": event_data.name,
                "date_time_creation": datetime.utcnow().isoformat(),
                "affected_brand": event_data.affected_brand,
                "description": event_data.description,
                "malicious_url": event_data.malicious_url,
                "malicious_domain_registration_date": event_data.malicious_domain_registration_date.isoformat(),
                "dns_records": event_data.dns_records,
                "matching_keywords": event_data.matching_keywords,
                "status": event_data.status,
                "analyst_comments": event_data.analyst_comments,
                "user_id": user_id,
            }
        )
        return event_id
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


def edit_event(event_id: str, event_data: EventSchema, user_id: str):
    try:
        event_ref = db.reference(f"events/{event_id}")
        event = event_ref.get()
        if not event:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Event not found"
            )
        if event["user_id"] != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to edit this event",
            )

        event_ref.update(
            {
                "name": event_data.name,
                "affected_brand": event_data.affected_brand,
                "description": event_data.description,
                "malicious_url": event_data.malicious_url,
                "malicious_domain_registration_date": event_data.malicious_domain_registration_date.isoformat(),
                "dns_records": event_data.dns_records,
                "matching_keywords": event_data.matching_keywords,
                "status": event_data.status,
                "analyst_comments": event_data.analyst_comments,
            }
        )
        return event_id
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


def add_comment(event_id: str, comment_data: CommentSchema, user_id: str):
    try:
        event_ref = db.reference(f"events/{event_id}")
        event = event_ref.get()
        if not event:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Event not found"
            )

        comments = event.get("analyst_comments", [])
        comments.append(comment_data.dict())
        event_ref.update({"analyst_comments": comments})
        return event_id
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


def delete_comment(event_id: str, comment_id: str, user_id: str):
    try:
        event_ref = db.reference(f"events/{event_id}")
        event = event_ref.get()
        if not event:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Event not found"
            )

        comments = event.get("analyst_comments", [])
        new_comments = [
            comment
            for comment in comments
            if comment["timestamp"] != comment_id or comment["user_id"] != user_id
        ]
        event_ref.update({"analyst_comments": new_comments})
        return event_id
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


def get_all_events():
    try:
        events_ref = db.reference("events")
        events_snapshot = events_ref.get()
        if not events_snapshot:
            return []
        events = [
            {**event_data, "id": event_id}
            for event_id, event_data in events_snapshot.items()
        ]
        return events
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
