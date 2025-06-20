import { createSignal } from "solid-js";

function App() {
  const [prompt, setPrompt] = createSignal("");
  const [response, setResponse] = createSignal("");
  const [status, setStatus] = createSignal("");
  const [darkMode, setDarkMode] = createSignal(false);

  const sendPrompt = async () => {
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt() }) // ✅ fixed key
    });
    const data = await res.json();
    setResponse(data.response);

    const postRes = await fetch("https://twitterclone-server-2xz2.onrender.com/post_tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": "your api key"
      },
      body: JSON.stringify({
        username: "your username",
        text: data.response
      })
    });

    if (postRes.ok) setStatus("✅ Tweet posted!");
    else setStatus("❌ Failed to post");
  };

  return (
    <div
      style={`
        padding: 2rem;
        max-width: 600px;
        margin: auto;
        font-family: sans-serif;
        background-color: ${darkMode() ? "#1e1e1e" : "#ffffff"};
        color: ${darkMode() ? "#f1f1f1" : "#000000"};
        min-height: 100vh;
      `}
    >
      <div style="display: flex; justify-content: flex-end;">
        <button
          onClick={() => setDarkMode(!darkMode())}
          style="background: transparent; border: none; font-size: 1.5rem; cursor: pointer;"
        >
          {darkMode() ? "☀️" : "🌙"}
        </button>
      </div>

      <h1 style="font-size: 1.5rem; margin-bottom: 1rem;">How can I help you today?</h1>
      <input
        type="text"
        value={prompt()}
        onInput={(e) => setPrompt(e.target.value)}
        placeholder="Ask me anything..."
        style="width: 100%; padding: 0.5rem; margin-bottom: 1rem;"
      />
      <button onClick={sendPrompt} style="padding: 0.5rem 1rem;">Ask</button>
      <div style="margin-top: 1rem;">
        <p><strong>AI:</strong> {response()}</p>
        <p style="color: green;">{status()}</p>
      </div>
    </div>
  );
}

export default App;
