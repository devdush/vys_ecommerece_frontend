import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Grid,
  Paper,
  FormHelperText,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { getMainCategory } from "../../services/main-category/getMainCategory";
import { toast } from "react-toastify";
import { addCategory } from "../../services/category/addCategory";

const validationSchema = Yup.object({
  main_Category: Yup.string().required("Main Category is required"),
  category_Title: Yup.string().required("Category Title is required"),
});

const CreateCategory = () => {
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [mainCategories, setMainCategories] = useState([]);

  const theme = useTheme();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width === 343 && img.height === 446) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
            setImageError(""); // Clear any previous errors
          };
          reader.readAsDataURL(file);
        } else {
          setImageError("Image size must be exactly 570px by 320px.");
          setPreview(null); // Clear preview if the image is invalid
        }
      };
    } else {
      setPreview(null);
      setImageError("");
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const categoryResponse = await getMainCategory();
        console.log(categoryResponse);
        setMainCategories(categoryResponse.data.data);
      } catch (error) {
        toast.error("Something went wrong while fetching initial data");
      }
    };
    getData();
  }, []);
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
      <Typography variant="h4" gutterBottom>
        Create Category
      </Typography>
      <Formik
        initialValues={{
          main_Category: "",
          category_Title: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const obj = {
            categoryTitle: values.category_Title,
            mainCategoryId: values.main_Category,
          };
          try {
            const response = await addCategory(obj);
            toast.success("Successfully added a new category");
          } catch (error) {
            toast.error("something went wrong while adding new category");
          }
          setSubmitting(false);
        }}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
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
              }}
            >
              <Box mb={3}>
                <Typography variant="body1">
                  Main Category <span style={{ color: "red" }}>*</span>
                </Typography>
                <Select
                  sx={{
                    textAlign: "left", // Align the text to the left
                    ".MuiSelect-select": {
                      textAlign: "left", // For alignment inside the select
                    },
                  }}
                  name="main_Category"
                  value={values.main_Category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  displayEmpty
                  size="small"
                  error={!!touched.main_Category && !!errors.main_Category}
                >
                  <MenuItem value="" disabled hidden>
                    Select a main_Category
                  </MenuItem>
                  {mainCategories &&
                    mainCategories.map((mainCategory) => (
                      <MenuItem key={mainCategory._id} value={mainCategory._id}>
                        {mainCategory.title}
                      </MenuItem>
                    ))}
                </Select>

                {touched.main_Category && errors.main_Category && (
                  <FormHelperText error>{errors.main_Category}</FormHelperText>
                )}
              </Box>

              <Box mb={3}>
                <Typography variant="body1">
                  Category Title <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  name="category_Title"
                  value={values.category_Title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  size="small"
                />
                <ErrorMessage
                  name="category_Title"
                  component="div"
                  style={{ color: "red" }}
                />
              </Box>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                sx={{ backgroundColor: "#20C4C4" }}
              >
                Save
              </Button>

              {/* 
             
              <Grid item xs={12} md={4}>
                <Typography variant="body1" gutterBottom>
                  Default Image (570px X 320px)
                </Typography>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ marginBottom: 2 }}
                >
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    id="upload"
                    name="image"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleImageChange(e);
                      handleChange(e);
                    }}
                    hidden
                  />
                </Button>

                {imageError && (
                  <Typography variant="body2" color="error">
                    {imageError}
                  </Typography>
                )}

                {preview && (
                  <Box mt={2}>
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        display: "block",
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  </Box>
                )}
              </Grid> */}
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default CreateCategory;
