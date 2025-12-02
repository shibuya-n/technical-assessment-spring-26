// src/SignIn.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // unsuccessful sign in
        setError(data.message || "Failed to sign in.");
        setSuccess("");
        setLoading(false);
        return;
      }

      // successful sign in
      console.log("Signed in:", data);
      // e.g. store token if you want:
      // localStorage.setItem("token", data.token);

      setSuccess("Signed in successfully! Redirecting...");
      setError("");
      setLoading(false);

      // small delay so user sees the success message
      setTimeout(() => {
         navigate("/lesson/1");
      }, 800);
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
      setSuccess("");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f3f4f6" }}>
      <Box
        sx={{
          background:
            "linear-gradient(180deg, #a7c8ff 0%, #e5edff 45%, #f3f4f6 100%)",
          pb: { xs: 8, md: 14 },
        }}
      >
        <Container maxWidth="lg">
          {/* Top nav */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ pt: 3, pb: { xs: 3, md: 4 } }}
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

            <Button
              variant="text"
              sx={{
                textTransform: "none",
                fontSize: 14,
                color: "#1f2933",
                display: { xs: "none", sm: "inline-flex" },
              }}
              onClick={() => navigate("/")}
            >
              ← Back to home
            </Button>
          </Stack>

          {/* Main layout */}
          <Grid
            container
            spacing={{ xs: 4, md: 6 }}
            alignItems="center"
            justifyContent="center"
          >
            {/* Left: copy */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  textAlign: { xs: "center", md: "left" },
                  px: { xs: 1, sm: 2, md: 0 },
                  mb: { xs: 1, md: 0 },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "1.9rem", sm: "2.2rem", md: "2.4rem" },
                    fontWeight: 600,
                    mb: 1.5,
                    color: "#0f172a",
                  }}
                >
                  Welcome back.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#4b5563",
                    maxWidth: { xs: "100%", md: 380 },
                    mx: { xs: "auto", md: "0" },
                    mb: 2.5,
                    fontSize: { xs: 14, sm: 15 },
                  }}
                >
                  Sign in to keep exploring how website design has evolved and to
                  save your favorite examples, notes, and learning progress.
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#6b7280",
                    maxWidth: { xs: "100%", md: 360 },
                    mx: { xs: "auto", md: "0" },
                    fontSize: { xs: 12, sm: 13 },
                  }}
                >
                  Use the same email you used when you first started exploring
                  eras. We&apos;ll keep your learning in sync across
                  devices.
                </Typography>
              </Box>
            </Grid>

            {/* Right: form card */}
            <Grid item xs={12} md={5}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Paper
                  elevation={0}
                  sx={{
                    width: "100%",
                    maxWidth: 420,
                    borderRadius: 4,
                    p: { xs: 3, sm: 3.5, md: 4 },
                    bgcolor: "rgba(255,255,255,0.97)",
                    border: "1px solid rgba(209,213,219,0.9)",
                    boxShadow: "0 26px 60px rgba(15,23,42,0.18)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 1.5,
                      fontWeight: 600,
                      color: "#111827",
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    Sign in
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      color: "#6b7280",
                      textAlign: { xs: "center", md: "left" },
                      fontSize: { xs: 13, sm: 14 },
                    }}
                  >
                    Enter your details to continue where you left off.
                  </Typography>

                  {/* feedback messages */}
                  {error && (
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 1.5,
                        color: "error.main",
                        fontSize: 13,
                      }}
                    >
                      {error}
                    </Typography>
                  )}
                  {success && (
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 1.5,
                        color: "success.main",
                        fontSize: 13,
                      }}
                    >
                      {success}
                    </Typography>
                  )}

                  <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                      <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        size="medium"
                        required
                      />
                      <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        size="medium"
                        required
                      />

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 0.5 }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: 12,
                            color: "#6b7280",
                            cursor: "pointer",
                          }}
                        >
                          Forgot password?
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: 12, color: "#6b7280" }}
                        >
                          Need an account?{" "}
                          <span
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            onClick={() => navigate("/signup")}
                          >
                            Sign up
                          </span>
                        </Typography>
                      </Stack>

                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                          mt: 1,
                          textTransform: "none",
                          borderRadius: 999,
                          py: 1.1,
                          backgroundColor: "#1d4ed8",
                          boxShadow:
                            "0 10px 30px rgba(37, 99, 235, 0.5)",
                        }}
                      >
                        {loading ? "Signing in..." : "Sign in"}
                      </Button>
                    </Stack>
                  </Box>
                </Paper>
              </Box>

              {/* mobile-only back button */}
              <Box
                sx={{
                  mt: 2,
                  textAlign: "center",
                  display: { xs: "block", sm: "none" },
                  fontSize: 13,
                  color: "#4b5563",
                }}
              >
                <Button
                  variant="text"
                  sx={{
                    textTransform: "none",
                    fontSize: 13,
                    color: "#1f2933",
                  }}
                  onClick={() => navigate("/")}
                >
                  ← Back to home
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default SignIn;
