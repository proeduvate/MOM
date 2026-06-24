from pymongo import MongoClient

MONGO_URL = "mongodb+srv://sushmitha:sushmitha164@cluster0.kuzy3vo.mongodb.net/?appName=Cluster0"

client = MongoClient(MONGO_URL)

db = client["mom_generator"]

users_collection = db["users"]
audio_collection = db["audio_files"]
summary_collection = db["summaries"]