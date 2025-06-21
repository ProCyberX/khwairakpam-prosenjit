import os
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
TWITTER_API_KEY = os.getenv("TWITTER_API_KEY")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

def save_tweet_to_supabase(username, text):
    url = f"{SUPABASE_URL}/rest/v1/ai_tweets"
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json"
    }
    data = {"username": username, "text": text}
    r = requests.post(url, json=data, headers=headers)
    if not r.ok:
        print(f"Supabase error: {r.status_code} {r.text}")
        raise HTTPException(status_code=500, detail="Supabase insert failed")

@app.post("/chat")
async def chat(req: ChatRequest):
    ai_resp = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "openai/gpt-3.5-turbo",
            "messages": [{"role": "user", "content": req.message}]
        }
    )

    if not ai_resp.ok:
        raise HTTPException(status_code=500, detail="AI generation failed")

    ai_data = ai_resp.json()
    ai_content = ai_data["choices"][0]["message"]["content"]


    return {"response": ai_content}

@app.get("/tweets")
async def get_tweets():
    r = requests.get(
        f"{SUPABASE_URL}/rest/v1/ai_tweets?select=*&order=created_at.desc",
        headers={
            "apikey": SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}"
        }
    )
    if not r.ok:
        raise HTTPException(status_code=500, detail="Fetch tweets failed")
    return r.json()


class TweetRequest(BaseModel):
    username: str
    text: str

@app.post("/post_tweet")
async def post_tweet(req: TweetRequest):
    tweet_resp = requests.post(
        "https://twitterclone-server-2xz2.onrender.com/post_tweet",
        headers={
            "Content-Type": "application/json",
            "api-key": TWITTER_API_KEY
        },
        json={"username": req.username, "text": req.text}
    )
    if not tweet_resp.ok:
        raise HTTPException(status_code=500, detail="Failed to post to Twitter‑clone")

    save_tweet_to_supabase(req.username, req.text)
    return {"message": "Tweet posted and saved"}
