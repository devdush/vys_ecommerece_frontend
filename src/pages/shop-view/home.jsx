import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { logoutUser } from "../../services/auth/logout";
import { getProductsByCategory } from "../../services/product/getProductByCategory";
import { toast } from "react-toastify";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate, useParams } from "react-router-dom";
const ShopHome = () => {
  const navigate = useNavigate();
  const [ProductData, setProductData] = useState([]);
  const { id } = useParams(); // Access the subcategory ID from the URL
  useEffect(() => {
    const getData = async () => {
      // const pathname = window.location.pathname;
      // const id = pathname.split("/").pop();

      try {
        const response = await getProductsByCategory(id);
        setProductData(response.data.data);
      } catch (error) {
        toast.error("Something went wrong while fetching initial data");
      }
    };
    getData();
  }, [id]);

  const handleCardClick = (id) => {
    // Navigate to the product details page
    console.log(`Card clicked for product ID: ${id}`);
    navigate(`/shop/products/${id}`); // Example navigation
  };

  return (
    <Box>
      <Box
        name="row"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // Create 4 equal columns
          gap: "20px",
          padding: "10px",
        }}
      >
        {ProductData.map((product) => (
          <Box
            key={product._id}
            name="cardContainer"
            sx={{
              display: "flex",
              flexDirection: "column",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.842)", // Add box shadow
              transition: "box-shadow 0.3s ease-in-out", // Smooth transition for shadow
              overflow: "hidden",
              "&:hover": {
                cursor: "pointer",
                scale: 1.02,
              },
            }}
            onClick={() => handleCardClick(product._id)}
          >
            <Box sx={{ flex: 1, paddingTop: "10px" }}>
              <img
                src={
                  product.defaultImage
                    ? product.defaultImage
                    : "https://via.placeholder.com/200" // Fallback image
                }
                alt={product.itemName}
                width={200}
                height={200}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between", // Space out elements evenly
                textAlign: "left",
                padding: "10px",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontFamily: "Open Sans, Helvetica, Arial, sans-serif",
                  fontWeight: "300",
                }}
              >
                {product.itemName.length > 50
                  ? `${product.itemName.substring(0, 50)}...`
                  : product.itemName}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",

                  color:
                    product.onHand && product.onHand > 0 ? "#09fd09" : " red",
                }}
              >
                {product.onHand && product.onHand > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "300",
                  color: "white",
                }}
              >
                LKR{" "}
                {product?.sales_price
                  ? new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(product.sales_price)
                  : "0.00"}
              </Typography>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <IconButton sx={{ color: "white", backgroundColor: "#000000" }}>
                  <AddShoppingCartIcon />
                </IconButton>
                <IconButton sx={{ color: "white", backgroundColor: "#000000" }}>
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton sx={{ color: "white", backgroundColor: "#000000" }}>
                  <StarBorderIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
        {/* Add empty boxes for the remaining slots in the last row */}
        {ProductData.length % 4 !== 0 && (
          <Box
            sx={{
              gridColumn: `span ${4 - (ProductData.length % 4)}`, // Span empty columns
              backgroundColor: "transparent", // No background
              padding: "10px",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ShopHome;
