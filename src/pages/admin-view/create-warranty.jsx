import {
  Box,
  Button,
  duration,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { addMainCategory } from "../../services/main-category/addMainCategory";
import { useTheme } from "@emotion/react";
import { addBrand } from "../../services/brand/addBrand";
import AWS from "aws-sdk";
import { addWarranty } from "../../services/warranty/addWarrantyService";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const s3 = new AWS.S3();

const CreateWarranty = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [imageUrl, setImageUrl] = useState("");

  const [error, setError] = useState("");

  const initialValues = { duration: "" };
  const validationSchema = Yup.object().shape({
    duration: Yup.string().required("Duration is required!"),
  });
  const theme = useTheme();

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024); // Convert size to MB
      if (fileSizeMB > 2) {
        setError("File size exceeds 2MB. Please upload a smaller file.");
        setSelectedFile(null);
        return;
      }

      const img = new Image();
      img.onload = () => {
        if (img.width !== 750 || img.height !== 288) {
          setError(
            "Invalid image dimensions. Please upload an image of 600 x 600 pixels."
          );
          setSelectedFile(null);
        } else {
          setError("");
          setSelectedFile(file);
        }
      };
      img.onerror = () => {
        setError("Invalid image file. Please upload a valid image.");
        setSelectedFile(null);
      };
      img.src = URL.createObjectURL(file);
    }
  };
  const uploadFile = (file) => {
    const params = {
      Bucket: "vysimages",
      Key: file.name,
      Body: file,
      ACL: "public-read", // Set to 'public-read' to allow access to the file URL
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
      } else {
        console.log("File uploaded successfully:", data);
        setImageUrl(data.Location); // Set the image URL for display
      }
    });
  };
  const handleSubmitImage = (e) => {
    e.preventDefault();
    if (selectedFile) {
      uploadFile(selectedFile);
    } else {
      alert("Please select a valid file to upload.");
    }
  };

  return (
    <Box>
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
            Create Warranty Period
          </Typography>
        </Box>

        <Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              try {
                const obj = {
                  duration: values.duration,
                  imageUrl: imageUrl,
                };
                const response = await addWarranty(obj);
                if (response.data.success) {
                  toast.success("Successfully Added a New Brand!");
                } else {
                  toast.error(response.data.message);
                }
                console.log(values, imageUrl);
              } catch (error) {
                console.log(error);

                toast.error("Something Went Wrong While Adding New Brand!");
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
                    name="duration"
                    label="Warranty Duration Period"
                    type="text"
                    id="duration"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.duration}
                    error={!!touched.duration && !!errors.duration}
                    helperText={touched.duration && errors.duration}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      textAlign: "left",
                    }}
                  >
                    <Typography>Default Image</Typography>
                    <input type="file" onChange={handleFileInput} />
                    <Button
                      variant="outlined"
                      onClick={handleSubmitImage}
                      disabled={!selectedFile}
                    >
                      Upload
                    </Button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {imageUrl && (
                      <div>
                        <img
                          src={imageUrl}
                          alt="Uploaded"
                          style={{ width: "200px" }}
                        />
                      </div>
                    )}
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={imageUrl === ""}
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
    </Box>
  );
};

export default CreateWarranty;
