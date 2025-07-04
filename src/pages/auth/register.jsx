import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Box } from "@mui/material";
import register, { registerUser } from "../../services/auth/register";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/home-view/footer";

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
    <Box width={"100%"}>
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
              toast.success(
                "Registration successful! Please login after verifying your email. Check your inbox and spam for a verification email."
              );
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
          <Box>
            <Form>
              <Typography
                variant="h4"
                sx={{ color: "#f0f0f0", textAlign: "center" }}
              >
                Register
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  margin: "40px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    flex: 1,
                    margin: "40px",
                  }}
                >
                  <TextField
                    label="First Name"
                    name="firstName"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    fullWidth
                    sx={{
                      mb: 3,
                      border: "1px solid white",
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "white",
                        opacity: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                    variant="outlined"
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="firstName"
                    component="div"
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    fullWidth
                    sx={{
                      mb: 3,
                      border: "1px solid white",
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "white",
                        opacity: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                    variant="outlined"
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="lastName"
                    component="div"
                  />
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
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "white",
                        opacity: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                    variant="outlined"
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="email"
                    component="div"
                  />
                  <TextField
                    label="Primary Phone Number"
                    name="primaryphonenumber"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.primaryphonenumber}
                    fullWidth
                    sx={{
                      mb: 3,
                      border: "1px solid white",
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "white",
                        opacity: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                    variant="outlined"
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="primaryphonenumber"
                    component="div"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    flex: 1,
                    margin: "40px",
                  }}
                >
                  <TextField
                    label="Secondary Phone Number"
                    name="secondaryphonenumber"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.secondaryphonenumber}
                    fullWidth
                    sx={{
                      mb: 3,
                      border: "1px solid white",
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "white",
                        opacity: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                    variant="outlined"
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="secondaryphonenumber"
                    component="div"
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
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "white",
                        opacity: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                    variant="outlined"
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="password"
                    component="div"
                  />
                  <TextField
                    label="Re-enter Password"
                    name="repassword"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.repassword}
                    fullWidth
                    sx={{
                      mb: 3,
                      border: "1px solid white",
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "white",
                        opacity: 1,
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                    variant="outlined"
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="repassword"
                    component="div"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    sx={{ mt: 3 }}
                  >
                    Register
                  </Button>
                </Box>
              </Box>
            </Form>
            <Typography sx={{ mt: 3, color: "#f0f0f0", textAlign: "center" }}>
              Already have an account? <a href="/auth/login">Login</a>
            </Typography>
          </Box>
        )}
      </Formik>
      <Footer />
    </Box>
  );
};

export default AuthRegister;
