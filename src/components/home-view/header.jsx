import {
  Box,
  Button,
  FormHelperText,
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
const HomeHeader = () => {
  const validationSchema = Yup.object().shape({
    categoryId: Yup.string().required("Title is required!"),
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categories, setCategories] = useState([]);
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
            onClick={handleOpen}
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
              borderBottom: "2px solid #8d8d8d",
              margin: "0px 20px",
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
          <Box sx={{ display: "flex", borderBottom:"2px solid #8d8d8d" }}>
            <Box sx={{ flex: 1 }}></Box>
            <Box sx={{ flex: 3, padding: "10px" }}>
              <Formik
                initialValues={{ categoryId: "" }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
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
                  resetForm,
                }) => (
                  <Form>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Select
                        sx={{
                          textAlign: "left", // Align the text to the left
                          "& .MuiSelect-select": {
                            textAlign: "left", // Alignment inside the select
                            border: "1px solid white",
                            borderRadius: "0px",
                            color: "white",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid white",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white", // Border color on hover
                          },
                          "& .MuiSelect-icon": {
                            color: "White", // Change arrow color here
                          },
                          width: "100%",
                        }}
                        name="categoryId"
                        value={values.categoryId}
                        onChange={handleChange}
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
                      <Select
                        sx={{
                          textAlign: "left", // Align the text to the left
                          "& .MuiSelect-select": {
                            textAlign: "left", // Alignment inside the select
                            border: "1px solid white",
                            borderRadius: "0px",
                            color: "white",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid white",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white", // Border color on hover
                          },
                          "& .MuiSelect-icon": {
                            color: "White", // Change arrow color here
                          },
                          width: "100%",
                        }}
                        name="categoryId"
                        value={values.categoryId}
                        onChange={handleChange}
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
                      <Button
                        type="submit"
                        sx={{
                          width: "50%",
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
