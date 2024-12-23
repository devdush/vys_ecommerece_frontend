import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import logo from "./vys.png";
import { Link } from "react-router-dom";
import GetQuotation from "./getQoutationModal";
import { Modal } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Form, Formik } from "formik";
import { getCategories } from "../../services/category/getcategory";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { getProductsByCategory } from "../../services/product/getProductByCategory";
import { initDB } from "../../services/indexedDBService";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DOMPurify from "dompurify";

const HomeHeader = () => {
  const validationSchema = Yup.object().shape({
    categoryId: Yup.string().required("Title is required!"),
    product: Yup.string().required("Title is required!"),
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [db, setDb] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity("");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const categoryResponse = await getCategories();

        if (categoryResponse.data.success) {
          setCategories(categoryResponse.data.data);
        } else {
          toast.error("Category data didn't fetched!");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching initial data");
      }
    };
    getData();
  }, []);
  useEffect(() => {
    if (!selectedCategory) return; // Exit early if selectedCategory is empty or undefined
    const getData = async () => {
      try {
        const productResponse = await getProductsByCategory(selectedCategory);
        if (productResponse.data.success) {
          setProducts(productResponse.data.data); // Corrected setCategories to setProducts
        } else {
          toast.error("Product data didn't fetch!");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching initial product data");
      }
    };
    getData();
  }, [selectedCategory]);

  useEffect(() => {
    const setupDB = async () => {
      const database = await initDB();
      setDb(database);
    };
    setupDB();
  }, []);
  function saveData(db, data) {
    console.log("Function Triggered");

    const transaction = db.transaction(["myStore"], "readwrite");
    const store = transaction.objectStore("myStore");

    const request = store.add(data);
    request.onsuccess = () => {
      console.log("Data saved successfully");
    };

    request.onerror = (event) => {
      console.error("Error saving data:", event.target.errorCode);
    };
  }
  function getAllData(db) {
    const transaction = db.transaction(["myStore"], "readonly");
    const store = transaction.objectStore("myStore");

    const request = store.getAll();
    request.onsuccess = () => {
      console.log("All data:", request.result);
    };

    request.onerror = (event) => {
      console.error("Error retrieving data:", event.target.errorCode);
    };
  }

  return (
    <Box sx={{ background: "#030138", color: "white" }}>
      <Box
        name="topBar"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid white",
        }}
      >
        <Box
          name="socialMedia"
          sx={{ display: "flex", flex: 1, padding: "10px" }}
        >
          <Box name="facebook" sx={{ display: "flex", paddingRight: "10px" }}>
            <Link
              to={"https://www.facebook.com/VYSInternational"}
              target="_blank"
            >
              <FacebookOutlinedIcon
                sx={{
                  paddingRight: "5px",
                  textDecoration: "none",
                  color: "white",
                }}
              />
            </Link>
            <Typography sx={{ fontSize: "15px" }}>Facebook</Typography>
          </Box>
          <Box name="instagram" sx={{ display: "flex", paddingRight: "10px" }}>
            <Link
              to={"https://www.instagram.com/vys.international/"}
              target="_blank"
            >
              <InstagramIcon
                sx={{
                  paddingRight: "5px",
                  textDecoration: "none",
                  color: "white",
                }}
              />
            </Link>
            <Typography sx={{ fontSize: "15px" }}>Instagram</Typography>
          </Box>
          <Box name="tiktok" sx={{ display: "flex", paddingRight: "10px" }}>
            <Link
              to={"https://www.tiktok.com/@vys.international"}
              target="_blank"
            >
              <MusicNoteOutlinedIcon
                sx={{
                  paddingRight: "5px",
                  textDecoration: "none",
                  color: "white",
                }}
              />
            </Link>
            <Typography sx={{ fontSize: "15px" }}>Tiktok</Typography>
          </Box>
        </Box>
        <Box
          name="userOptions"
          sx={{
            display: "flex",
            flex: 1,
            padding: "10px",
            justifyContent: "right",
          }}
        >
          <Box name="location" sx={{ display: "flex", paddingRight: "10px" }}>
            <LocationOnOutlinedIcon sx={{ paddingRight: "5px" }} />
            <Typography sx={{ fontSize: "15px" }}>Store Locator</Typography>
          </Box>
          <Box name="trackOrder" sx={{ display: "flex", paddingRight: "10px" }}>
            <LocalShippingOutlinedIcon sx={{ paddingRight: "5px" }} />
            <Typography sx={{ fontSize: "15px" }}>Track Your Order</Typography>
          </Box>
          <Box name="login" sx={{ display: "flex", paddingRight: "10px" }}>
            <PersonOutlineOutlinedIcon sx={{ paddingRight: "5px" }} />
            <Typography sx={{ fontSize: "15px" }}>Login</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        name="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",

          alignItems: "center",
        }}
      >
        <Box
          name="companyLogo"
          sx={{
            display: "flex",
            flex: 1,
            padding: "10px",
            justifyContent: "left",
          }}
        >
          <Link to={"/"}>
            <img alt="Company Logo" width="50%" src={logo} />
          </Link>
        </Box>
        <Box name="search" sx={{ display: "flex", flex: 1, padding: "10px" }}>
          <TextField
            label="Search Products"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon sx={{ fontSize: "20px", color: "white" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color when focused
                },
                color: "white", // Ensures icon and label inherit text color
              },
              "& .MuiInputBase-input": {
                color: "white", // Changes user input text color
              },
              "& .MuiInputLabel-root": {
                color: "white", // Label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white", // Label color when focused
              },
            }}
          />
        </Box>
        <Box
          name="deal"
          sx={{
            display: "flex",
            flex: 1,
            padding: "10px",
            justifyContent: "right",
          }}
        >
          <Box
            name="getQuotation"
            sx={{
              display: "flex",
              paddingRight: "10px",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              handleOpen();
              getAllData(db);
            }}
          >
            <GetQuotation open={open} handleClose={handleClose} />
            <LocalPrintshopOutlinedIcon sx={{ paddingRight: "5px" }} />
            <Typography sx={{ fontSize: "15px" }}>Get A Quotation</Typography>
          </Box>
          <Box name="cart" sx={{ display: "flex", paddingRight: "10px" }}>
            <ShoppingCartOutlinedIcon sx={{ paddingRight: "5px" }} />
            <Typography sx={{ fontSize: "15px" }}>LKR 0.00</Typography>
          </Box>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex" }}
      >
        <Box
          sx={{
            width: "100%",

            bgcolor: "#08080855",
            color: "black",
            backdropFilter: "blur(10px)", // Blur effect
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              color: "white",
              padding: "10px",
            }}
          >
            <Box sx={{ flex: 1 }}></Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "700" }}>
                Quotation
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <IconButton sx={{ color: "white", "&:hover": { color: "red" } }}>
                <HighlightOffIcon
                  sx={{ fontSize: "40px" }}
                  onClick={handleClose}
                />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: "flex", borderBottom: "2px solid #8d8d8d" }}>
            <Box sx={{ flex: 1 }}></Box>
            <Box sx={{ flex: 3, padding: "10px" }}>
              <Formik
                initialValues={{
                  categoryId: "",
                  product: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  console.log(values, quantity); // Product object and quantity will be logged here

                  // Use `find` to locate the selected product by matching `_id`
                  const selProduct = products.find(
                    (product) => product._id === values.product
                  );
                  const savingObj = {
                    productName: selProduct.itemName,
                    productPrice: selProduct.sales_price,
                    quantity: quantity,
                  };
                  console.log("selProduct", savingObj);
                  saveData(db, savingObj);
                  getAllData(db);
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
                  resetForm,
                }) => (
                  <Form>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      {/* Category Select */}
                      <Select
                        sx={{
                          textAlign: "left",
                          "& .MuiSelect-select": {
                            textAlign: "left",
                            border: "1px solid white",
                            borderRadius: "0px",
                            color: "white",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            //  border: "1px solid white",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            //borderColor: "white",
                          },
                          "& .MuiSelect-icon": {
                            color: "white",
                          },
                          width: "350px",
                        }}
                        name="categoryId"
                        value={values.categoryId}
                        onChange={(event) => {
                          handleChange(event);
                          setSelectedCategory(event.target.value);
                        }}
                        onBlur={handleBlur}
                        variant="outlined"
                        displayEmpty
                        size="small"
                      >
                        <MenuItem value="" disabled hidden>
                          Select a category
                        </MenuItem>
                        {categories &&
                          categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                              {category?.categoryTitle}
                            </MenuItem>
                          ))}
                      </Select>

                      {/* Product Select */}
                      <Select
                        sx={{
                          textAlign: "left",
                          "& .MuiSelect-select": {
                            textAlign: "left",
                            border: "1px solid white",
                            borderRadius: "0px",
                            color: "white",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            // border: "1px solid white",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            // borderColor: "white",
                          },
                          "& .MuiSelect-icon": {
                            color: "White",
                          },
                          width: "350px",
                        }}
                        name="product"
                        value={values.product}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        displayEmpty
                        size="small"
                      >
                        <MenuItem value="" disabled hidden>
                          Select a product
                        </MenuItem>
                        {products &&
                          products.map((product) => (
                            <MenuItem key={product._id} value={product._id}>
                              {product?.itemName}
                            </MenuItem>
                          ))}
                      </Select>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          color: "white",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          overflow: "hidden",
                          width: "150px",
                          padding: "5px 0px 5px 0px",
                        }}
                      >
                        <IconButton
                          onClick={handleDecrease}
                          size="small"
                          sx={{
                            borderLeft: "1px solid #ffffff",
                            borderRight: "1px solid #ffffff",
                            color: "white",
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>

                        <TextField
                          value={quantity}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          sx={{ color: "white" }}
                          inputProps={{
                            style: {
                              textAlign: "center",
                              width: "40px",
                              padding: "5px 0",
                              color: "white",
                            },
                          }}
                          variant="standard"
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                        <IconButton
                          onClick={handleIncrease}
                          size="small"
                          sx={{
                            borderLeft: "1px solid #ffffff",
                            borderRight: "1px solid #ffffff",
                            color: "white",
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      {/* Submit Button */}
                      <Button
                        type="submit"
                        sx={{
                          width: "20%",
                          backgroundColor: "#ffffff",
                          fontWeight: "600",
                        }}
                      >
                        Add Item
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
            <Box sx={{ flex: 1 }}></Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default HomeHeader;
