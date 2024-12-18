import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { addMainCategory } from "../../services/main-category/addMainCategory";
import { useTheme } from "@emotion/react";
const CreateMainCategory = () => {
  const initialValues = { title: "" };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required!"),
  });
  const theme = useTheme();
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "10px",
        margin: "20px",
        borderRadius: "10px",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create Main Category
        </Typography>
      </Box>

      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              const response = await addMainCategory({ title: values.title });
              if (response.data.success) {
                toast.success("Successfully Added a New Main Category!");
              } else {
                toast.error(response.data.message);
              }
            } catch (error) {
              toast.error(
                "Something Went Wrong While Adding New Main Category!"
              );
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            isValid,
            handleBlur,
            handleChange,
            resetForm,
          }) => (
            <Form
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              {/* Left Column - Form Section */}
              <Box
                sx={{
                  width: "60%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  margin="normal"
                  name="title"
                  label="Main Category Title"
                  type="text"
                  id="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    alignSelf: "center",
                    mt: 2,
                    backgroundColor: "#2596be",
                    width: "10px",
                  }}
                >
                  Save
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Paper>
  );
};

export default CreateMainCategory;
