from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage

os.environ["OPENAI_API_KEY"] = "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"

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptInput(BaseModel):
    prompt: str

@app.post("/chat")
async def chat(input: PromptInput):
    llm = ChatOpenAI()
    reply = llm([HumanMessage(content=input.prompt)])
    return {"response": reply.content}
