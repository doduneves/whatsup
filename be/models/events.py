from pydantic import BaseModel

class Event(BaseModel):
    latitude: float
    longitude: float
    is_public: bool
    title: str
    description: str
    evaluation: float
    # owner: int
    # organizers: list
    # guests: list

