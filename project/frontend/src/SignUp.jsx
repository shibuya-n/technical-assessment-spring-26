// src/SignUp.jsx
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
import React, { useState } from "react";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // fake submit handler for now
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setLoading(false);
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to sign up.");
        setLoading(false);
        return;
      }

      console.log("Signed up:", data);
      // you could store token in localStorage here if you want
      // localStorage.setItem("token", data.token);
      navigate("/signin");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f3f4f6" }}>
      {/* gradient header background, matching home/signin */}
      <Box
        sx={{
          background:
            "linear-gradient(180deg, #a7c8ff 0%, #e5edff 45%, #f3f4f6 100%)",
          pb: { xs: 10, md: 14 },
        }}
      >
        <Container maxWidth="lg">
          {/* top nav bar */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ pt: 3, pb: 4 }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, letterSpacing: "0.03em", cursor: "pointer" }}
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
              }}
              onClick={() => navigate("/signin")}
            >
              Already have an account?
            </Button>
          </Stack>

          {/* main sign-up layout */}
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            {/* Left: copy / context */}
            <Grid item xs={12} md={5}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "2rem", md: "2.4rem" },
                  fontWeight: 600,
                  mb: 1.5,
                  color: "#0f172a",
                }}
              >
                Create your eras. account.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#4b5563", maxWidth: 380, mb: 2.5 }}
              >
                Save your progress, bookmark example sites, and track how your
                understanding of web design history grows over time.
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#6b7280" }}
              >
                It&apos;s free to get started. You can always come back later and
                pick up where you left off.
              </Typography>
            </Grid>

            {/* Right: floating card with form */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 4,
                  p: { xs: 3, md: 4 },
                  mx: "auto",
                  maxWidth: 420,
                  bgcolor: "rgba(255,255,255,0.95)",
                  border: "1px solid rgba(209,213,219,0.9)",
                  boxShadow: "0 26px 60px rgba(15,23,42,0.18)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ mb: 1.5, fontWeight: 600, color: "#111827" }}
                >
                  Sign up
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: 3, color: "#6b7280" }}
                >
                  Fill in a few details to start your journey through the eras of
                  web design.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      label="Name"
                      name="name"
                      type="text"
                      fullWidth
                      size="medium"
                      required
                    />
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
                    <TextField
                      label="Confirm password"
                      name="confirmPassword"
                      type="password"
                      fullWidth
                      size="medium"
                      required
                    />
                    {error && (
                    <Typography
                        variant="body2"
                        sx={{ color: "error.main", fontSize: 13 }}
                    >
                        {error}
                    </Typography>
                    )}
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 1,
                        textTransform: "none",
                        borderRadius: 999,
                        py: 1.1,
                        backgroundColor: "#1d4ed8",
                        boxShadow: "0 10px 30px rgba(37, 99, 235, 0.5)",
                      }}
                    >
                      
                    {loading ? "Creating account..." : "Create account"}
                    </Button>
                  </Stack>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    fontSize: 12,
                    color: "#9ca3af",
                  }}
                >
                  By creating an account, you agree to our imaginary Terms of
                  Service and Privacy Policy.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default SignUp;
