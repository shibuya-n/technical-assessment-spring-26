// src/Lesson1.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  Chip,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Lesson1() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const lessonId = "1"; // for lesson 1

  // --- Quiz state ---
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // --- Comment state ---
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  // TEMPLATE QUIZ DATA (edit this later)
  const quizQuestions = [
    {
      id: 1,
      question: "In this lesson, what was the main idea you learned?",
      options: [
        "How early web pages were mostly static and text-based.",
        "How to write complex backend authentication from scratch.",
        "Why all websites must use dark mode.",
        "That web design never really changed over time.",
      ],
      correctIndex: 0,
    },
    {
      id: 2,
      question: "Why is understanding different eras of web design useful?",
      options: [
        "It helps you memorize random dates.",
        "It makes modern UI decisions feel less random.",
        "So you can recreate every old design exactly.",
        "It has no real value, it’s just trivia.",
        ],
      correctIndex: 1,
    },
  ];

  // load comments when lesson mounts
  useEffect(() => {
    fetch(`http://localhost:5000/api/comments/${lessonId}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Error loading comments:", err));
  }, [lessonId]);

  const handleSelectAnswer = (questionId, optionIndex) => {
    if (quizSubmitted) return; // lock answers after submit
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) score++;
    });
    return score;
  };

  const handleSubmitQuiz = async () => {
    setQuizSubmitted(true);

    const score = calculateScore();

    if (user && user.id) {
      await fetch(
        `http://localhost:5000/api/progress/${user.id}/${lessonId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score }),
        }
      );
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      userName: commentName.trim() || "Anonymous",
      text: commentText.trim(),
    };

    const res = await fetch(
      `http://localhost:5000/api/comments/${lessonId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      }
    );

    const savedComment = await res.json();

    setComments((prev) => [savedComment, ...prev]);
    setCommentName("");
    setCommentText("");
  };

  const score = calculateScore();
  const totalQuestions = quizQuestions.length;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f3f4f6" }}>
      {/* Gradient header wrapper */}
      <Box
        sx={{
          background:
            "linear-gradient(180deg, #a7c8ff 0%, #e5edff 45%, #f3f4f6 100%)",
          pb: { xs: 8, md: 12 },
          mb: { xs: 0, md: 2 },
        }}
      >
        <Container maxWidth="lg">
          {/* Top nav */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ pt: 3, pb: 3 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                letterSpacing: "0.03em",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              eras.
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                variant="text"
                sx={{ textTransform: "none", fontSize: 14 }}
                onClick={() => navigate("/lesson/1")}
              >
                Lesson 1
              </Button>
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontSize: 14,
                  borderRadius: 999,
                }}
                onClick={() => navigate("/lesson/2")}
              >
                Next lesson
              </Button>
            </Stack>
          </Stack>

          {/* Lesson header */}
          <Box sx={{ maxWidth: 720, mb: 4 }}>
            <Chip
              label="Lesson 1 · Template"
              sx={{
                mb: 1.5,
                bgcolor: "rgba(255,255,255,0.7)",
                borderRadius: 999,
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 600,
                color: "#0f172a",
                mb: 1.5,
              }}
            >
              [Lesson Title Placeholder]
            </Typography>
            <Typography sx={{ color: "#4b5563", maxWidth: 620 }}>
              This is your interactive lesson template. Replace the placeholder
              text below with your own explanation, diagrams, examples, and
              anything else you want students to see before they take the quiz.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main content card */}
      <Container maxWidth="lg" sx={{ mb: 6, mt: { xs: -4, md: -8 } }}>
        <Paper
          sx={{
            borderRadius: 5,
            p: { xs: 3, md: 4 },
            boxShadow: "0 26px 70px rgba(15,23,42,0.18)",
            bgcolor: "rgba(255,255,255,0.97)",
          }}
        >
          {/* LESSON CONTENT SECTION */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, mb: 2, color: "#111827" }}
            >
              Lesson content
            </Typography>

            <Typography sx={{ color: "#4b5563", mb: 2 }}>
              <strong>Section 1: Big idea</strong>
              <br />
              Use this area to explain the main concept of the lesson. You can
              break it up into multiple paragraphs, use bullet points, or embed
              images/diagrams later.
            </Typography>

            <Typography sx={{ color: "#4b5563", mb: 2 }}>
              <strong>Section 2: Visual or example</strong>
              <br />
              Describe an example website, a period in web design history, or a
              screenshot you want the learner to think about. You might compare
              a &quot;before&quot; and &quot;after&quot; design here.
            </Typography>

            <Typography sx={{ color: "#4b5563", mb: 2 }}>
              <strong>Section 3: Key takeaways</strong>
              <br />
              List 2–4 key points you want the learner to remember from this
              lesson. These should directly connect to the quiz questions below.
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* QUIZ SECTION */}
          <Box sx={{ mb: 5 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "#111827" }}
              >
                Quick check-in quiz
              </Typography>
              {quizSubmitted && (
                <Chip
                  label={`Score: ${score}/${totalQuestions}`}
                  color={score === totalQuestions ? "success" : "default"}
                  sx={{ fontWeight: 500 }}
                />
              )}
            </Stack>

            <Typography sx={{ color: "#6b7280", mb: 3, fontSize: 14 }}>
              Answer the questions based on what you just learned. You&apos;ll
              get instant feedback after you submit.
            </Typography>

            <Stack spacing={3}>
              {quizQuestions.map((q) => {
                const userAnswer = selectedAnswers[q.id];
                const isCorrect =
                  quizSubmitted && userAnswer === q.correctIndex;
                const isIncorrect =
                  quizSubmitted &&
                  userAnswer !== undefined &&
                  userAnswer !== q.correctIndex;

                return (
                  <Box
                    key={q.id}
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      border: "1px solid rgba(209,213,219,0.9)",
                      bgcolor: "rgba(248,250,252,0.9)",
                    }}
                  >
                    <Typography
                      sx={{ mb: 1.5, fontWeight: 500, color: "#111827" }}
                    >
                      {q.id}. {q.question}
                    </Typography>
                    <Stack spacing={1}>
                      {q.options.map((opt, index) => {
                        const isSelected = userAnswer === index;

                        let variantStyles = {};
                        if (!quizSubmitted) {
                          variantStyles = isSelected
                            ? {
                                bgcolor: "rgba(37,99,235,0.07)",
                                borderColor: "rgba(37,99,235,0.4)",
                              }
                            : {};
                        } else {
                          if (index === q.correctIndex && isSelected) {
                            variantStyles = {
                              bgcolor: "rgba(22,163,74,0.08)",
                              borderColor: "rgba(22,163,74,0.4)",
                            };
                          } else if (index === q.correctIndex) {
                            variantStyles = {
                              bgcolor: "rgba(22,163,74,0.05)",
                              borderColor: "rgba(22,163,74,0.3)",
                            };
                          } else if (isSelected && isIncorrect) {
                            variantStyles = {
                              bgcolor: "rgba(239,68,68,0.06)",
                              borderColor: "rgba(239,68,68,0.4)",
                            };
                          }
                        }

                        return (
                          <Button
                            key={index}
                            variant="outlined"
                            onClick={() =>
                              handleSelectAnswer(q.id, index)
                            }
                            sx={{
                              justifyContent: "flex-start",
                              textTransform: "none",
                              borderRadius: 2,
                              borderColor: "rgba(209,213,219,0.9)",
                              color: "#111827",
                              fontSize: 14,
                              py: 1,
                              px: 1.5,
                              ...variantStyles,
                            }}
                          >
                            {opt}
                          </Button>
                        );
                      })}
                    </Stack>

                    {quizSubmitted && (
                      <Typography
                        sx={{
                          mt: 1.5,
                          fontSize: 13,
                          color: isCorrect
                            ? "success.main"
                            : isIncorrect
                            ? "error.main"
                            : "#6b7280",
                        }}
                      >
                        {isCorrect &&
                          "Nice! You answered this one correctly."}
                        {isIncorrect &&
                          "Not quite. Review the key ideas above and try again later."}
                        {!isCorrect &&
                          !isIncorrect &&
                          "You skipped this question."}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 3 }}
            >
              <Button
                variant="contained"
                onClick={handleSubmitQuiz}
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  px: 3,
                  py: 1.1,
                  backgroundColor: "#1d4ed8",
                  boxShadow: "0 10px 30px rgba(37, 99, 235, 0.4)",
                }}
              >
                {quizSubmitted ? "Quiz submitted" : "Submit quiz"}
              </Button>
              {quizSubmitted && (
                <Button
                  variant="text"
                  sx={{ textTransform: "none", fontSize: 14 }}
                  onClick={() => {
                    setSelectedAnswers({});
                    setQuizSubmitted(false);
                  }}
                >
                  Reset quiz
                </Button>
              )}
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* COMMENT SECTION */}
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, mb: 1.5, color: "#111827" }}
            >
              Comments & reflections
            </Typography>
            <Typography sx={{ color: "#6b7280", mb: 2, fontSize: 14 }}>
              Share a question, reflection, or something that stood out to you
              from this lesson.
            </Typography>

            <Box
              component="form"
              onSubmit={handleAddComment}
              sx={{ mb: 3 }}
            >
              <Stack spacing={1.5}>
                <TextField
                  label="Name (optional)"
                  variant="outlined"
                  size="small"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                />
                <TextField
                  label="Comment"
                  variant="outlined"
                  multiline
                  minRows={2}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    alignSelf: "flex-start",
                    textTransform: "none",
                    borderRadius: 999,
                    px: 3,
                    py: 1,
                    backgroundColor: "#1d4ed8",
                  }}
                >
                  Post comment
                </Button>
              </Stack>
            </Box>

            {comments.length === 0 ? (
              <Typography
                sx={{ color: "#9ca3af", fontSize: 14, fontStyle: "italic" }}
              >
                No comments yet. Be the first to share your thoughts.
              </Typography>
            ) : (
              <List>
                {comments.map((c) => (
                  <ListItem
                    key={c.id}
                    alignItems="flex-start"
                    sx={{ px: 0, mb: 1.5 }}
                  >
                    <Avatar sx={{ mr: 2 }}>
                      {(c.userName || "A").charAt(0).toUpperCase()}
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 500 }}>
                          {c.userName}{" "}
                          <span
                            style={{
                              fontWeight: 400,
                              color: "#9ca3af",
                              fontSize: 11,
                              marginLeft: 6,
                            }}
                          >
                            {new Date(c.createdAt).toLocaleString()}
                          </span>
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ fontSize: 14, color: "#4b5563" }}>
                          {c.text}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
