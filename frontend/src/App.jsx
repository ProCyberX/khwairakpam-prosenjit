import { createSignal, createResource } from "solid-js";

const fetchTweets = async () => {
  const res = await fetch("http://localhost:8000/tweets");
  return res.json();
};

function App() {
  const [prompt, setPrompt] = createSignal("");
  const [response, setResponse] = createSignal("");
  const [status, setStatus] = createSignal("");
  const [darkMode, setDarkMode] = createSignal(false);
  const [tweets, { refetch }] = createResource(fetchTweets);

  const sendPrompt = async () => {
    setStatus("⏳ Generating...");
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt() })
    });

    if (!res.ok) {
      setStatus("❌ Error generating tweet");
      return;
    }

    const data = await res.json();
    setResponse(data.response);
    setStatus("✅ Preview ready. Edit if you like, then click Post.");
  };

  const postTweet = async () => {
    setStatus("⏳ Posting...");
    const res = await fetch("http://localhost:8000/post_tweet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "khwairakpam",  // Replace or make dynamic as needed
        text: response()
      })
    });

    if (!res.ok) {
      setStatus("❌ Error posting tweet");
      return;
    }

    setStatus("✅ Tweet posted!");
    setPrompt("");
    setResponse("");
    refetch();
  };

  return (
    <div
      style={`
        padding: 2rem;
        max-width: 600px;
        margin: auto;
        font-family: sans-serif;
        background-color: ${darkMode() ? "#1e1e1e" : "#fff"};
        color: ${darkMode() ? "#f1f1f1" : "#000"};
        min-height: 100vh;
      `}
    >
      <div style="display: flex; justify-content: flex-end;">
        <button
          onClick={() => setDarkMode(!darkMode())}
          style="background: none; border: none; font-size: 1.5rem; cursor: pointer;"
        >
          {darkMode() ? "☀️" : "🌙"}
        </button>
      </div>

      <h1>How can I help you?</h1>
      <input
        type="text"
        value={prompt()}
        onInput={e => setPrompt(e.target.value)}
        placeholder="Ask me anything...like tell me about AI, ML, etc..."
        style="width: 100%; padding: 0.5rem; margin-bottom: 1rem;"
      />
      <button onClick={sendPrompt} style="padding: 0.5rem 1rem;">Ask</button>

      <div style="margin-top: 1rem;">
        {response() && (
          <>
            <p><strong>AI:</strong></p>
            <textarea
              value={response()}
              onInput={e => setResponse(e.target.value)}
              style="width: 100%; min-height: 100px; padding: 0.5rem;"
            />
            <button
              onClick={postTweet}
              style="margin-top: 0.5rem; padding: 0.5rem 1rem;"
            >
              Post Tweet
            </button>
          </>
        )}
        <p style="color: green;">{status()}</p>
      </div>

      <div style="margin-top: 2rem;">
        <h2>Previous Tweets</h2>
        {tweets.loading && <p>Loading...</p>}
        {tweets() && tweets().map(tweet => (
          <div style="border-bottom: 1px solid #ccc; padding: 0.5rem 0;">
            <p>{tweet.text}</p>
            <small>by {tweet.username}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
