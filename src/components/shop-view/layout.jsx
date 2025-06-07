import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ShopHeader from "./header";
import HomeHeader from "../home-view/header";
import SidebarComponent from "../common/sidebar";
import ShopSidebarComponent from "./sidebar";
import Footer from "../home-view/footer";

const ShopLayout = () => {
    const isMobile = useMediaQuery("(max-width:600px)"); // ✅ Works without ThemeProvider
  
  return (
    <Box>
      <HomeHeader />
      <Box sx={{ display: "flex", backgroundColor: "#030138" }}>
        <Box sx={{display:isMobile ? "none" : "block"}}>
          <ShopSidebarComponent />
        </Box>

        <main
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Outlet />
        </main>
      </Box>
      <Footer />
    </Box>
  );
};

export default ShopLayout;
