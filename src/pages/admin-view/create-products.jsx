import React, { useEffect, useState } from "react";
import { Formik, useFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

import AWS from "aws-sdk";
import { toast } from "react-toastify";
import { getCategories } from "../../services/category/getcategory";
import { getBrands } from "../../services/brand/getBrands";
import { addProduct } from "../../services/product/saveProduct";



const s3 = new AWS.S3();

const initialValues = {
  itemCode: "",
  productTitle: "",
  category: "",
  brand: "",
  colors: [],
  shortDescription: "",
  sellPrice: "",
  oldPrice: "",
  sku: "",
  stock: "",
  featuredProduct: false,
  onSale: false,
  topRated: false,
  specialOffers: false,
};
export const productValidation = Yup.object({
  productTitle: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  brand: Yup.string().required("Required"),
  sellPrice: Yup.number()
    .required("Required")
    .typeError("Must be a number")
    .positive("Must be a positive number"),
  oldPrice: Yup.number()
    .required("Required")
    .typeError("Must be a number")
    .positive("Must be a positive number"),
  sku: Yup.string().required("Required"),
  stock: Yup.number()
    .required("Required")
    .typeError("Must be a number")
    .min(0, "Cannot be negative"),
  //   description: Yup.string().required("Required"),
  //shortDescription: Yup.string().required("Required"),
  // colors: Yup.array()
  //   .of(Yup.string().required("Color is required"))
  //   .min(1, "At least one color is required"),
  //  specification: Yup.string().required("Required"),
});
export default function () {
  const theme = useTheme();
  const [preview, setPreview] = useState(null);
  const [specValue, setSpecValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [moreImages, setMoreImages] = useState([]); // Store multiple images
  const [uploadedMoreImages, setUploadedMoreImages] = useState([]); // Store multiple images
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const categoryResponse = await getCategories();
        const brandResponse = await getBrands();

        if (categoryResponse.data.success) {
          setCategories(categoryResponse.data.data);
        } else {
          toast.error("Category data didn't fetched!");
        }
        if (brandResponse.data.success) {
          setBrands(brandResponse.data.data);
        } else {
          toast.error("Brand data didn't fetched!");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching initial data");
      }
    };
    getData();
  }, []);

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
        if (img.width !== 343 || img.height !== 446) {
          setError(
            "Invalid image dimensions. Please upload an image of 300x300 pixels."
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
  const handleMoreImagesInput = (e) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files); // Convert FileList to an array
      fileArray.forEach((file) => {
        const fileSizeMB = file.size / (1024 * 1024); // Convert size to MB

        if (fileSizeMB <= 2) {
          const img = new Image();
          img.onload = () => {
            if (img.width === 343 && img.height === 446) {
              // Only add valid file objects to the state
              setMoreImages((prevImages) => [...prevImages, file]); // Add to the array
              // setUploadedMoreImages((prevImages) => [...prevImages, file]); // Add to the array
            }
          };
          img.onerror = () => {
            setError("Invalid image file. Please upload a valid image.");
          };
          img.src = URL.createObjectURL(file);
        }
      });
    }
  };

  const uploadFile = (file) => {
    const params = {
      Bucket: "imageholdervys",
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

  const uploadMoreImages = (file) => {
    const params = {
      Bucket: "imageholdervys",
      Key: file.name,
      Body: file,
      ACL: "public-read",
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
      } else {
        setUploadedMoreImages((prevImages) => [...prevImages, data.Location]);
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      uploadFile(selectedFile);
    } else {
      alert("Please select a valid file to upload.");
    }
  };
  const handleMoreSubmit = (e) => {
    e.preventDefault();
    console.log(moreImages);

    moreImages.forEach((image) => uploadMoreImages(image));
  };
  const test = () => {
    console.log("sadsadadas", uploadedMoreImages);
  };
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
        Create Product
      </Typography>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={productValidation}
          onSubmit={async (values, { setSubmitting }) => {
            // Parse numeric fields
            const parsedValues = {
              ...values,
              sellPrice: parseFloat(values.sellPrice),
              oldPrice: parseFloat(values.oldPrice),
              stock: parseInt(values.stock, 10),
              sku: parseInt(values.sku, 10),
              specValue: specValue,
              defaultImage: imageUrl,
              otherImages: uploadedMoreImages,
            };
            try {
              const response = await addProduct(parsedValues);
           
              if (response.data.success) {
                toast.success("Successfully added a new product to the shop");
              } else {
                toast.error("Product adding was unsuccessful!");
              }
            } catch (error) {
              toast.error("Something went wrong while saving product");
            }
            // console.log(parsedValues); // Verify the values before sending
            // alert(JSON.stringify(parsedValues, null, 2));
            setSubmitting(false);
          }}
        >
          {({
            errors,
            values,
            handleChange,
            handleBlur,
            touched,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                  sx={{
                    flex: 2,
                    display: "flex",
                    padding: "10px",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <TextField
                    label="Item Code"
                    name="itemCode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    size="small"
                    value={values.itemCode}
                    error={!!touched.itemCode && !!errors.itemCode}
                    helperText={touched.itemCode && errors.itemCode}
                  />
                  <TextField
                    label="Product Title"
                    name="productTitle"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    size="small"
                    value={values.productTitle}
                    error={!!touched.productTitle && !!errors.productTitle}
                    helperText={touched.productTitle && errors.productTitle}
                  />
                  <Select
                    sx={{
                      textAlign: "left", // Align the text to the left
                      ".MuiSelect-select": {
                        textAlign: "left", // For alignment inside the select
                      },
                    }}
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    displayEmpty
                    size="small"
                    error={!!touched.category && !!errors.category}
                  >
                    <MenuItem value="" disabled hidden>
                      Select a category
                    </MenuItem>
                    {/* <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem> */}
                    {categories &&
                      categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.categoryTitle}
                        </MenuItem>
                      ))}
                  </Select>

                  {touched.category && errors.category && (
                    <FormHelperText error>{errors.category}</FormHelperText>
                  )}
                  <Select
                    sx={{
                      textAlign: "left", // Align the text to the left
                      ".MuiSelect-select": {
                        textAlign: "left", // For alignment inside the select
                      },
                    }}
                    name="brand"
                    value={values.brand}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    displayEmpty
                    size="small"
                    error={!!touched.brand && !!errors.brand}
                  >
                    <MenuItem value="" disabled hidden>
                      Select a brand
                    </MenuItem>
                    {brands &&
                      brands.map((brand) => (
                        <MenuItem key={brand._id} value={brand._id}>
                          {brand.brandTitle}
                        </MenuItem>
                      ))}
                  </Select>

                  {touched.brand && errors.brand && (
                    <FormHelperText error>{errors.brand}</FormHelperText>
                  )}

                  <TextField
                    label="Colors"
                    name="colors"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const colorArray = inputValue
                        .split(",")
                        .map((color) => color.trim())
                        .filter((color) => color); // Remove empty values
                      setFieldValue("colors", colorArray);
                    }}
                    onBlur={handleBlur}
                    variant="outlined"
                    size="small"
                    value={values.colors.join(", ")} // Display as comma-separated string
                    error={!!touched.colors && !!errors.colors}
                    helperText={
                      touched.colors && errors.colors
                        ? "Please enter at least one color"
                        : "Separate colors with commas (e.g., red, blue)"
                    }
                  />

                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <TextField
                      label="Sell Price"
                      name="sellPrice"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={values.sellPrice}
                      error={!!touched.sellPrice && !!errors.sellPrice}
                      helperText={touched.sellPrice && errors.sellPrice}
                    />
                    <TextField
                      label="Old Price"
                      name="oldPrice"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      size="small"
                      value={values.oldPrice}
                      error={!!touched.oldPrice && !!errors.oldPrice}
                      helperText={touched.oldPrice && errors.oldPrice}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <TextField
                      label="SKU"
                      name="sku"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={values.sku}
                      error={!!touched.sku && !!errors.sku}
                      helperText={touched.sku && errors.sku}
                    />
                    <TextField
                      label="Stock"
                      name="stock"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      size="small"
                      value={values.stock}
                      error={!!touched.stock && !!errors.stock}
                      helperText={touched.stock && errors.stock}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
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
                      onClick={handleSubmit}
                      disabled={!selectedFile}
                    >
                      Upload
                    </Button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {imageUrl && (
                      <div>
                        {/* <p>Uploaded Image URL:</p>
                      <a
                        href={imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {imageUrl}
                      </a> */}
                        <img
                          src={imageUrl}
                          alt="Uploaded"
                          style={{ width: "200px" }}
                        />
                      </div>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      textAlign: "left",
                    }}
                  >
                    <Box>
                      <Typography>More Images</Typography>
                      <input
                        type="file"
                        multiple
                        onChange={handleMoreImagesInput}
                      />

                      {uploadedMoreImages.length > 0 && (
                        <div>
                          {uploadedMoreImages.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Uploaded More Image ${index}`}
                              style={{ width: "100px", margin: "5px" }}
                            />
                          ))}
                        </div>
                      )}
                      <Button
                        variant="outlined"
                        onClick={handleMoreSubmit}
                        disabled={
                          uploadedMoreImages.length != 0 ||
                          moreImages.length === 0
                        }
                      >
                        Upload More Images
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  padding: "10px",
                }}
              >
                <FormControl>
                  <FormLabel
                    sx={{ display: "flex", padding: "0px 0px 10px 0px" }}
                  >
                    Short Description
                  </FormLabel>
                  <TextareaAutosize
                    minRows={3}
                    style={{ fontSize: "16px" }}
                    name="shortDescription"
                    value={values.shortDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    height: "250px",
                  }}
                >
                  <FormLabel
                    sx={{ display: "flex", padding: "0px 0px 10px 0px" }}
                  >
                    Specifications
                  </FormLabel>
                  <ReactQuill
                    value={specValue}
                    onChange={setSpecValue}
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ color: [] }, { background: [] }], // Font color and background color
                        ["link", "image", "video"],
                        [{ align: [] }],
                        ["clean"],
                      ],
                    }}
                    formats={[
                      "header",
                      "font",
                      "size",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "blockquote",
                      "color",
                      "background",
                      "list",
                      "bullet",
                      "link",
                      "image",
                      "video",
                      "align",
                    ]}
                    style={{ height: "150px" }}
                  />
                </Box>
                <Box>
                  <FormGroup row>
                    {" "}
                    {/* `row` makes the checkboxes display horizontally */}
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          name="featuredProduct"
                          type="checkbox"
                          checked={values.featuredProduct}
                          onChange={handleChange}
                        />
                      }
                      label="Add to Featured Products"
                    />
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          name="onSale"
                          type="checkbox"
                          checked={values.onSale}
                          onChange={handleChange}
                        />
                      }
                      label="Add to On Sale"
                    />
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          name="topRated"
                          type="checkbox"
                          checked={values.topRated}
                          onChange={handleChange}
                        />
                      }
                      label="Add to Top Rated Product"
                    />
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          name="specialOffers"
                          type="checkbox"
                          checked={values.specialOffers}
                          onChange={handleChange}
                        />
                      }
                      label="Add to Special Offer Product"
                    />
                  </FormGroup>
                </Box>
              </Box>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                sx={{ backgroundColor: "#20C4C4" }}
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Paper>
  );
}
