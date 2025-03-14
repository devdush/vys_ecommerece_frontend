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
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";

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
  const [db, setDb] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState();

  const [qoutData, setQouteData] = useState();

  const { user } = useSelector((state) => state.auth);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

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
    const setupDB = async () => {
      const database = await initDB();
      setDb(database);
    };
    setupDB();
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (!db) return;
      try {
        const categoryResponse = await getCategories();
        getAllData(db);
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
  }, [db, total]);
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
  function saveData(db, data) {
    const transaction = db.transaction(["myStore"], "readwrite");
    const store = transaction.objectStore("myStore");

    const request = store.add(data);
    request.onsuccess = () => {
      console.log("Data saved successfully");
      getAllData(db); // Refresh the data display

      // Update the total immediately
      const newTotal = (total || 0) + data.productPrice * data.quantity;
      setTotal(newTotal);
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
      const retrievedData = request.result;
      setQouteData(retrievedData);

      const totalPrice = retrievedData.reduce((accumulator, product) => {
        const price = parseFloat(product.productPrice) * product.quantity;
        return accumulator + (isNaN(price) ? 0 : price);
      }, 0);

      setTotal(totalPrice);
    };

    request.onerror = (event) => {
      console.error("Error retrieving data:", event.target.errorCode);
    };
  }

  const handleDelete = async (id) => {
    if (!db) {
      toast.error("Database is not initialized!");
      return;
    }

    try {
      const transaction = db.transaction(["myStore"], "readwrite");
      const objectStore = transaction.objectStore("myStore");

      const deleteRequest = objectStore.delete(id);

      deleteRequest.onsuccess = () => {
        console.log(`Data with id ${id} deleted successfully.`);

        // Update the total by subtracting the deleted item’s price
        const deletedProduct = qoutData.find((item) => item.id === id);
        const newTotal =
          total - deletedProduct.productPrice * deletedProduct.quantity;
        setTotal(newTotal > 0 ? newTotal : 0);

        getAllData(db); // Refresh data display
      };

      deleteRequest.onerror = (event) => {
        console.error("Error deleting data:", event.target.error);
        toast.error("Failed to delete data!");
      };
    } catch (error) {
      console.error("Unexpected error during deletion:", error);
      toast.error("Something went wrong while deleting!");
    }
  };

  const columns = [
    {
      field: "productName",
      headerName: "Name",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "productPrice",
      headerName: "Sale Price",
      flex: 1,
      cellClassName: "name-column--cell",
      valueFormatter: (params) => {
        // Format the value to 2 decimal points
        const value = Number(params);

        return value.toFixed(2);
      },
    },

    {
      field: "action",
      headerName: "Actions",
      flex: 1,
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
            <Button
              onClick={() => handleDelete(params.row.id)}
              variant="contained"
              style={{
                backgroundColor: "#887575",
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
  return (
    <Box sx={{ background: "#030138", color: "white" }}>
      <Box
        name="topBar"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid white",
          flexWrap: "wrap",
        }}
      >
        <Box
          name="socialMedia"
          sx={{
            display: "flex",
            flex: 1,
            padding: "10px",
            flexGrow: 1,
            flexBasis: 200,
          }}
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
            <Typography sx={{ fontSize: "15px" }}>TikTok</Typography>
          </Box>
        </Box>
        <Box
          name="userOptions"
          sx={{
            display: "flex",
            flex: 1,
            padding: "10px",
            justifyContent: "right",
            flexGrow: 1,
            flexBasis: 200,
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
          <Link
            to={"/auth/login"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <Box name="login" sx={{ display: "flex", paddingRight: "10px" }}>
              <PersonOutlineOutlinedIcon sx={{ paddingRight: "5px" }} />
              <Typography sx={{ fontSize: "15px" }}>
                {user ? user.firstName : "Login"}
              </Typography>
            </Box>
          </Link>
          {user ? (
            <Box
              name="logout"
              sx={{ display: "flex", paddingRight: "10px", cursor: "pointer" }}
              onClick={() => {
                sessionStorage.clear();
                window.location.reload();
                toast.success("Logged out successfully");

              }}
            >
              <LogoutIcon sx={{ paddingRight: "5px" }} />
              <Typography sx={{ fontSize: "15px" }}>Logout</Typography>
            </Box>
          ) : (
            ""
          )}
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

              console.log("qoutData", qoutData);
            }}
          >
            <LocalPrintshopOutlinedIcon sx={{ paddingRight: "5px" }} />
            <Typography sx={{ fontSize: "15px" }}>Get A Quotation</Typography>
          </Box>
          <Link
            to={"/cart-view/cart"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <Box name="cart" sx={{ display: "flex", paddingRight: "10px" }}>
              <ShoppingCartOutlinedIcon sx={{ paddingRight: "5px" }} />
              <Typography sx={{ fontSize: "15px" }}>
                LKR {totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Link>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", overflowY: "scroll" }}
      >
        <Box
          sx={{
            bgcolor: "#080808cc",
            color: "black",
            backdropFilter: "blur(15px)",
            display: "flex",
            flexDirection: "column",
            height: "auto", // Allow content-based height
            width: "100%",
            overflowY: "auto", // Enable scrolling within the modal if content is too large
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
                  const selProduct = products.find(
                    (product) => product._id === values.product
                  );
                  console.log("selProduct", selProduct);
                  const savingObj = {
                    productName: selProduct.itemName,
                    productPrice: selProduct.sales_price,
                    productImage: selProduct.defaultImage,
                    quantity: quantity,
                  };
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
          <Box
            display="grid"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                color: "white",
              },
              "& .MuiDataGrid-cell": {
                backgroundColor: "#ffffff0f",
                color: "#fffff",
              },

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#ffffff0",
                color: "black",
              },
              "& .MuiDataGrid-row--borderBottom.css-yseucu-MuiDataGrid-columnHeaderRow":
                {
                  backgroundColor: "#ffffff1d",
                  backdropFilter: "2px",
                },
              padding: "20px",
            }}
          >
            <DataGrid
              rows={qoutData} // Use filtered data here
              getRowId={(row) => row.id}
              columns={columns}
            />
          </Box>
          <Box
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: "200" }}>
              Total
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: "700" }}>
              {total
                ? new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(total)
                : "0.00"}{" "}
              LKR
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default HomeHeader;
