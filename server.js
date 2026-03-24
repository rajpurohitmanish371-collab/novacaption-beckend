const express = require("express");

const app = express();

// 🔐 API key from Render environment
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "NovaCaption AI Backend Running 🚀" });
});

// Generate route
app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running 🚀");
});
