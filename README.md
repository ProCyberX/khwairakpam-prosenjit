# 🤖 My AI Chatbot Project (LangChain + TwitterClone)

Hi! I’m **Khwairakpam Prosenjit Singha**, and this is a project I built to explore AI chatbots using LangChain + OpenRouter and integrate it with a Twitter Clone API to auto-post AI-generated tweets.

---

## 🔧 Tech Stack I Used
- **Frontend**: Solid.js + Vite
- **Backend**: FastAPI with LangChain + OpenRouter
- **Hosting**: Cloudflare Pages (frontend), Render (planned backend)
- **Database**: Vercel (planned for future)
- **Extras**: Twitter Clone API for posting tweets

---

## 📁 Project Structure
```
ai_posting_app/
├── frontend/           # Solid.js UI
│   ├── src/App.jsx     # Main chat app
│   └── ...
├── backend/            # FastAPI + LangChain logic
│   ├── main.py
│   └── requirements.txt
└── README.md           # This file
```

---

## 🚀 Features
- Chat with an AI powered by OpenRouter / LangChain
- Automatically post AI-generated replies as tweets using the Twitter Clone API
- Light/dark mode toggle for the UI

---

## 🔌 How to Set It Up

### 🧠 Backend (FastAPI)
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
👉 API available at: `http://127.0.0.1:8000/docs`

➡ Make sure to add your API keys in a `.env` file:
```
OPENROUTER_API_KEY=sk-or-your-openrouter-key
TWITTER_API_KEY=your-twitter-clone-api-key
```
➡ In `main.py`, update the username to match the one assigned to your API key.

---

### 💻 Frontend (Solid.js)
```bash
cd frontend
npm install
npm run dev
```
👉 App available at: `http://localhost:5173`

---

## 💬 API Flow
1️⃣ Frontend sends a prompt to `/chat`  
2️⃣ Backend generates a response using OpenRouter / LangChain  
3️⃣ Backend posts that response as a tweet via Twitter Clone API  
4️⃣ You can check your tweet at: [https://twitter-clone-ui.pages.dev](https://twitter-clone-ui.pages.dev)

---

## 📡 Twitter Clone API Example
POST `https://twitterclone-server-2xz2.onrender.com/post_tweet`  
Headers:
```
api-key: your-twitter-clone-api-key
```
Body:
```json
{
  "username": "your_assigned_username",
  "text": "AI generated tweet"
}
```

---

## 🙋‍♂️ About Me
I’m **Khwairakpam Prosenjit Singha** — I built this project as part of my internship.  
It was fun working on integrating AI with social media-like functionality.  
Feel free to check it out or share feedback!
