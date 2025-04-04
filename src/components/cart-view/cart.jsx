import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Checkbox,
  Button,
  TextField,
  IconButton,
  Divider,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { removeItemFromCart } from "../../services/Cart/deleteCartDetails";

const CartPage = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const cart = useSelector((state) => state.cart);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen size is small

  useEffect(() => {
    console.log("Cart items from Redux:", cart.cart);
    if (cart.cart) {
      setCartItems(cart.cart);
      setSelectedItems(cart.cart.map((item) => item._id));
    }
  }, [cart.cart]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDelete = async (item) => {
    const itemId = item.product._id;
    const id = item._id;
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    setSelectedItems((prev) => prev.filter((id) => id !== id));

    const obj = { userId: user.id, productId: itemId };
    console.log(obj);
    const response = await removeItemFromCart(obj);
  };

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    const order = {
      user: "671dba59c804d2508ad03d78",
      items: cartItems
        .filter((item) => selectedItems.includes(item._id))
        .map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
      paymentMethod: "Card",
      shippingAddress,
    };
    console.log("order", order);
    // axios
    //   .post("/api/checkout", order)
    //   .then((response) => console.log("Order placed:", response.data))
    //   .catch((error) => console.error("Checkout error:", error));
  };
  const isShippingAddressValid = () => {
    return Object.values(shippingAddress).every((field) => field.trim() !== "");
  };

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item._id))
    .reduce((sum, item) => sum + item.totalItemPrice, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 3,
        p: 3,
      }}
    >
      {/* Left Side - Cart Items */}
      <Box sx={{ flex: 2, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
        {cartItems.length !== 0 ? (
          cartItems.map((item) => (
            <Box
              key={item._id}
              sx={{
                display: "flex",
                alignItems: "left",
                mb: 2,
                p: 2,
                bgcolor: "white",
                borderRadius: 2,
              }}
            >
              <Checkbox
                checked={selectedItems.includes(item._id)}
                onChange={() => handleCheckboxChange(item._id)}
              />
              <img
                src={item.product.defaultImage}
                alt={item.itemName}
                style={{ width: 80, height: 80, borderRadius: 5 }}
              />
              <Box sx={{ ml: 2, flexGrow: 1, textAlign: "left" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {item.itemName}
                </Typography>
                <Typography
                  sx={{ color: "gray", textDecoration: "line-through" }}
                >
                  LKR {item.totalItemPrice.toFixed(2)}
                </Typography>
                <Typography sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                  LKR {item.totalItemPrice.toFixed(2)}
                </Typography>
                <Typography>Qty {item.quantity}</Typography>
              </Box>
              <IconButton
                sx={{ height: "60px" }}
                onClick={() => handleDelete(item)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          ))
        ) : (
          <Typography sx={{ color: "red" }}>No items in cart</Typography>
        )}
      </Box>

      {/* Right Side - Order Summary */}
      <Box
        sx={{ flex: 1, p: 3, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Order Summary
        </Typography>

        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "gray",
          }}
        >
          <span>Item(s) total:</span>
          <span style={{ textDecoration: "line-through" }}>
            LKR {totalPrice.toFixed(2)}
          </span>
        </Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "#d32f2f",
          }}
        >
          <span>Item(s) discount:</span>
          <span>-LKR 0.00</span>
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          <span>Total:</span>
          <span>LKR {totalPrice.toFixed(2)}</span>
        </Typography>

        <Box mt={3}>
          <Typography variant="h6">Shipping Address</Typography>
          {Object.keys(shippingAddress).map((field) => (
            <TextField
              key={field}
              name={field}
              label={field}
              value={shippingAddress[field]}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
              required
            />
          ))}
        </Box>

        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{
            mt: 2,
            p: 2,
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "none",
          }}
          onClick={handleCheckout}
          disabled={selectedItems.length === 0 || !isShippingAddressValid()}
        >
          Last chance! Checkout ({selectedItems.length}){" "}
          <ShoppingCartIcon sx={{ ml: 1 }} />
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
