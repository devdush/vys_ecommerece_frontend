import React from "react";
import { Box, Typography } from "@mui/material";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import { Link } from "react-router-dom";
import logo from "./vys.png";
import { useTheme } from "@mui/material/styles"; // Import useTheme hook

const Footer = () => {
  const theme = useTheme(); // Use the theme hook to get access to the theme object

  const productLinks = [
    "Headset",
    "Gaming Laptops",
    "Wifi Cameras",
    "Turbo HD Cameras",
    "Web Cameras",
    "Personal Laptops",
    "Business Laptops",
    "Headset",
    "Gaming Laptops",
    "Wifi Cameras",
    "Turbo HD Cameras",
    "Web Cameras",
    "Personal Laptops",
    "Business Laptops",
    "Headset",
    "Gaming Laptops",
    "Wifi Cameras",
    "Turbo HD Cameras",
    "Web Cameras",
    "Personal Laptops",
    "Business Laptops",
    "Headset",
    "Gaming Laptops",
    "Wifi Cameras",
    "Turbo HD Cameras",
    "Web Cameras",
    "Personal Laptops",
    "Business Laptops",
  ];

  // Split product links into 4 columns
  const chunkSize = Math.ceil(productLinks.length / 4);
  const productChunks = Array.from({ length: 4 }, (_, i) =>
    productLinks.slice(i * chunkSize, i * chunkSize + chunkSize)
  );

  const renderProductColumn = (links, index) => (
    <Box
      key={index}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minWidth: "120px",
        flex: 1,
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
          {product}
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
            textAlign: "center", // Center the items on mobile
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
                  justifyContent: "center", // Center the items on mobile
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

          {/* Hotline */}
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

          {/* Showroom */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={500}>
              Showroom & Technical Office
            </Typography>
            <Typography variant="body2">
              No. 199/6, Horana road, Kottawa. <br />
              +94 11 2849 684 / +94 77 5326 888
            </Typography>
          </Box>

          {/* Branch */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={500}>
              Branch
            </Typography>
            <Typography variant="body2">
              #3164 Manlwattha, Bollagala, Gonawala, Kelaniya. <br />
              +94 70 415 6355 / +94 77 2207 709
            </Typography>
          </Box>

          {/* Social Media */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
              [theme.breakpoints.down("sm")]: {
                justifyContent: "center", // Center the items on mobile
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
          </Box>
        </Box>

        {/* Product Links */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flex: 2,
            justifyContent: { xs: "flex-start", md: "space-between" },
            gap: 2,
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
          justifyContent: "space-between",
          alignItems: "center",
          pt: 3,
          gap: 2,
        }}
      >
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          &copy; {new Date().getFullYear()} VYS International. All Rights
          Reserved.
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <MusicNoteOutlinedIcon sx={{ fontSize: 24 }} />
          <AlternateEmailOutlinedIcon sx={{ fontSize: 24 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
