import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProducts } from "../../services/product/getProducts";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormGroup,
  TextareaAutosize,
  FormControlLabel,
} from "@mui/material";

import { useTheme } from "@emotion/react";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { Category } from "@mui/icons-material";
import { Field, Form, Formik } from "formik";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

import AWS from "aws-sdk";

import { getCategories } from "../../services/category/getcategory";
import { getBrands } from "../../services/brand/getBrands";
import { addProduct } from "../../services/product/saveProduct";
import * as Yup from "yup";
import { deleteProduct } from "../../services/product/deleteProduct";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const s3 = new AWS.S3();

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
const UpdateProducts = () => {
  const theme = useTheme();

  const [products, setProducts] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const [modalType, setModalType] = useState("");

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input
  const [filteredData, setFilteredData] = useState([]); // State to hold filtered data
  const [open, setOpen] = useState(false);

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
        const response = await getProducts();

        setProducts(response.data.data);
        setFilteredData(response.data.data); // Set initial filtered data
      } catch (error) {
        toast.error("Something went wrong while fetching initial data");
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((item) =>
      item.itemName
        .replace(/\s+/g, "")
        .toLowerCase()
        .includes(searchQuery.replace(/\s+/g, "").toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, products]);

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
      Bucket: "vysimages",
      Key: file.name,
      Body: file,
      ACL: "public-read", // Set to 'public-read' to allow access to the file URL
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
      } else {
   
        setImageUrl(data.Location); // Set the image URL for display
      }
    });
  };

  const uploadMoreImages = (file) => {
    const params = {
      Bucket: "vysimages",
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
 

    moreImages.forEach((image) => uploadMoreImages(image));
  };

  const columns = [
    {
      field: "itemName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "onHand",
      headerName: "Quantity",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "sales_price",
      headerName: "Sale Price",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "SKU",
      headerName: "SKU",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "action",
      headerName: "Actions",
      flex: 2,
      headerAlign: "left",
      align: "center",
      renderCell: (params) => (
        <Box>
          <Box
            sx={{
              display: "flex",

              justifyContent: "space-around",
            }}
          >
            {/* <Button
              onClick={() => handleUpdate(params.row, "view")}
              variant="contained"
              style={{
                backgroundColor: "#15ccfa",
                color: "black",
              }}
            >
              View
            </Button> */}
            {/* <Button
              onClick={() => handleUpdate(params.row, "edit")}
              variant="contained"
              style={{
                backgroundColor: "#fad015",
                color: "black",
              }}
            >
              Edit
            </Button> */}
            <Button
              onClick={() => handleDelete(params.row)}
              variant="contained"
              style={{
                backgroundColor: "#ff4040",
                color: "white",
              }}
            >
              <DoNotDisturbIcon sx={{ mr: "5px" }} />
              Delete
            </Button>
          </Box>
        </Box>
      ),
    },
  ];

  const handleUpdate = async (id, modalType) => {
    setSelectedData(id);

    setModalType(modalType);
    handleOpen();
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return; // Exit if the user cancels the deletion
    }

    try {
      const response = await deleteProduct(id._id);
      if (response.data.success) {
        toast.success("Product deleted successfully!");
        // Remove the deleted product from the state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id._id)
        );
        setFilteredData((prevFilteredData) =>
          prevFilteredData.filter((product) => product._id !== id._id)
        );
      }
    } catch (error) {
      toast.error("Something went wrong while deletion!");
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontFamily: "Poppins, sans-serif", // Change to any font family you want
            fontWeight: "600",
            padding: "10px",
          }}
        >
          Product List
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          padding: "10px",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          sx={{
            width: "30%",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: "20px" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        display="grid"
        height="78vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.secondary,
          },
        }}
      >
        <DataGrid
          rows={filteredData} // Use filtered data here
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", padding: "10px" }}
      >
        <Box
          sx={{
            width: "80%",
            padding: "10px",

            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            backdropFilter: "blur(3px)", // Blur effect
            border: "1px solid rgba(255, 255, 255, 0.18)", // Light border
            textAlign: "center",
            "@media (max-width: 600px)": {
              width: "90%", // Smaller screen adjustment
              maxWidth: "100%",
              p: 3,
            },
            display: "flex",
            overflow: "scroll",
            height: "100%",
            justifyContent: "center",
          }}
        >
          {selectedData ? (
            <Formik
              initialValues={{
                itemCode: selectedData.itemName || "",
                productTitle: selectedData.perDescription || "",
                category: selectedData?.category?._id || "",
                brand: selectedData?.brand?._id || "",
                colors: [],
                shortDescription: "",
                sellPrice: selectedData.sales_price_with_vat || "",
                oldPrice: "",
                sku: "",
                stock: selectedData.on_hand || "",
                featuredProduct: false,
                onSale: false,
                topRated: false,
                specialOffers: false,
              }}
              validationSchema={productValidation}
              onSubmit={async (values, { setSubmitting }) => {
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
                } catch (error) {
                  toast.error("Something went wrong while saving product");
                }
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
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
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
                        {categories &&
                          categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                              {selectedData?.category?.categoryTitle}
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
                    <Box
                      sx={{ display: "flex", flexDirection: "column", flex: 1 }}
                    >
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
                            [
                              "bold",
                              "italic",
                              "underline",
                              "strike",
                              "blockquote",
                            ],
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
          ) : (
            <p>Loading...</p>
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

export default UpdateProducts;
