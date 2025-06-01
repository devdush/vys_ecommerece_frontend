import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import logo from "./vys.png";
import { getCategories } from "../../services/category/getcategory";
import WhatsAppIcon from "@mui/icons-material/WhatsApp"; // Import at top

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // ✅ Detect mobile screen

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res.data?.data || []);
    };
    fetchCategories();
  }, []);

  // ✅ Handle chunking of categories
  const chunkSize = Math.ceil(categories.length / 4);
  const productChunks = isMobile
    ? [categories] // Single column on mobile
    : Array.from({ length: 4 }, (_, i) =>
        categories.slice(i * chunkSize, i * chunkSize + chunkSize)
      );

  const renderProductColumn = (links, index) => (
    <Box
      key={index}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isMobile ? "center" : "flex-start",
        minWidth: isMobile ? "100%" : "120px",
        flex: isMobile ? "unset" : 1,
        mb: { xs: 2, sm: 0 },
      }}
    >
      {links.map((product, idx) => (
        <Link
          key={idx}
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            padding: "5px 0",
          }}
        >
          {product.categoryTitle}
        </Link>
      ))}
    </Box>
  );

  return (
    <Box
      name="footer"
      sx={{
        background: "#030138",
        color: "white",
        px: { xs: 2, sm: 4 },
        py: { xs: 3, sm: 4 },
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 2 },
          borderBottom: "1px solid white",
          textAlign: "left",
          [theme.breakpoints.down("sm")]: {
            textAlign: "center",
          },
          pb: 4,
        }}
      >
        {/* Left Column */}
        <Box sx={{ flex: 1 }}>
          <a href="/">
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                mb: 2,
                [theme.breakpoints.down("sm")]: {
                  justifyContent: "center",
                },
              }}
            >
              <img
                alt="Company Logo"
                src={logo}
                style={{ width: "60%", maxWidth: "250px" }}
              />
            </Box>
          </a>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <HeadsetMicOutlinedIcon sx={{ fontSize: 40 }} />
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2">
                Need help to get quotations? Call Us
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                +94 11 2849 684
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={500}>
              Showroom & Technical Office
            </Typography>
            <Typography variant="body2">
              No. 199/6, Horana road, Kottawa. <br />
              +94 11 2849 684 / +94 77 5326 888
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={500}>
              Branch
            </Typography>
            <Typography variant="body2">
              #3164 Manlwattha, Bollagala, Gonawala, Kelaniya. <br />
              +94 70 415 6355 / +94 77 2207 709
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
              [theme.breakpoints.down("sm")]: {
                justifyContent: "center",
              },
            }}
          >
            <Link
              to="https://www.facebook.com/VYSInternational"
              target="_blank"
            >
              <FacebookOutlinedIcon sx={{ fontSize: 30, color: "white" }} />
            </Link>
            <Link
              to="https://www.instagram.com/vys.international/"
              target="_blank"
            >
              <InstagramIcon sx={{ fontSize: 30, color: "white" }} />
            </Link>
            <a
              href="https://wa.me/+94775326888" // replace with your WhatsApp number
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <WhatsAppIcon sx={{ fontSize: 30, color: "white" }} />
            </a>
          </Box>
        </Box>

        {/* Product Links */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            flexWrap: isMobile ? "nowrap" : "wrap",
            flex: isMobile ? 1 : 2,
            justifyContent: isMobile ? "center" : "space-between",
            gap: isMobile ? 1 : 2,
          }}
        >
          {productChunks.map((chunk, index) =>
            renderProductColumn(chunk, index)
          )}
        </Box>
      </Box>

      {/* Bottom Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          pt: 3,
          gap: 2,
        }}
      >
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          &copy; {new Date().getFullYear()} VYS International. All Rights
          Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
