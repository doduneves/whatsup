def individual_serial(event) -> dict:
    return {
        "id": str(event["_id"]),
        "latitude": event["latitude"],
        "longitude": event["longitude"],
        "is_public": event["is_public"],
        "title": event["title"],
        "description": event["description"],
        "evaluation": event["evaluation"]
    }

def list_serial(events) -> list:
    return [individual_serial(event) for event in events]