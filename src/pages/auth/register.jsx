import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Box } from "@mui/material";
import register, { registerUser } from "../../services/auth/register";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  primaryphonenumber: Yup.string()
    .required("Phone number is required")
    .matches(/^0\d{9}$/, "Invalid phone number. 0xxxxxxxxx"),
  secondaryphonenumber: Yup.string().matches(
    /^0\d{9}$/,
    "Secondary phone number must start with 0 and be 10 digits long"
  ),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  repassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const AuthRegister = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "grid", placeItems: "center", p: 5 }}>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          primaryphonenumber: "",
          secondaryphonenumber: "",
          password: "",
          repassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const obj = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            primaryPhoneNumber: values.primaryphonenumber,
            secondaryPhoneNumber: values.secondaryphonenumber,
            password: values.password,
          };
          try {
            const response = await registerUser(obj);
            if (response?.data?.success) {
              toast.success("Success");

              navigate("/auth/login");
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            toast.error(error);
            console.log(error);
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleChange, handleBlur, values }) => (
          <Box sx={{ width: "100%", maxWidth: 500 }}>
            <Typography
              variant="h4"
              sx={{ color: "#f0f0f0", mb: 2, textAlign: "center" }}
            >
              Register
            </Typography>
            <input type="text" />
            <Form>
              <TextField
                label="First Name *"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
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
                }}
                variant="outlined"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                style={{ color: "red" }}
              />

              <TextField
                label="Last Name *"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
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
                }}
                variant="outlined"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                style={{ color: "red" }}
              />

              <TextField
                label="Email Address *"
                name="email"
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
                }}
                variant="outlined"
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />

              <TextField
                label="Primary Phone Number *"
                name="primaryphonenumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.primaryphonenumber}
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
                }}
                variant="outlined"
              />
              <ErrorMessage
                name="primaryphonenumber"
                component="div"
                style={{ color: "red" }}
              />

              <TextField
                label="Secondary Phone Number"
                name="secondaryphonenumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.secondaryphonenumber}
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
                }}
                variant="outlined"
              />
              <ErrorMessage
                name="secondaryphonenumber"
                component="div"
                style={{ color: "red" }}
              />

              <TextField
                label="Password *"
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
                }}
                variant="outlined"
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red" }}
              />

              <TextField
                label="Re-Enter Password *"
                name="repassword"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.repassword}
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
                }}
                variant="outlined"
              />
              <ErrorMessage
                name="repassword"
                component="div"
                style={{ color: "red" }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, py: 1.5 }}
                disabled={isSubmitting}
              >
                Register
              </Button>
            </Form>
            <Typography sx={{ mt: 3, color: "#f0f0f0", textAlign: "center" }}>
              Already have an account? <a href="Sinin">Login</a>
            </Typography>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default AuthRegister;
