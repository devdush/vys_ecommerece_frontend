import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { TextField, Button, Typography, Box } from "@mui/material";
import { loginUser } from "../../services/auth/login";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../store/action/auth";
import Footer from "../../components/home-view/footer";

const AuthLogin = () => {
  const dispatch = useDispatch();

  return (
    <Box>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          const obj = {
            email: values.email,
            password: values.password,
          };
          dispatch(LoginUser(obj));

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleChange, handleBlur, values }) => (
          <Form style={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: "flex",
                width: "500px",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.842)", // Add box shadow
                transition: "box-shadow 0.3s ease-in-out", // Smooth transition for shadow
                padding: "20px",
                margin: "20px",
                border: "1px solid white",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "#f0f0f0", mb: 2, textAlign: "center" }}
              >
                Login
              </Typography>
              <TextField
                label="Email"
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                fullWidth
                sx={{
                  mb: 3,
                  border: "1px solid white",
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 1, // Ensures the color is not faded
                  },
                  "& .MuiInputLabel-root": {
                    color: "white", // To set the label color
                  },
                  "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.MuiInputBase-formControl.css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root ":
                    { color: "white" },
                  color: "white",
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                fullWidth
                sx={{
                  mb: 3,
                  border: "1px solid white",
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 1, // Ensures the color is not faded
                  },
                  "& .MuiInputLabel-root": {
                    color: "white", // To set the label color
                  },
                  "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.MuiInputBase-formControl.css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root ":
                    { color: "white" },
                }}
                variant="outlined"
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red" }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Footer />
    </Box>
  );
};

export default AuthLogin;