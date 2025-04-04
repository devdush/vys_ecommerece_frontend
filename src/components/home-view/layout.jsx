import React, { useEffect, useState } from "react";
import HomeHeader from "./header";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";

import SidebarComponent from "../common/sidebar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";

import Footer from "./footer";
import { getFeaturedProducts } from "../../services/product/getFeaturedProduct";
import { toast } from "react-toastify";
import { getProducts } from "../../services/product/getProducts";
import { getOnSaleProducts } from "../../services/product/getOnSaleProducts";
import { getTopRatedProducts } from "../../services/product/getTopRatedProducts";
import { getSpecialOfferProducts } from "../../services/product/getSpecialOfferProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [featuredProductData, setFeaturedProductData] = useState([]);
  const [onSaleProductData, setOnSaleProductData] = useState([]);
  const [topRatedProductData, setTopRatedProductData] = useState([]);
  const [specialOfferProductData, setSpecialOfferProductData] = useState([]);
  const [ProductData, setProductData] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsReady(true); // Trigger re-render after the component mounts
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getFeaturedProducts();
        const productRes = await getProducts();
        const onSaleProRes = await getOnSaleProducts();
        const topRatedProRes = await getTopRatedProducts();
        const specialOfferProRes = await getSpecialOfferProducts();

        setProductData(productRes.data.data);
        setFeaturedProductData(response.data.data);
        setOnSaleProductData(onSaleProRes.data.data);
        setTopRatedProductData(topRatedProRes.data.data);
        setSpecialOfferProductData(specialOfferProRes.data.data);
      } catch (error) {
        toast.error("Something went wrong while fetching initial data");
      }
    };
    getData();
  }, []);
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const images = [
    {
      src: "https://imageholdervys.s3.us-east-1.amazonaws.com/1.jpg",
      alt: "Image 1",
      caption: "This is the first image",
    },
    {
      src: "https://imageholdervys.s3.us-east-1.amazonaws.com/2.jpg",
      alt: "Image 2",
      caption: "This is the second image",
    },
    {
      src: "https://imageholdervys.s3.us-east-1.amazonaws.com/3.jpg",
      alt: "Image 3",
      caption: "This is the second image",
    },
  ];
  const brandImages = [
    {
      src: "https://imageholdervys.s3.us-east-1.amazonaws.com/Acer.png",
      alt: "Image 1",
      caption: "This is the first image",
    },

    {
      src: "https://imageholdervys.s3.us-east-1.amazonaws.com/Apple.png",
      alt: "Image 2",
      caption: "This is the second image",
    },
    {
      src: "https://imageholdervys.s3.us-east-1.amazonaws.com/Asus.png",
      alt: "Image 2",
      caption: "This is the second image",
    },
    {
      src: "https://imageholdervys.s3.us-east-1.amazonaws.com/Biostart.png",
      alt: "Image 2",
      caption: "This is the second image",
    },
    {
      src: "https://imageholdervys.s3.us-east-1.amazonaws.com/Dell.png",
      alt: "Image 2",
      caption: "This is the second image",
    },
    {
      src: "https://imageholdervys.s3.us-east-1.amazonaws.com/hcl.png",
      alt: "Image 2",
      caption: "This is the second image",
    },
    {
      src: "https://imageholdervys.s3.us-east-1.amazonaws.com/hp.png",
      alt: "Image 2",
      caption: "This is the second image",
    },
    {
      src: "https://imageholdervys.s3.us-east-1.amazonaws.com/intel.png",
      alt: "Image 2",
      caption: "This is the second image",
    },
    {
      src: "https://imageholdervys.s3.us-east-1.amazonaws.com/lenevo.png",
      alt: "Image 2",
      caption: "This is the second image",
    },
    {
      src: "https://imageholdervys.s3.us-east-1.amazonaws.com/nvidia.png",
      alt: "Image 2",
      caption: "This is the second image",
    },
    {
      src: "https://imageholdervys.s3.us-east-1.amazonaws.com/samsung.png",
      alt: "Image 2",
      caption: "This is the second image",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  const brandSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
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
  const handleButtonClick = (id) => {
    // Navigate to the product details page
    console.log(`Card clicked for product ID: ${id}`);
    navigate(`/shop/products/${id}`); // Example navigation
  };
  return (
    <Box
      name="container"
      sx={{ display: "flex", flex: "1", flexDirection: "column" }}
    >
      <Box name="headerContainer">
        <HomeHeader />
      </Box>
      <Box
        name="sidebarAndSliderContainer"
        sx={{ background: "#030138", color: "white", display: "flex" }}
      >
        <Box name="sidebarContainer" sx={{ padding: "10px" }}>
          <SidebarComponent />
        </Box>
        <Box
          name="sliderContainer"
          sx={{
            margin: "15px",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: theme.shadows[3],
            display: { xs: "none", sm: "block" },
          }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            style={{ width: "100%", height: "400px" }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img.src}
                  loading="lazy"
                  alt={`Slide ${index + 1}`}
                  style={{ width: "100%", height: "100%" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
      <Box
        name="featuredProductContainer"
        sx={{
          background: "#030138",
          color: "white",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "300" }}>
          Featured Products
        </Typography>
        <Box
          sx={{
            padding: "10px",
          }}
        >
          <Grid container spacing={2}>
            {featuredProductData.slice(0, 9).map((product, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={product._id || index}
                sx={{ mb: "20px" }}
              >
                <Box
                  sx={{
                    backgroundColor: "#212121",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",

                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%", // Ensure consistent height
                  }}
                >
                  <img
                    src={
                      product.defaultImage
                        ? product.defaultImage
                        : "https://via.placeholder.com/200" // Fallback image
                    }
                    alt={product.itemName}
                    width={200}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Open Sans, Helvetica, Arial, sans-serif",
                      fontWeight: "300",
                    }}
                  >
                    {product.itemName.length > 50
                      ? `${product.itemName.substring(0, 50)}...`
                      : product.itemName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "300",
                      marginBottom: "10px",
                    }}
                  >
                    LKR {product.sales_price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick(product._id)}
                  >
                    Shop Now
                  </Button>
                </Box>
              </Grid>
            ))}

            {/* Add empty columns to ensure a full row */}
            {Array.from({
              length: (4 - (featuredProductData.length % 4)) % 4,
            }).map((_, idx) => (
              <Grid item xs={12} sm={6} md={3} key={`empty-${idx}`} />
            ))}
          </Grid>
        </Box>
      </Box>

      <Box
        name="Special"
        sx={{
          background: "#030138",
          color: "white",
        }}
      >
        <Box
          sx={{
            width: "100%",
            color: "white",
            borderBottom: 1,
            borderColor: "white divider",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab sx={{ color: "white" }} label="On Sale" {...a11yProps(0)} />
            <Tab sx={{ color: "white" }} label="Top Rated" {...a11yProps(1)} />
            <Tab
              sx={{ color: "white" }}
              label="Special Offers"
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box>
            <Grid container spacing={2}>
              {onSaleProductData.slice(0, 9).map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={product._id || index}>
                  <Box
                    sx={{
                      backgroundColor: "#212121",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: "100%", // Ensure consistent height
                    }}
                  >
                    <img
                      src={
                        product.defaultImage
                          ? product.defaultImage
                          : "https://via.placeholder.com/200" // Fallback image
                      }
                      alt={product.itemName}
                      width={200}
                    />
                    <Typography
                      sx={{
                        fontFamily: "Open Sans, Helvetica, Arial, sans-serif",
                        fontWeight: "300",
                        marginTop: "10px",
                      }}
                    >
                      {product.itemName.length > 50
                        ? `${product.itemName.substring(0, 50)}...`
                        : product.itemName}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "300",
                        marginBottom: "10px",
                      }}
                    >
                      LKR {product.sales_price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleButtonClick(product._id)}
                    >
                      Shop Now
                    </Button>
                  </Box>
                </Grid>
              ))}

              {/* Add empty columns to ensure a full row */}
              {Array.from({
                length: (4 - (onSaleProductData.length % 4)) % 4,
              }).map((_, idx) => (
                <Grid item xs={12} sm={6} md={3} key={`empty-${idx}`} />
              ))}
            </Grid>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Box
            sx={{
              padding: "10px",
            }}
          >
            <Grid container spacing={2}>
              {topRatedProductData.slice(0, 9).map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={product._id || index}>
                  <Box
                    sx={{
                      backgroundColor: "#212121",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: "100%", // Ensure consistent height
                    }}
                  >
                    <img
                      src={
                        product.defaultImage
                          ? product.defaultImage
                          : "https://via.placeholder.com/200" // Fallback image
                      }
                      alt={product.itemName}
                      width={200}
                    />
                    <Typography
                      sx={{
                        fontFamily: "Open Sans, Helvetica, Arial, sans-serif",
                        fontWeight: "300",
                        marginTop: "10px",
                      }}
                    >
                      {product.itemName.length > 50
                        ? `${product.itemName.substring(0, 50)}...`
                        : product.itemName}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "300",
                        marginBottom: "10px",
                      }}
                    >
                      LKR {product.sales_price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleButtonClick(product._id)}
                    >
                      Shop Now
                    </Button>
                  </Box>
                </Grid>
              ))}

              {/* Add empty columns to ensure a full row */}
              {Array.from({
                length: (4 - (topRatedProductData.length % 4)) % 4,
              }).map((_, idx) => (
                <Grid item xs={12} sm={6} md={3} key={`empty-${idx}`} />
              ))}
            </Grid>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Box
            sx={{
              padding: "10px",
            }}
          >
            <Grid container spacing={2}>
              {specialOfferProductData.slice(0, 9).map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={product._id || index}>
                  <Box
                    sx={{
                      backgroundColor: "#212121",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: "100%", // Ensure consistent height
                    }}
                  >
                    <img
                      src={
                        product.defaultImage
                          ? product.defaultImage
                          : "https://via.placeholder.com/200" // Fallback image
                      }
                      alt={product.itemName}
                      width={200}
                    />
                    <Typography
                      sx={{
                        fontFamily: "Open Sans, Helvetica, Arial, sans-serif",
                        fontWeight: "300",
                        marginTop: "10px",
                      }}
                    >
                      {product.itemName.length > 50
                        ? `${product.itemName.substring(0, 50)}...`
                        : product.itemName}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "300",
                        marginBottom: "10px",
                      }}
                    >
                      LKR {product.sales_price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleButtonClick(product._id)}
                    >
                      Shop Now
                    </Button>
                  </Box>
                </Grid>
              ))}

              {/* Add empty columns to ensure a full row */}
              {Array.from({
                length: (4 - (specialOfferProductData.length % 4)) % 4,
              }).map((_, idx) => (
                <Grid item xs={12} sm={6} md={3} key={`empty-${idx}`} />
              ))}
            </Grid>
          </Box>
        </CustomTabPanel>
      </Box>
      <Box
        name="brands"
        sx={{
          background: "#030138",
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "300" }}>
          Brands
        </Typography>
        <Box
          name="sliderContainer"
          sx={{
            overflow: "hidden",
            boxShadow: theme.shadows[3],
            paddingLeft: "15px",
          }}
        >
          <Slider {...brandSettings}>
            {brandImages.map((image, index) => (
              <Box key={index}>
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{
                    width: "250px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default HomeView;
