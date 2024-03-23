from dotenv import load_dotenv
from pymongo import MongoClient
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

client = MongoClient(MONGO_URL)
db = client.events_db
events_collection = db["events_collection"]