import { createSignal } from "solid-js";

function App() {
  const [prompt, setPrompt] = createSignal("");
  const [response, setResponse] = createSignal("");
  const [status, setStatus] = createSignal("");

  const sendPrompt = async () => {
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt() })
    });
    const data = await res.json();
    setResponse(data.response);

    const postRes = await fetch("https://twitterclone-server-2xz2.onrender.com/post_tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": "khwairakpam_f5f7b645dc65e1a0248afb3a025d0b44"
      },
      body: JSON.stringify({
        username: "Khwairakpam Prosenjit",
        text: data.response
      })
    });

    if (postRes.ok) setStatus("✅ Tweet posted!");
    else setStatus("❌ Failed to post");
  };

  return (
    <div style="padding: 2rem; max-width: 600px; margin: auto; font-family: sans-serif;">
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
