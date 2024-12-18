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
} from "@mui/material";
import Sidebar from "../common/sidebar";
import SidebarComponent from "../common/sidebar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import SearchIcon from "@mui/icons-material/Search";
import TelegramIcon from "@mui/icons-material/Telegram";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import { Link } from "react-router-dom";
import Footer from "./footer";
import { getFeaturedProducts } from "../../services/product/getFeaturedProduct";
import { toast } from "react-toastify";
import { getProducts } from "../../services/product/getProducts";
import { getOnSaleProducts } from "../../services/product/getOnSaleProducts";
import { getTopRatedProducts } from "../../services/product/getTopRatedProducts";
import { getSpecialOfferProducts } from "../../services/product/getSpecialOfferProducts";

const HomeView = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [featuredProductData, setFeaturedProductData] = useState([]);
  const [onSaleProductData, setOnSaleProductData] = useState([]);
  const [topRatedProductData, setTopRatedProductData] = useState([]);
  const [specialOfferProductData, setSpecialOfferProductData] = useState([]);
  const [ProductData, setProductData] = useState([]);

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
      src: "https://wdsl.lk/sample/vysv2/media/image/1710145714.jpg",
      alt: "Image 1",
      caption: "This is the first image",
    },
    {
      src: "https://wdsl.lk/sample/vysv2/media/image/1670603776.jpg",
      alt: "Image 2",
      caption: "This is the second image",
    },
    {
      src: "https://imageholdervys.s3.us-east-1.amazonaws.com/DALLE2024-12-1016.49.42-CreateanimageofapowerfulfiercedragonrepresentingtheMSIbrandcombiningadvancedtechnologyelementswithadynamicfuturisticdesign.The-ezgif.com-webp-to-jpg-converter.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIARYEUCDERM754DSSU%2F20241211%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241211T032641Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCs92rf6%2Fr8Wr2nk90AjgkuQDZeSWiDX2psZfdLpuuK1QIhAPhOmqTT4LHYpB7zx82WK%2BPQKyDFqxwISnkprTpiRhSmKogDCJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTIwNTY5NjAwMjkwIgxBdAbF7E76zM6zrzAq3AJxi7PFYS7bXbcNdeEnbYDCbV2qyagGliqyk2G%2BB3jdI7Ho4f%2FlOb4mQmEUptWgK5ci65%2Bpt2qIwTDU%2FEAOW53N9Vrq1Ine6Az65rp0Lp4XipZ4DnYPV%2F11%2B%2FQRKz%2FGQyoKkCgj2sB5nCZ%2FR1z1jDWEX%2FvT4xUHP4x%2BXOqwIWMt9N2fUpooV%2FU3Oy38laJnRxyTugvSW9RdS9LSkrEIFVz0c6gN5kAagFYb%2FG0Xz0wt0lifq7mrDflP3NirG%2BCM8I0lOO4vSq5TU%2Bvugm8Pi6tYvXUbsN%2BpS1U7%2BWqBi2kvlE3Y0AYIG0nGakAzYicYuOOy5%2FBS10FRJ%2B61fO%2Fk1xOA6x91yg4dkMXnquWPGHq%2FGYklUTV8S3zoYG8jIqcKq9WwNCS0JiYdyNvy6eZZD3hD34gvZ7pWobvr1%2FBXA3XD1B%2F6OOusTJ16GCaeV4sXrqTg%2Bibv9tPAlKYeaBcw0ozkugY6sgJmQnNbcBb4dv7dxq1EVseSE52U7%2F8EwQEweDLkC0kuXBxOjyQMjqGx9zsdzH1cNmcB01kUwB00UmYx0swUn%2F6Q1EgFXcoGRG0AYdqaYKe7o%2F9K2c2zcFyXO93TJe41luPKsxA%2BexJzibhd81SoqTTjtzm1ize4v0z4q%2F1rwS09%2BApWc9DWrj2oaYvWIgsS7JrFy2Ibay5%2BRRu4qrrZgxMaKE7oqlPe661LjHVvJi7zlqrRuAsBvc%2BfLUtSAYxWbZNg1%2FUb2VmsokAuJcrt7HktqVdZ7ugntxzNu%2By%2Bu5HA9EnuyGei75BbYN5fcEk470NAQOl%2BmPklLI3JRZPuxt61jZu8TEEEPvtD5X6ZkzIU9Do53MwXGEegZDjr3uD80demZMpBXELbGHYjyncdqrR8kOg%3D&X-Amz-Signature=11640c6a3994561f8dc5a22085c61f41e97ede87a4db014cbe98a71abebe1f03&X-Amz-SignedHeaders=host&response-content-disposition=inline",
      alt: "Image 2",
      caption: "This is the second image",
    },
  ];
  const brandImages = [
    {
      src: "https://wdsl.lk/sample/vysv2/media/image/1666802240.png",
      alt: "Image 1",
      caption: "This is the first image",
    },

    {
      src: "https://wdsl.lk/sample/vysv2/media/image/1666802278.png",
      alt: "Image 2",
      caption: "This is the second image",
    },
    {
      src: "https://wdsl.lk/sample/vysv2/media/image/1666802253.png",
      alt: "Image 2",
      caption: "This is the second image",
    },
    {
      src: "https://wdsl.lk/sample/vysv2/media/image/1666802292.png",
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
          }}
        >
          <Slider {...settings}>
            {images.map((image, index) => (
              <Box key={index}>
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "fill",
                  }}
                />
              </Box>
            ))}
          </Slider>
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
                  <Button variant="contained" color="primary">
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
          <Box
           
          >
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
                    <Button variant="contained" color="primary">
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
                    <Button variant="contained" color="primary">
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
                    <Button variant="contained" color="primary">
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
      <Box
        name="newsletter"
        sx={{
          background: "#030138",
          color: "white",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#004282",
            display: "flex",
            marginTop: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: 2,
              justifyContent: "center",
              alignItems: "center",

              fontSize: "18px",
            }}
          >
            <ScheduleSendOutlinedIcon
              sx={{ fontSize: "35px", padding: "10px" }}
            />
            <Typography variant="h6" sx={{ fontWeight: "300" }}>
              Sign up to Newsletter and receive our latest updates and offers
            </Typography>
          </Box>
          <Box
            name="search"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              padding: "10px",
            }}
          >
            <TextField
              label="Email Address"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <HowToRegOutlinedIcon
                        sx={{ fontSize: "40px", color: "white" }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Default border color
                    borderTopRightRadius: "25px",
                    borderBottomRightRadius: "25px",
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
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomeView;
