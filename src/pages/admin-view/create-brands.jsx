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
import { addBrand } from "../../services/brand/addBrand";

const CreateBrands = () => {
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [imageUrl, setImageUrl] = useState("");
  // const [error, setError] = useState("");

  // const handleFileInput = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const fileSizeMB = file.size / (1024 * 1024); // Convert size to MB
  //     if (fileSizeMB > 2) {
  //       setError("File size exceeds 2MB. Please upload a smaller file.");
  //       setSelectedFile(null);
  //       return;
  //     }

  //     const img = new Image();
  //     img.onload = () => {
  //       if (img.width !== 343 || img.height !== 446) {
  //         setError(
  //           "Invalid image dimensions. Please upload an image of 300x300 pixels."
  //         );
  //         setSelectedFile(null);
  //       } else {
  //         setError("");
  //         setSelectedFile(file);
  //       }
  //     };
  //     img.onerror = () => {
  //       setError("Invalid image file. Please upload a valid image.");
  //       setSelectedFile(null);
  //     };
  //     img.src = URL.createObjectURL(file);
  //   }
  // };

  // const uploadFile = (file) => {
  //   const params = {
  //     Bucket: "imageholdervys",
  //     Key: file.name,
  //     Body: file,
  //     ACL: "public-read", // Set to 'public-read' to allow access to the file URL
  //   };

  //   s3.upload(params, (err, data) => {
  //     if (err) {
  //       console.error("Error uploading file:", err);
  //     } else {
  //       console.log("File uploaded successfully:", data);
  //       setImageUrl(data.Location); // Set the image URL for display
  //     }
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (selectedFile) {
  //     uploadFile(selectedFile);
  //   } else {
  //     alert("Please select a valid file to upload.");
  //   }
  // };
  const initialValues = { title: "" };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required!"),
  });
  const theme = useTheme();
  return (
    // <div>
    //   <h3>Upload Image to S3</h3>
    //   <input type="file" onChange={handleFileInput} />
    //   <button onClick={handleSubmit} disabled={!selectedFile}>
    //     Upload
    //   </button>
    //   {error && <p style={{ color: "red" }}>{error}</p>}
    //   {imageUrl && (
    //     <div>
    //       <p>Uploaded Image URL:</p>
    //       <a href={imageUrl} target="_blank" rel="noopener noreferrer">
    //         {imageUrl}
    //       </a>
    //       <img src={imageUrl} alt="Uploaded" style={{ width: "200px" }} />
    //     </div>
    //   )}
    // </div>
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
            Create Brand
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
                  brandTitle:values.title
                }
                const response = await addBrand(obj);
                if (response.data.success) {
                  toast.success("Successfully Added a New Brand!");
                } else {
                  toast.error(response.data.message);
                }
              } catch (error) {
                console.log(error);
                
                toast.error(
                  "Something Went Wrong While Adding New Brand!"
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
    </Box>
  );
};

export default CreateBrands;
