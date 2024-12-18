import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { getProductsById } from "../../services/product/getProductById";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@emotion/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DOMPurify from "dompurify";

const validationSchema = Yup.object({});

const Products = () => {
  const theme = useTheme();
  const [ProductData, setProductData] = useState([]);
  const [imageArray, setImageArray] = useState([]);
  const [selectedImage, setSelectedImage] = useState(imageArray[0]);
  const [quantity, setQuantity] = useState(1);
  const [defaulImg, setDefaultImg] = useState("");

  const sliderRef = useRef(null);

  const brandSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: imageArray.length > 2 ? true : false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const getData = async () => {
      const pathname = window.location.pathname;
      const id = pathname.split("/").pop();
      try {
        const response = await getProductsById(id);
        setProductData(response.data.data);
        const imgArray = [
          response.data.data.defaultImage,
          ...response.data.data.otherImages,
        ];
        console.log(response.data.data);
        setDefaultImg(response.data.data.defaultImage);
        setImageArray(imgArray);
      } catch (error) {
        toast.error("Something went wrong while fetching initial data");
      }
    };
    getData();
  }, []);

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

  const handleBlur = () => {
    if (quantity === "" || quantity <= 0) {
      setQuantity(1);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          padding: "10px",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              width: "100%",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",

              marginBottom: "20px",
            }}
          >
            <img
              src={selectedImage != null ? selectedImage : defaulImg}
              alt="Selected Product"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Thumbnail Slider */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",

              alignItems: "center",
            }}
          >
            {imageArray?.length > 1 ? (
              <Box name="sliderContainer" sx={{ maxWidth: "400px" }}>
                <Slider {...brandSettings}>
                  {imageArray.map((image, index) => (
                    <Box key={index} onClick={() => setSelectedImage(image)}>
                      <img
                        src={image}
                        alt={image.alt}
                        style={{
                          width: "100px",
                          height: "100px",
                          border:
                            image === selectedImage ? "1px solid white" : "",
                        }}
                      />
                    </Box>
                  ))}
                </Slider>
              </Box>
            ) : (
              <Box></Box>
            )}
          </Box>
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "start",
              borderBottom: "1px solid white",
              padding: "10px 0px",
            }}
          >
            <Typography variant="h7" sx={{ fontWeight: "300", padding: "5px" }}>
              {ProductData?.category?.categoryTitle}
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: "500", padding: "5px", textAlign: "left" }}
            >
              {ProductData?.itemName}
            </Typography>
            <Typography variant="h7" sx={{ fontWeight: "400", padding: "5px" }}>
              Availability:{" "}
              <span style={{ color: "#01e427" }}>
                {ProductData?.onHand} Available in Stock
              </span>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "start",
              borderBottom: "1px solid white",
              textAlign: "left",
              padding: "10px 0px",
            }}
          >
            <IconButton sx={{ color: "white", fontSize: "14px" }}>
              <LocalPrintshopOutlinedIcon sx={{ color: "white" }} />
              Add to Quotation
            </IconButton>
            <Typography
              sx={{ lineHeight: "5px", fontWeight: "300" }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(ProductData?.shortDescription),
              }}
            />

            <Typography
              variant="h7"
              sx={{ fontWeight: "400", color: "white" }}
            >
              SKU : {ProductData?.SKU}
            </Typography>
            {ProductData?.warranty?.duration != "No Warranty" ? (
              <img
                src={ProductData?.warranty?.imageUrl}
                alt="ads"
                style={{ width: 200, padding: "10px" }}
              />
            ) : (
              <Typography></Typography>
            )}

            <Box
              sx={{
                display: "flex",

                flexDirection: "column",
              }}
            >
              {/* Sales Price */}
              <Typography
                variant="h4"
                sx={{ fontWeight: "400",  color: "white" }}
              >
                LKR{" "}
                {ProductData?.sales_price
                  ? new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(ProductData.sales_price)
                  : "0.00"}
              </Typography>

              {/* Old Price with Red Line */}
              {ProductData?.oldPrice !== 0 || ProductData?.oldPrice !== "" ? (
                <Box
                  sx={{
                    position: "relative",
                 
                    display: "inline-block",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "300",
                      color: "white",
                    }}
                  >
                    {ProductData?.oldPrice
                      ? new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(ProductData.oldPrice)
                      : "0.00"}
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      height: "2px",
                      backgroundColor: "red",
                      width: "45%",
                      top: "55%",
                      left: 0,
                      transform: "translateY(-50%)",
                    }}
                  />
                </Box>
              ) : (
                <Box></Box>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "start",
              borderBottom: "1px solid white",
              padding: "10px 0px",
            }}
          >
            <Formik
              initialValues={{ color: "", qty: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                try {
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
                    justifyContent: "left",
                 
                  }}
                >
                  {/* Left Column - Form Section */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      gap: "10px",
                    }}
                  >
                    <FormLabel sx={{ display: "flex", color: "white" }}>
                      Color
                    </FormLabel>
                    <Select
                      sx={{
                        textAlign: "left", // Align the text to the left
                        ".MuiSelect-select": {
                          textAlign: "left", // For alignment inside the select
                        },
                        border: "1px solid white",
                        color: "white",
                        width: "200px",
                      }}
                      name="color"
                      value={values.color}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      displayEmpty
                      size="small"
                      error={!!touched.color && !!errors.color}
                    >
                      <MenuItem value="" disabled hidden>
                        Select a color
                      </MenuItem>
                      {ProductData?.colors &&
                        ProductData?.colors.map((color) => (
                          <MenuItem key={color} value={color}>
                            {color}
                          </MenuItem>
                        ))}
                    </Select>

                    {touched.color && errors.color && (
                      <FormHelperText error>{errors.color}</FormHelperText>
                    )}
                    <FormLabel sx={{ display: "flex", color: "white" }}>
                      Quantity
                    </FormLabel>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        color: "white",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        overflow: "hidden",
                        width: "120px",
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
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        alignSelf: "left",
                        mt: 2,
                        backgroundColor: "#2596be",
                      }}
                    >
                      Add to cart
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
      <Box sx={{ padding: "10px" }}>
        <Typography variant="h5" sx={{ color: "white" }}>
          Specifications
        </Typography>
        <Box
          sx={{
            border: "1px solid white",
            padding: "30px",

            borderRadius: "10px",
            textAlign: "left",
          }}
        >
          <Typography
            sx={{ lineHeight: "3px", fontWeight: "300" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(ProductData?.Specification),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Products;
