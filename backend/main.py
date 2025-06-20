from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
import requests

app = FastAPI()

openai.api_key = "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" 

TWITTER_API_KEY = "khwairakpam_f5f7b645dc65e1a0248afb3a025d0b44"

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": req.message}]
        )
        ai_response = completion.choices[0].message["content"]

        post_resp = requests.post(
            "https://twitterclone-server-2xz2.onrender.com/post_tweet",
            headers={
                "Content-Type": "application/json",
                "api-key": TWITTER_API_KEY
            },
            json={
                "username": "Khwairakpam Prosenjit",
                "text": ai_response
            }
        )

        if not post_resp.ok:
            raise HTTPException(status_code=500, detail="Failed to post tweet")

        return {"response": ai_response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
