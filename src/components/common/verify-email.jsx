import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const VerifyEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [status, setStatus] = useState("Verifying your email...");

  useEffect(() => {
    if (token) {
      // Call backend API to verify the email with the token
      axios
        .get(`http://localhost:5000/api/auth/verify-email?token=${token}`)
        .then((response) => {
          // Handle the response, display success message
          setStatus("Email verified successfully!");
        })
        .catch((error) => {
          // Handle error, display failure message
          setStatus("Failed to verify email. Please try again.");
        });
    } else {
      setStatus("Invalid token.");
    }
  }, [token]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{status}</p>
    </div>
  );
};

export default VerifyEmail;
