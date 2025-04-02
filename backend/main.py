from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import json

# Load .env file
load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow React dev server
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers (including X-API-Key)
)

# Get API key from environment
API_KEY = os.getenv("API_KEY")
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

# Validate API key
async def get_api_key(api_key: str = Depends(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API Key",
        )
    return api_key

CONFIG_FILE = "configuration.json"
@app.get("/config")
async def get_config(api_key: str = Depends(get_api_key)):
    with open(CONFIG_FILE, "r") as f:
        config = json.load(f)
    return config
    
@app.post("/config")
async def update_config(config: dict, api_key: str = Depends(get_api_key)):
    with open(CONFIG_FILE, "w") as f:
        json.dump(config, f, indent=2)
    return {"message": "Config updated successfully"}