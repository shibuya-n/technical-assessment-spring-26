// src/Home.jsx
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TimelineIcon from "@mui/icons-material/Timeline";
import LightModeIcon from "@mui/icons-material/LightMode";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";



function Home() {
    const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "#f3f4f6" }}>
      {/* HERO SECTION WITH NAV + GRADIENT BACKGROUND */}
      <Box
        sx={{
          background:
            "linear-gradient(180deg, #a7c8ff 0%, #e5edff 45%, #f3f4f6 100%)",
          pb: { xs: 10, md: 14 },
        }}
      >
        <Container maxWidth="lg">
          {/* Top nav */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ pt: 3, pb: 6 }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, letterSpacing: "0.03em" }}
            >
              eras.
            </Typography>

            <Stack
              direction="row"
              spacing={4}
              sx={{ display: { xs: "none", md: "flex" }, fontSize: 14 }}
            >
              <Typography sx={{ cursor: "pointer" }}>Overview</Typography>
              <Typography sx={{ cursor: "pointer" }}>Why it matters</Typography>
              <Typography sx={{ cursor: "pointer" }}>Learn path</Typography>
              <Typography sx={{ cursor: "pointer" }}>FAQ</Typography>
            </Stack>

            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
                borderRadius: 999,
                backgroundColor: "#1d4ed8",
                boxShadow: "0 8px 25px rgba(37, 99, 235, 0.45)",
              }}
              onClick={() => navigate("/signin")}
            >
              Start learning
            </Button>
          </Stack>

          {/* Center hero text */}
          <Box textAlign="center" sx={{ maxWidth: 720, mx: "auto" }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.4rem", md: "3.4rem" },
                fontWeight: 600,
                mb: 2,
                color: "#0f172a",
              }}
            >
              A gentle introduction to{" "}
              <span style={{ fontStyle: "italic" }}>eras of web design</span>.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#4b5563",
                maxWidth: 560,
                mx: "auto",
                mb: 3,
              }}
            >
              Learn some basic facts and design theory about the various ages of web design, while maybe picking up a couple things about HTML and CSS as well. This website is your gateway to understanding web design history.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              justifyContent="center"
              sx={{ mb: 5 }}
            >
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  px: 3,
                  py: 1.2,
                  backgroundColor: "#1d4ed8",
                  boxShadow: "0 10px 30px rgba(37, 99, 235, 0.5)",
                }}
                onClick={() => navigate("/signin")}
              >
                Explore the big picture
              </Button>
            </Stack>
          </Box>

          {/* Big “screenshot” hero card */}
          <Box
            sx={{
              maxWidth: 900,
              mx: "auto",
              borderRadius: 6,
              overflow: "hidden",
              boxShadow: "0 35px 80px rgba(15, 23, 42, 0.45)",
            }}
          >
            <Box
              sx={{
                height: { xs: 260, md: 360 },
                background:
                  "radial-gradient(circle at top left, #60a5fa, #6366f1 40%, #f97316 100%)",
                position: "relative",
              }}
            >
              {/* Inner overlay mimicking a lesson window */}
              <Box
                sx={{
                  position: "absolute",
                  inset: { xs: "14%", md: "18%" },
                  borderRadius: 4,
                  bgcolor: "rgba(15,23,42,0.85)",
                  color: "white",
                  p: { xs: 2, md: 3 },
                  boxShadow: "0 18px 40px rgba(15,23,42,0.8)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ letterSpacing: "0.16em", opacity: 0.8 }}
                >
                  Intro lesson · Design history
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, fontSize: { xs: 14, md: 16 } }}
                >
                  “Every era of web design solves a different problem: limited
                  bandwidth, new devices, shifting aesthetics. We&apos;ll walk
                  through those eras step by step so modern UI choices start to
                  feel less random.”
                </Typography>
                <Box
                  sx={{
                    borderRadius: 999,
                    border: "1px solid rgba(148,163,184,0.6)",
                    px: 2,
                    py: 0.6,
                    fontSize: 13,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "rgba(15,23,42,0.75)",
                    alignSelf: "flex-start",
                  }}
                >
                  <span style={{ opacity: 0.8 }}>Next up:</span>
                  <strong>“From simple pages to early layouts”</strong>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* MAIN CONTENT SECTIONS ON WHITE */}
      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 2, md: 4 },
          pb: { xs: 6, md: 8 },
          mt: { xs: -6, md: -10 },      // pulls content up slightly
        }}
      >
        {/* Four ways section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            sx={{ mb: 1.5, color: "#111827", fontWeight: 600 }}
          >
            Four ways this intro makes design history easier to grasp
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 4, color: "#6b7280", maxWidth: 560 }}
          >
            Instead of dumping a ton of information at once, we focus on a few simple
            ideas that prepare you for deeper dives into specific eras later.
          </Typography>

          <Grid container spacing={3}>
            {/* CARD 1 */}
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  borderRadius: 6,
                  overflow: "hidden",
                  boxShadow: "0 28px 60px rgba(15,23,42,0.10)",
                  bgcolor: "transparent",
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    background:
                      "linear-gradient(145deg, #eef2ff 0%, #ffffff 40%, #f9fafb 100%)",
                  }}
                >
                  {/* fake “UI” block at top */}
                  <Box
                  />

                  {/* text anchored at bottom-left */}
                  <Box sx={{ px: 1.5, pb: 1.5 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 0.5, color: "#111827" }}
                    >
                      Quiz feature 
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6b7280" }}>
                      Retain knowledge through quizzes after every to make sure information is always fully absorbed
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>

            {/* CARD 2 */}
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  borderRadius: 6,
                  overflow: "hidden",
                  boxShadow: "0 28px 60px rgba(15,23,42,0.10)",
                  bgcolor: "transparent",
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    background:
                      "linear-gradient(145deg, #e0f2fe 0%, #ffffff 40%, #f9fafb 100%)",
                  }}
                >
                  <Box sx={{ px: 1.5, pb: 1.5 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 0.5, color: "#111827" }}
                    >
                      Comment Sections
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6b7280" }}>
                      Have anything to add? Users can offer feedback and add any additional information to help other members? 
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>

            {/* CARD 3 */}
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  borderRadius: 6,
                  overflow: "hidden",
                  boxShadow: "0 28px 60px rgba(15,23,42,0.10)",
                  bgcolor: "transparent",
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    background:
                      "linear-gradient(145deg, #e0f7ff 0%, #ffffff 40%, #f9fafb 100%)",
                  }}
                >
                  <Box sx={{ px: 1.5, pb: 1.5 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 0.5, color: "#111827" }}
                    >
                      Save your progress. 
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6b7280" }}>
                      Use our sign-in feature to comment and save your progress!
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 2, md: 4 },
          pb: { xs: 6, md: 8 },
          mt: { xs: -6, md: -10 },      // pulls content up slightly
        }}
      ></Container>
          <Box textAlign="center" sx={{ maxWidth: 720, mx: "auto" }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.4rem", md: "3.4rem" },
                fontWeight: 600,
                mb: 2,
                color: "#0f172a",
              }}
            >
              Are you {" "}
              <span style={{ fontStyle: "italic" }}>ready?</span>
            </Typography>
          </Box> 


      {/* DIVE IN BUTTON */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: 999,
            px: 3,
            py: 1.2,
            backgroundColor: "#1d4ed8",
            boxShadow: "0 10px 30px rgba(37, 99, 235, 0.5)",
          }}
          onClick={() => navigate("/signin")}
        >
          Let's dive in.
        </Button>
      </Box>

        {/* Simple footer */}
{/* FOOTER WRAPPER (full width line + bg if you want) */}
<Box sx={{ borderTop: "1px solid #e5e7eb", mt: 4 }}>
  <Container maxWidth="lg">
    <Box
      sx={{
        pt: 4,
        pb: 3,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        gap: 2,
        color: "#6b7280",
        fontSize: 12,
      }}
    >
      <span>
        © {new Date().getFullYear()} DesignEras. All rights reserved.
      </span>
      <Stack direction="row" spacing={3}>
        <span>About</span>
        <span>Contact</span>
        <span>Credits</span>
      </Stack>
    </Box>
  </Container>
</Box>

    </Box>
  );
}

export default Home;
