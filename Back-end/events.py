from fastapi import HTTPException, status
from firebase_admin import db
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class EventSchema(BaseModel):
    name: str = Field(..., max_length=100)
    affected_brand: str = Field(..., max_length=100)
    description: str = Field(..., max_length=1500)
    malicious_url: str = Field(..., max_length=200)
    malicious_domain_registration_date: datetime
    dns_records: List[str]
    matching_keywords: List[str]
    status: str = Field(..., max_length=20)
    analyst_comments: Optional[List[dict]] = []


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
