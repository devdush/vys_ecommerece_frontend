import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ShopHeader from "./header";
import HomeHeader from "../home-view/header";
import SidebarComponent from "../common/sidebar";
import ShopSidebarComponent from "./sidebar";
import Footer from "../home-view/footer";

const ShopLayout = () => {
  return (
    <Box>
      <HomeHeader />
      <Box sx={{ display: "flex", backgroundColor: "#030138" }}>
        <ShopSidebarComponent />
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
