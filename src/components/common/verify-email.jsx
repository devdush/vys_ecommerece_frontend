import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import logo from "../home-view/vys.png"; // Adjust the path as necessary

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying your email...");

  useEffect(() => {
    if (token) {
      setStatus("Verifying your email...");
      axios
        .get(
          `https://vysbackend-77b59541ffb8.herokuapp.com/api/auth/verify-email?token=${token}`
        )
        .then((response) => {
          setStatus("Email verified successfully!");
        })
        .catch((error) => {
          setStatus("Failed to verify email. Please try again.");
        });
    } else {
      setStatus("Invalid token.");
    }
  }, [token]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#fafafa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, sm: 4 },
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          width: { xs: "60%", sm: "40%", md: "30%" },
          maxWidth: 200,
          mb: 3,
        }}
      />

      <Typography
        variant="h5"
        sx={{
          color: "#333",
          textAlign: "center",
          mb: 1,
          fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" },
        }}
      >
        Email Verification
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "#555",
          textAlign: "center",
          mb: 4,
          fontSize: { xs: "1rem", sm: "1.1rem" },
        }}
      >
        {status}
      </Typography>

      <Button
        component="a"
        href="https://vys.lk/auth/login"
        variant="contained"
        sx={{
          backgroundColor: "#4CAF50",
          color: "#fff",
          px: { xs: 3, sm: 4 },
          py: { xs: 1.2, sm: 1.5 },
          borderRadius: 2,
          fontSize: { xs: "0.9rem", sm: "1rem" },
          textTransform: "none",
          width: { xs: "100%", sm: "auto" },
          maxWidth: { xs: "300px", sm: "none" },
          "&:hover": {
            backgroundColor: "#45a049",
          },
        }}
      >
        Back to Shopping
      </Button>
    </Box>
  );
};

export default VerifyEmail;
