import { createSignal, createEffect } from "solid-js";

function App() {
  const [prompt, setPrompt] = createSignal("");
  const [response, setResponse] = createSignal("");
  const [status, setStatus] = createSignal("");
  const [tweets, setTweets] = createSignal([]);
  const [darkMode, setDarkMode] = createSignal(false);

  const sendPrompt = async () => {
    setStatus("Generating...");
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt() })
    });
    const data = await res.json();
    setResponse(data.response);
    setStatus("✅ Preview ready. Click Post to publish.");
  };

 const postTweet = async () => {
  setStatus("Posting...");
  const postRes = await fetch("http://localhost:8000/post_tweet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: "khwairakpam",
      text: response()
    })
  });

  if (postRes.ok) {
    setStatus("✅ Tweet posted!");
    setPrompt("");
    setResponse("");
    await fetchTweets();
  } else {
    setStatus("❌ Failed to post");
  }
};


  const fetchTweets = async () => {
    const res = await fetch("http://localhost:8000/tweets");
    const data = await res.json();
    setTweets(data.sort((a, b) => b.id - a.id)); // Ensure descending order
  };

  createEffect(() => {
    fetchTweets();
  });

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

      {response() && (
        <div
          style={`
            border: 1px dashed ${darkMode() ? "#666" : "#999"};
            padding: 1rem;
            margin-top: 1rem;
            background-color: ${darkMode() ? "#2e2e2e" : "#f1f1f1"};
            border-radius: 8px;
          `}
        >
          <textarea
            value={response()}
            onInput={(e) => setResponse(e.target.value)}
            style="width: 100%; min-height: 100px; padding: 0.5rem;"
          />
          <button
            onClick={postTweet}
            style="margin-top: 0.5rem; padding: 0.5rem 1rem;"
          >
            Post this Tweet
          </button>
        </div>
      )}

      <p style="color: green; margin-top: 0.5rem;">{status()}</p>

      <div style="margin-top: 2rem;">
        <h2>Latest Tweets</h2>
        <ul style="list-style: none; padding: 0;">
          {tweets().map(tweet => (
            <li
              style={`
                border: 1px solid ${darkMode() ? "#444" : "#ccc"};
                border-radius: 8px;
                padding: 1rem;
                margin-bottom: 1rem;
                background-color: ${darkMode() ? "#2e2e2e" : "#f9f9f9"};
              `}
            >
              <p style="margin: 0 0 0.5rem 0;">{tweet.text}</p>
              <small style={`color: ${darkMode() ? "#aaa" : "#555"};`}>
                Written by {tweet.username}
              </small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
