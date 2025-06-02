import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
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
import { addToCartService } from "../../services/add-to-cart/addtoCartServices";
import { GetCartData } from "../../store/action/cart";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
const validationSchema = Yup.object({});

const Products = ({ user }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)"); // ✅ Works without ThemeProvider

  const [ProductData, setProductData] = useState([]);
  const [imageArray, setImageArray] = useState([]);
  const [selectedImage, setSelectedImage] = useState(imageArray[0]);
  const [quantity, setQuantity] = useState(1);
  const [defaulImg, setDefaultImg] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const sliderRef = useRef(null);
  const [loading, setLoading] = useState(false); // Loading state for product fetch
  const [addingToCart, setAddingToCart] = useState(false); // Loading state for adding to cart
  const brandSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
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
    if (sliderRef.current && imageArray.length > 0) {
      sliderRef.current.slickGoTo(0); // Optional
    }
  }, [imageArray]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true); // Set loading to true when fetching product data
      const queryParams = new URLSearchParams(location.search);
      const id = queryParams.get("id");
      if (!id) {
        toast.error("Product ID not found in URL");
        setLoading(false); // Set loading to false after error
        return;
      }

      try {
        const response = await getProductsById(id);
        if (response?.data?.data) {
          setProductData(response.data.data);
          const imgArray = [
            response.data.data.defaultImage,
            ...(response.data.data.otherImages || []),
          ];
          setDefaultImg(response.data.data.defaultImage);
          console.log(defaulImg);
          setImageArray(imgArray);
        } else {
          toast.error("Product not found or returned null");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching initial data");
      } finally {
        setLoading(false); // Set loading to false after data is fetched or error occurs
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (user?.id) {
      // If the user is logged in, fetch cart data
      dispatch(GetCartData(user.id));
    } else {
      // If the user is not logged in, display cart value as 0.00
      dispatch(GetCartData(null)); // Optionally pass null or an empty cart object
    }
  }, [dispatch, user?.id, ProductData]);

  const handleIncrease = () => {
    console.log(user);
    if (quantity < ProductData.onHand) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.warning(`Only ${ProductData.onHand} items are available.`);
    }
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
  const handleAddToCart = async () => {
    if (!user?.id) {
      toast.error("User not logged in!");
      navigate("/auth/login");
      return;
    }

    setAddingToCart(true); // Set loading to true when adding to cart

    const obj = {
      productId: ProductData._id,
      quantity,
      userId: user.id,
    };

    try {
      const response = await addToCartService(obj);
      if (response?.status === 200) {
        toast.success("Product added to the cart");
        dispatch(GetCartData(user.id)); // Refresh cart data
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (error) {
      toast.error("Something went wrong while adding to cart");
    } finally {
      setAddingToCart(false); // Set loading to false after adding to cart
    }
  };

  return (
    <Box>
      {loading ? (
        // Show loader when product data is being fetched
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: { xs: "30px", md: "50px" },
          }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              padding: { xs: "10px", md: "10px" },
              gap: { xs: "20px", md: "0" },
            }}
          >
            {/* Left Section */}
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: "250px", md: "400px" },
                  display: isMobile ? "none" : "flex",
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
                {imageArray?.length > 0 ? (
                  <Box
                    name="sliderContainer"
                    sx={{ maxWidth: { xs: "300px", md: "400px" } }}
                  >
                    <Slider {...brandSettings} ref={sliderRef}>
                      {imageArray.map((image, index) => (
                        <Box
                          key={index}
                          onClick={() => setSelectedImage(image)}
                        >
                          <Box
                            component="img"
                            key={index}
                            src={image}
                            alt={image.alt}
                            onClick={() => setSelectedImage(image)}
                            sx={{
                              width: "100%",
                              height: "auto",

                              objectFit: "contain",
                              cursor: "pointer",

                              outline: "none", // ✅ prevent blue or white border
                              "&:focus": {
                                outline: "none", // ✅ remove focus border
                                border: "none",
                              },
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
            {/* Right Section */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  borderBottom: "1px solid white",
                  padding: "10px 0",
                }}
              >
                <Typography
                  variant="h7"
                  sx={{ fontWeight: "300", padding: "5px" }}
                >
                  {ProductData?.category?.categoryTitle}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "500", padding: "5px", textAlign: "left" }}
                >
                  {ProductData?.itemName}
                </Typography>
                <Typography
                  variant="h7"
                  sx={{ fontWeight: "400", padding: "5px" }}
                >
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
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  borderBottom: "1px solid white",
                  textAlign: "left",
                  padding: "10px 0",
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
                {ProductData?.warranty?.duration !== "No Warranty" ? (
                  <img
                    src={ProductData?.warranty?.imageUrl}
                    alt="Warranty"
                    style={{ width: 200, padding: "10px" }}
                  />
                ) : (
                  <Typography></Typography>
                )}
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {/* Sales Price */}
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "400", color: "white" }}
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
                  {ProductData?.oldPrice !== 0 ||
                  ProductData?.oldPrice !== "" ? (
                    <Box sx={{ position: "relative", display: "inline-block" }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "300", color: "white" }}
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
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  borderBottom: "1px solid white",
                  padding: "10px 0",
                }}
              >
                <Formik
                  initialValues={{ color: "", qty: "" }}
                  validationSchema={validationSchema}
                  // onSubmit={async (values, { setSubmitting }) => {
                  //   setSubmitting(true);
                  //   console.log(quantity);
                  //   try {
                  //     if (user && user.id) {
                  //       const userID = user.id;
                  //       const obj = {
                  //         productId: ProductData._id,
                  //         quantity: quantity,
                  //         userId: userID,
                  //       };
                  //       const response = await addToCartService(obj);
                  //       if (response?.status === 200) {
                  //         // Reduce OnHand by quantity
                  //         setProductData((prev) => ({
                  //           ...prev,
                  //           onHand: prev.onHand - quantity,
                  //         }));
                  //         toast.success("Product added to the cart");
                  //       } else {
                  //         toast.error("Failed to add product to cart");
                  //       }
                  //     } else {
                  //       console.error("User ID is missing");
                  //       window.location.href = "/auth/login";
                  //     }
                  //   } catch (error) {
                  //     console.log(error);
                  //     toast.error("Something Went Wrong While Product to Cart");
                  //   }
                  // }}
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
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      {/* Left Column - Form Section */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "10px",
                        }}
                      >
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
                            width: { xs: "100px", md: "120px" },
                            padding: "5px 0",
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
                            InputProps={{ disableUnderline: true }}
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
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddToCart}
                            disabled={addingToCart}
                          >
                            {addingToCart ? (
                              <CircularProgress
                                size={24}
                                sx={{ color: "white" }}
                              />
                            ) : (
                              "Add to Cart"
                            )}
                          </Button>
                        </Box>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
          <Box sx={{ padding: { xs: "10px", md: "10px" } }}>
            <Typography variant="h5" sx={{ color: "white" }}>
              Specifications
            </Typography>
            <Box
              sx={{
                border: "1px solid white",
                padding: { xs: "20px", md: "30px" },
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
        </>
      )}
    </Box>
  );
};

export default Products;
