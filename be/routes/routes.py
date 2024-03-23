from fastapi import APIRouter
from config.db import events_collection
from models.events import Event
from schema.schemas import list_serial
from bson import ObjectId

router = APIRouter()

@router.get("/")
async def hello():
    return {"message": "Qual a boa?"}

@router.get("/events/")
async def list_events():
    events = list_serial(events_collection.find())
    return events

@router.get("/events/{id}")
async def get_event(id: str):
    print(id)
    if (
        event := events_collection.find_one({"_id": ObjectId(id)})
    ) is not None:
        return event

    raise HTTPException(status_code=404, detail=f"Student {id} not found")

@router.post("/events/")
async def create_event(event: Event):
    events_collection.insert_one(dict(event))

@router.put("/events/{id}")
async def update_event(id: str, event: Event):
    events_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": dict(event)}
    )

@router.delete("/events/{id}")
async def delete_event(id: str):
    events_collection.find_one_and_delete({"_id": ObjectId(id)})