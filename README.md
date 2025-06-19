# 🤖 My AI Chatbot Project (LangChain + TwitterClone)

Hey! This is a fun project I built to explore AI chatbots using LangChain and also integrate it with a Twitter Clone to post AI-generated tweets.

### 🔧 Tech Stack I Used
- **Frontend**: Solid.js + Tailwind CSS + Vite
- **Backend**: FastAPI with LangChain and OpenAI
- **Hosting**: Cloudflare Pages (frontend), Render for backend
- **Database**: Vercel (planned for future)
- **Extras**: Tweets get auto-posted using a Twitter Clone API

---

## 📁 Project Structure
```
MyProjects/
├── frontend/           # Solid.js UI
│   ├── src/
│   │   └── App.jsx     # Main chat app
│   ├── index.html
│   └── ...
│
├── backend/            # FastAPI + LangChain logic
│   ├── main.py
│   └── requirements.txt
│
└── README.md           # This file
```

---

## 🚀 Features
- You can chat with an AI (powered by OpenAI)
- The reply gets posted as a tweet via Twitter Clone API
- All built from scratch using Solid.js & FastAPI

---

## 🔌 How to Set It Up

### 🧠 Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
```

- In `main.py`, paste your OpenAI API key:
```python
os.environ["OPENAI_API_KEY"] = "sk-your-key-here"
```

- Then run the API:
```bash
python -m uvicorn main:app --reload
```
> Your API will be at `http://localhost:8000`

---

### 💻 Frontend (Solid.js)
```bash
cd ../frontend
npm install
```

- Open `src/App.jsx`
- Replace the API key and username:
```js
"api-key": "your_api_key_here",
username: "your_username_here"
```

- Then start it:
```bash
npm run dev
```
> Your app should open at `http://localhost:3000`

---

## 💬 Testing the Chatbot
1. Visit `http://localhost:3000`
2. Type a message in the chat box
3. The AI will reply
4. That reply is also posted as a tweet to the TwitterClone API!
5. Check [https://twitter-clone-ui.pages.dev](https://twitter-clone-ui.pages.dev)
   - Enter your username to see your AI tweets

---

## 📡 APIs Used

### 🔁 Twitter Clone Post API
**POST** `https://twitterclone-server-2xz2.onrender.com/post_tweet`

Headers:
```http
api-key: your_api_key_here
```

Body:
```json
{
  "username": "yourusername",
  "text": "message from AI"
}
```

### 💬 Local Chat Endpoint
**POST** `http://localhost:8000/chat`

Body:
```json
{
  "prompt": "Hello!"
}
```
Response:
```json
{
  "response": "AI reply here"
}
```

---

## 🚀 Deployment
- I plan to host the backend on **Render**
- Frontend will go live via **Cloudflare Pages**

---

## 🙋‍♂️ About Me
Hi! I'm **Khwairakpam Prosenjit Singha** and I built this project as part of my learning journey. Hope you liked it!

Feel free to reach out if you want to collaborate or have suggestions. :)
