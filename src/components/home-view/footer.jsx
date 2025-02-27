import React, { useState } from "react";

import { Box, Typography } from "@mui/material";

import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import { Link } from "react-router-dom";
import logo from "./vys.png";
const Footer = () => {
  return (
    <Box
      name="footer"
      sx={{
        background: "#030138",
        overflow: "hidden",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        name="row"
        sx={{ display: "flex", mt: "20px", borderBottom: "1px solid white" }}
      >
        <Box name="column" sx={{ flex: 1 }}>
          <a href="/">
            <Box
              name="companyLogo"
              sx={{
                display: "flex",
                flex: 1,
                padding: "10px",
                justifyContent: "left",
              }}
            >
              <img alt="Company Logo" width="50%" src={logo} />
            </Box>
          </a>
          <Box sx={{ display: "flex", padding: "10px", alignItems: "center" }}>
            <HeadsetMicOutlinedIcon sx={{ fontSize: "45px" }} />
            <Typography
              variant="h7"
              sx={{
                textAlign: "left",
                fontWeight: "300",

                paddingLeft: "10px",
              }}
            >
              Need help to get <br /> quotations? Call Us
            </Typography>
            <Typography
              variant="h5"
              sx={{
                textAlign: "left",
                fontWeight: "600",
                paddingLeft: "10px",
              }}
            >
              +94 11 2849 684
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: "10px 0px 10px 0px",
              alignItems: "left",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: "left",
                fontWeight: "400",
                paddingLeft: "10px",
              }}
            >
              Showroom & Technical Office
            </Typography>
            <Typography
              variant="h7"
              sx={{
                textAlign: "left",
                fontWeight: "300",

                paddingLeft: "10px",
              }}
            >
              No. 199/6, Horana road, Kottawa. <br />
              +94 11 2849 684 / +94 77 5326 888
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: "10px 0px 10px 0px",
              alignItems: "left",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: "left",
                fontWeight: "400",
                paddingLeft: "10px",
              }}
            >
              Branch
            </Typography>
            <Typography
              variant="h7"
              sx={{
                textAlign: "left",
                fontWeight: "300",

                paddingLeft: "10px",
              }}
            >
              #3164 Manlwattha, Bollagala, Gonawala, Kelniya.
              <br />
              +94 70 415 6355 / +94 77 2207 709
            </Typography>
          </Box>
          <Box
            name="socialMedia"
            sx={{
              display: "flex",
              flex: 1,
              padding: "10px",
              justifyContent: "left",
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
                    fontSize: "35px",
                    textDecoration: "none",
                    color: "white",
                  }}
                />
              </Link>
            </Box>
            <Box
              name="instagram"
              sx={{ display: "flex", paddingRight: "10px" }}
            >
              <Link
                to={"https://www.instagram.com/vys.international/"}
                target="_blank"
              >
                <InstagramIcon
                  sx={{
                    paddingRight: "5px",
                    fontSize: "35px",
                    textDecoration: "none",
                    color: "white",
                  }}
                />
              </Link>
            </Box>
            <Box name="tiktok" sx={{ display: "flex", paddingRight: "10px" }}>
              <Link
                to={"https://www.tiktok.com/@vys.international"}
                target="_blank"
              >
                <MusicNoteOutlinedIcon
                  sx={{
                    paddingRight: "5px",
                    fontSize: "35px",
                    textDecoration: "none",
                    color: "white",
                  }}
                />
              </Link>
            </Box>
            <Box name="tiktok" sx={{ display: "flex", paddingRight: "10px" }}>
              <AlternateEmailOutlinedIcon
                sx={{ paddingRight: "5px", fontSize: "35px" }}
              />
            </Box>
          </Box>
        </Box>

        <Box name="column" sx={{ flex: 2 }}>
          <Box name="row" sx={{ display: "flex" }}>
            <Box
              name="column"
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                alignItems: "start",
              }}
            >
              <Typography variant="h7" sx={{ fontWeight: "600" }}>
                My Account
              </Typography>
              <Box
                sx={{
                  mt: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "left",
                }}
              >
                <Link
                  to={"/"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    padding: "5px 0px 5px 0px",
                  }}
                >
                  Login
                </Link>
                <Link
                  to={"/"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    padding: "5px 0px 5px 0px",
                  }}
                >
                  Register
                </Link>
                <Link
                  to={"/"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    padding: "5px 0px 5px 0px",
                  }}
                >
                  Get Quotation
                </Link>
              </Box>
            </Box>
            <Box
              name="column"
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                alignItems: "start",
              }}
            >
              <Typography variant="h7" sx={{ fontWeight: "600" }}>
                Customer Care
              </Typography>
              <Box
                sx={{
                  mt: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "left",
                }}
              >
                <Link
                  to={"/"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    padding: "5px 0px 5px 0px",
                  }}
                >
                  Customer Service
                </Link>
                <Link
                  to={"/"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    padding: "5px 0px 5px 0px",
                  }}
                >
                  Returns / Exchange
                </Link>
                <Link
                  to={"/"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    padding: "5px 0px 5px 0px",
                  }}
                >
                  FAQs
                </Link>
                <Link
                  to={"/"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    padding: "5px 0px 5px 0px",
                  }}
                >
                  Contact Us
                </Link>
              </Box>
            </Box>
            <Box
              name="column"
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                alignItems: "start",
              }}
            >
              <Typography variant="h7" sx={{ fontWeight: "600" }}>
                Why Us
              </Typography>
              <Box
                sx={{
                  mt: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "left",
                }}
              >
                <Link
                  to={"/"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    padding: "5px 0px 5px 0px",
                  }}
                >
                  Safe Payment
                </Link>
                <Link
                  to={"/"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    padding: "5px 0px 5px 0px",
                  }}
                >
                  Islandwide Delivery
                </Link>
                <Link
                  to={"/"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    padding: "5px 0px 5px 0px",
                  }}
                >
                  Help Center
                </Link>
                <Link
                  to={"/"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    padding: "5px 0px 5px 0px",
                  }}
                >
                  Shop With Confidence
                </Link>
              </Box>
            </Box>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: "400", padding: "15px" }}>
            VYS International Range of Products
          </Typography>
          <Box name="row" sx={{ display: "flex" }}>
            <Box
              sx={{
                mt: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "left",
                width: "200px",
              }}
            >
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Headset
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Gaming Laptops
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Wifi Cameras
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Turbo HD Cameras
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Web Cameras
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Personal Laptops
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Business Laptops
              </Link>
            </Box>
            <Box
              sx={{
                mt: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "left",
                width: "200px",
              }}
            >
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Headset
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Gaming Laptops
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Wifi Cameras
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Turbo HD Cameras
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Web Cameras
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Personal Laptops
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Business Laptops
              </Link>
            </Box>
            <Box
              sx={{
                mt: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "left",
                width: "200px",
              }}
            >
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Headset
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Gaming Laptops
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Wifi Cameras
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Turbo HD Cameras
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Web Cameras
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Personal Laptops
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Business Laptops
              </Link>
            </Box>
            <Box
              sx={{
                mt: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "left",
                width: "200px",
              }}
            >
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Headset
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Gaming Laptops
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Wifi Cameras
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Turbo HD Cameras
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Web Cameras
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Personal Laptops
              </Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "5px 0px 5px 0px",
                }}
              >
                Business Laptops
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "15px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>
          © 2024 VYS International. All Rightes Reserved. | Powered by V Soft
          Technologies
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src="img1.jpg"
            alt=""
            style={{ width: "50px", padding: "0px 10px 0px 10px" }}
          />
          <img
            src="img2.jpg"
            alt=""
            style={{ width: "50px", padding: "0px 10px 0px 10px" }}
          />
          <img
            src="img5.jpg"
            alt=""
            style={{ width: "50px", padding: "0px 10px 0px 10px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
