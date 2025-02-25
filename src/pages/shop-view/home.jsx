import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getProductsByCategory } from "../../services/product/getProductByCategory";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate, useParams } from "react-router-dom";
import addToCart from "../../services/add-to-cart/addToCart";
import { useDispatch } from "react-redux";
import { GetCartData } from "../../store/action/cart";
import { useSelector } from "react-redux";

const ShopHome = () => {
  const navigate = useNavigate();
  const [ProductData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Access the subcategory ID from the URL
  const user = sessionStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const userID = parsedUser ? parsedUser.id : null;
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await getProductsByCategory(id);
        setProductData(response.data.data || []); // Fallback to an empty array if data is undefined
      } catch (error) {
        console.error("Error while fetching products:", error);
        setProductData([]); // Set an empty array on error
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);
  useEffect(() => {
    if (userID) {
      dispatch(GetCartData(userID)); // Fetch cart data only if user is logged in
    }
  }, [dispatch, userID]);
  const handleCardClick = (id) => {
    // Navigate to the product details page
    console.log(`Card clicked for product ID: ${id}`);
    navigate(`/shop/products/${id}`); // Example navigation
  };

  if (loading) {
    return (
      <Box sx={{ padding: "20px", textAlign: "center", color: "white" }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (!ProductData.length) {
    return (
      <Box sx={{ padding: "20px", textAlign: "center", color: "white" }}>
        <Typography variant="h6">No products available</Typography>
      </Box>
    );
  }

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
                    product.onHand && product.onHand > 0 ? "#09fd09" : "red",
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
                <IconButton
                  sx={{ color: "white", backgroundColor: "#000000" }}
                  onClick={async (event) => {
                    event.stopPropagation(); // Prevent navigation
                    await addToCart(product._id, 1, product.onHand); // Add 1 quantity to the cart
                    dispatch(GetCartData(userID)); // Fetch updated cart data
                  }}
                >
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
      </Box>
    </Box>
  );
};

export default ShopHome;
