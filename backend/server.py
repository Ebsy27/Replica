from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
from groq import Groq


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Initialize Groq client
GROQ_API_KEY = "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"
groq_client = Groq(api_key=GROQ_API_KEY)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class CodeGenerationRequest(BaseModel):
    prompt: str

class CodeGenerationResponse(BaseModel):
    code: str
    title: str
    description: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/generate-code", response_model=CodeGenerationResponse)
async def generate_code(request: CodeGenerationRequest):
    try:
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": """You are an expert React developer. Generate a complete, production-ready React application based on the user's request. 

IMPORTANT REQUIREMENTS:
1. Generate a COMPLETE functional React application, not just a landing page
2. Include all necessary components, state management, and functionality
3. Use modern React hooks (useState, useEffect, etc.)
4. Include proper styling with Tailwind CSS classes
5. Make it fully interactive and functional
6. Include realistic data and content relevant to the request
7. Add proper error handling and loading states
8. Make it responsive for mobile and desktop
9. Export the main component as 'App' (export default App)
10. Include proper imports for React and any hooks used

Return ONLY the complete React component code without any explanations. The code should be production-ready and fully functional."""
                },
                {
                    "role": "user",
                    "content": f"Create a {request.prompt}. Make it fully functional with all features working, realistic data, proper navigation, and complete user interface. Include all necessary React hooks and state management."
                }
            ],
            model="mixtral-8x7b-32768",
            temperature=0.7,
            max_tokens=4000,
        )
        
        generated_code = chat_completion.choices[0].message.content
        
        return CodeGenerationResponse(
            code=generated_code,
            title=request.prompt,
            description=f"Generated {request.prompt}"
        )
        
    except Exception as e:
        logger.error(f"Error generating code: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate code: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
