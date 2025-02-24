import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

import HomeHeader from "../home-view/header";

import Footer from "../home-view/footer";

const CartLayout = () => {
  return (
    <Box>
      <HomeHeader />
      <Box sx={{ display: "flex", backgroundColor: "#030138" }}>
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

export default CartLayout;
