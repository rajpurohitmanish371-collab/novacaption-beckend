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
    const input = req.body.prompt;

const prompt = `You are a top viral content creator.

Create 10 EXTREMELY VIRAL, high-quality Instagram captions for "${input}".

Style:
- Gen Z + influencer + luxury vibe 😎
- Bold, confident, addictive
- Emotion + attitude + storytelling
- Make it feel like trending reels

Rules:
- Strong hook in first line (attention grabbing)
- Use powerful words + psychology triggers
- Add emojis smartly 🔥✨💯🚀
- Keep captions short but impactful
- Mix styles: savage, emotional, romantic, funny, deep

Extra:
- 2 captions with questions
- 2 savage/attitude captions
- 2 emotional/deep captions
- 1 luxury/premium vibe caption

Make every caption feel ORIGINAL, not basic.

Only output captions, no numbering, no explanation.`;

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
