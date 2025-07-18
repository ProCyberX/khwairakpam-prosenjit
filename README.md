# 🧠 AI Tweet Generator with Image Generation

An intelligent and responsive AI-based tweet generator built and customized by **Khwairakpam Prosenjit Singha** during the Yupcha Internship. This full-stack project combines the power of **AI**, **image generation**, and a sleek interface to deliver a smooth tweet-creation experience for users.

This application uses **Solid.js** on the frontend and **FastAPI** on the backend, integrating AI via **OpenRouter** and storing data using **Supabase**.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- **Solid.js** – Reactive JavaScript UI framework for fast rendering
- **Vite** – Lightning-fast build tool for modern frontend development

### 🧠 Backend
- **FastAPI** – High-performance backend framework for Python
- **OpenRouter** – Unified API to connect to various AI models (OpenAI, Anthropic, etc.)

### 🗃️ Database
- **Supabase** – Open-source Firebase alternative used for authentication, session management, and tweet history  
  _(Hosted on Vercel)_

### ☁️ Deployment
- **Frontend** → Deployed on **Cloudflare Pages**
- **Backend** → Hosted on **Render**

---

## 💡 Features

- AI-generated tweet creation with optional image generation
- Editable previews before final post
- Tweet history tracking
- Light & Dark mode toggle
- Backend powered by Supabase for real-time database and session handling

---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone 
cd ai-tweet-generator
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
```

Then, create a `.env` file inside the `/backend` folder with your environment variables:

```env
DATABASE_URL=your_database_url
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=your_model_name

TWITTERCLONE_BASE_URL=your_base_url
TWITTERCLONE_API_KEY=your_twitter_api_key
```

Now run the backend server:
```bash
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The app should now be accessible at `http://localhost:3000`.

---

## 📌 Notes

--Ensure all dependencies are installed correctly, especially for **Pydantic**, since version 2+ introduces some breaking changes.
- Make sure the `.env` file matches the keys expected by your backend `Settings` model.

---

## 🙌 Author
Built and maintained by **Khwairakpam Prosenjit Singha** as part of the **Yupcha Internship Program** ✨

---

## 📝 License
This project is open for learning and demo purposes. For any serious use or contributions, please reach out via GitHub to Me.
