from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

app = FastAPI()

# Enable CORS (Allow frontend to talk to backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request format for the user message
class ChatRequest(BaseModel):
    message: str

# Initialize the pipeline once when the server starts
pipe = pipeline("text-generation", model="EleutherAI/gpt-neo-2.7B")

@app.post("/chat")
async def chat(request: ChatRequest):
    user_message = request.message

    # Generate the response using the model pipeline
    response = pipe(user_message)

    # Return the response (we can access the text generation output from the response)
    return {"reply": response[0]["generated_text"]}
