// backend/index.js
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const comments = {};
const progress = {};

const app = express();
const PORT = 5000;

// in-memory user "database"
const users = []; // { id, name, email, passwordHash }

const JWT_SECRET = "dev-secret-change-this"; // for demo only

// middleware
app.use(
  cors({
    origin: "http://localhost:5173", // your Vite dev server
    credentials: true,
  })
);
app.use(express.json());

// helper to generate a token
function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}

// POST /api/signup
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password required." });
    }

    const existing = users.find((u) => u.email === email);
    if (existing) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now().toString(),
      name,
      email,
      passwordHash,
    };

    users.push(user);

    const token = createToken(user);

    res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// POST /api/signin
app.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required." });
    }

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = createToken(user);

    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/api/comments/:lessonId", (req, res) => {
  const { lessonId } = req.params;
  const { userName, text } = req.body;

  if (!text || !userName) {
    return res.status(400).json({ message: "Name and text required." });
  }

  const newComment = {
    id: Date.now().toString(),
    userName,
    text,
    createdAt: new Date().toISOString(),
  };

  if (!comments[lessonId]) comments[lessonId] = [];
  comments[lessonId].unshift(newComment);

  res.json(newComment);
});

app.post("/api/progress/:userId/:lessonId", (req, res) => {
  const { userId, lessonId } = req.params;
  const { score } = req.body;

  if (typeof score !== "number") {
    return res.status(400).json({ message: "Score must be provided." });
  }

  if (!progress[userId]) progress[userId] = {};

  progress[userId][lessonId] = {
    score,
    completedAt: new Date().toISOString(),
  };

  res.json({
    message: "Progress saved.",
    data: progress[userId][lessonId],
  });
});


// test route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/comments/:lessonId", (req, res) => {
  const { lessonId } = req.params;
  const lessonComments = comments[lessonId] || [];
  res.json(lessonComments);
});


app.listen(PORT, () => {
  console.log(`Auth backend running on http://localhost:${PORT}`);
});
