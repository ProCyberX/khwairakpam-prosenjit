from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
import requests

app = FastAPI()

openai.api_key = "your api key" 

TWITTER_API_KEY = "twitter clone api key"

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
