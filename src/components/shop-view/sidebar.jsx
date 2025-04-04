import { useState } from "react";
import {
  Menu,
  MenuItem,
  ProSidebar,
  Sidebar,
  SubMenu,
} from "react-pro-sidebar";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import InsightsIcon from "@mui/icons-material/Insights";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import TodayIcon from "@mui/icons-material/Today";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useEffect } from "react";
import { CheckBox, HomeOutlined } from "@mui/icons-material";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { getMainCategory } from "../../services/main-category/getMainCategory";
import { getCategoriesByMainCategory } from "../../services/main-category/getCategoriesByMainCategory";
import { ErrorMessage, Formik, Form } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByFilter } from "../../store/action/getProductsByFilter";
import MenuIcon from "@mui/icons-material/Menu";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const ShopSidebarComponent = ({ userType, to }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [menuItems, setMenuItems] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const { id } = useParams();
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brand.brands);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        // Fetch main categories
        const mainCategoriesResponse = await getMainCategory();

        const mainCategories = mainCategoriesResponse.data.data;

        const updatedMenuItems = await Promise.all(
          mainCategories.map(async (mainCategory) => {
            // Fetch subcategories for each main category
            const subCategoriesResponse = await getCategoriesByMainCategory(
              mainCategory._id
            );

            const subCategories = subCategoriesResponse.data.data;

            return {
              title: mainCategory.title,
              to: `/main/${mainCategory._id}`, // Optional link for main category
              //   icon: <MenuOutlinedIcon />, // Customize icon if needed
              subItems: subCategories.map((subCategory) => ({
                title: subCategory.categoryTitle,
                to: `/shop/home/${subCategory._id}`, // Customize route
                // icon: <MenuOutlinedIcon />, // Customize icon if needed
              })),
            };
          })
        );

        setMenuItems(updatedMenuItems);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 1024); // Adjust the breakpoint as needed
      console.log(isCollapsed);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const onButtonClick = async () => {
    try {
      const obj = {
        id: id,
        brand: "",
        minPrice: "",
        maxPrice: "",
      };
      await dispatch(getProductsByFilter(obj));
    } catch (error) {
      console.error("Error while fetching products:", error);
    }
  };
  return (
    <Box
      sx={{
        "& .pro-sidebar": {
          backgroundColor: "#ad1717 !important", // Red background color for the entire sidebar
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "#f11212", // Optional: change the icon background color
        },
        "& .pro-inner-item": {},
        "& .pro-inner-item:hover": {
          color: "#000000 !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        // "& .css-dip3t8 ": {
        //   backgroundColor: "red !important",
        //   textAlign: "left",
        // },
        // "& .css-16jesut >.ps-menu-button": {
        //   backgroundColor: "blue",
        //   color: "black !important",
        // },
        "& .css-dip3t8": {
          backgroundColor: "#0000001a",
          borderRight: "0px solid white",
        },
        "& .css-1wvake5": {
          borderRightWidth: "0px",
        },
        "& .css-1oldgkv >.ps-menu-button": {
          // backgroundColor:"red"
          margin: "5px 10px 5px 10px",
        },
        "& .css-18unl23": {
          backgroundColor: "#0000001a",
          marginLeft: "10px",
        },
      }}
    >
      {/* Hamburger icon for mobile */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "flex-start",
          padding: 1,
        }}
      >
        <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <MenuIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Box>

      {/* Overlay background for mobile sidebar */}
      {mobileMenuOpen && isMobile && (
        <Box
          onClick={() => setMobileMenuOpen(false)}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 998,
          }}
        />
      )}

      {/* Sidebar */}
      {(isMobile ? mobileMenuOpen : true) && (
        <Sidebar
          collapsed={isMobile ? false : isCollapsed}
          style={{
            width: isMobile ? "250px" : "350px",
            position: isMobile ? "fixed" : "relative",
            zIndex: 999,
          }}
        >
          <Menu
            iconShape="square"
            menuItemStyles={{
              button: {
                backgroundColor: "#2f3e48",
                textAlign: "left",
                margin: "10px",
                "&:hover": {
                  backgroundColor: "#2f3e48 !important",
                  color: "white !important",
                  borderRadius: "8px !important",
                  fontWeight: "bold !important",
                },
              },
              label: {
                color: "#d4d5d5",
                "&:hover": {
                  backgroundColor: "#2f3e48 !important",
                  color: "white !important",
                  borderRadius: "8px !important",
                  fontWeight: "bold !important",
                },
              },
            }}
          >
            <Box paddingLeft={isCollapsed ? undefined : "0%"}>
              {menuItems.map((item, index) =>
                item.subItems ? (
                  <SubMenu key={index} label={item.title} icon={item.icon}>
                    {item.subItems.map((subItem, subIndex) => (
                      <Item
                        key={subIndex}
                        title={subItem.title}
                        to={subItem.to}
                        icon={subItem.icon}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    ))}
                  </SubMenu>
                ) : (
                  <Item
                    key={index}
                    title={item.title}
                    to={item.to}
                    icon={item.icon}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )
              )}
            </Box>
          </Menu>
        </Sidebar>
      )}
      <Box
        sx={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          display: { xs: "none", sm: "block" },
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid white",
            padding: "0px 0px 10px 0px",
            display: "flex",
            justifyContent: "left",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "400" }}>
            Filters
          </Typography>
        </Box>
        <Box sx={{ padding: "20px 0px 10px 0px", textAlign: "left" }}>
          <Typography sx={{ fontWeight: "600" }}>Price</Typography>
        </Box>
        <Box>
          <Formik
            initialValues={{ minPrice: "", maxPrice: "", brand: "" }}
            onSubmit={async (values) => {
              console.log("Form Values:", values, id);
              try {
                const obj = {
                  id: id,
                  brand: values.brand,
                  minPrice: values.minPrice,
                  maxPrice: values.maxPrice,
                };
                await dispatch(getProductsByFilter(obj));
              } catch (error) {
                console.error("Error while fetching products:", error);
              }
            }}
          >
            {({
              isSubmitting,
              handleChange,
              handleBlur,
              values,
              setFieldValue,
            }) => (
              <Box sx={{ width: "100%" }}>
                <Form>
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      label="Min Price"
                      name="minPrice"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.minPrice}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography sx={{ color: "#a5a6a8" }}>
                              LKR
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        mb: 3,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white", // Default border color
                          },
                          "&:hover fieldset": {
                            borderColor: "lightgray", // Hover border color
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white", // Focused border color
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "white", // Default text color
                        },
                        "& .MuiInputLabel-root": {
                          color: "white", // Default label color
                        },
                        "& .Mui-focused .MuiInputLabel-root": {
                          color: "blue", // Focused label color
                        },
                      }}
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="minPrice"
                      component="div"
                      style={{ color: "red" }}
                    />

                    <TextField
                      label="Max"
                      name="maxPrice"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.maxPrice}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography sx={{ color: "#a5a6a8" }}>
                              LKR
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        mb: 3,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white", // Default border color
                          },
                          "&:hover fieldset": {
                            borderColor: "lightgray", // Hover border color
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white", // Focused border color
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "white", // Default text color
                        },
                        "& .MuiInputLabel-root": {
                          color: "white", // Default label color
                        },
                        "& .Mui-focused .MuiInputLabel-root": {
                          color: "blue", // Focused label color
                        },
                      }}
                      variant="outlined"
                    />

                    <ErrorMessage
                      name="maxPrice"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </Box>
                  <Box sx={{ padding: "0px 0px 10px 0px", textAlign: "left" }}>
                    <Typography sx={{ fontWeight: "600" }}>Brand</Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <FormGroup>
                      {brands.map((brand) => (
                        <FormControlLabel
                          key={brand}
                          control={
                            <Checkbox
                              name="brand"
                              value={brand}
                              sx={{ color: "white" }}
                              checked={values.brand.includes(brand)}
                              onChange={(e) => {
                                const { checked, value } = e.target;
                                let newBrands = values.brand
                                  ? values.brand.split(",").filter((b) => b)
                                  : [];
                                if (checked) {
                                  newBrands.push(value);
                                } else {
                                  newBrands = newBrands.filter(
                                    (b) => b !== value
                                  );
                                }
                                setFieldValue("brand", newBrands.join(","));
                              }}
                            />
                          }
                          label={brand}
                        />
                      ))}
                    </FormGroup>
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, py: 1.5 }}
                  >
                    Apply Filter
                  </Button>
                  <Button
                    onClick={onButtonClick}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, py: 1.5, bgcolor: "#e29402" }}
                  >
                    Clear Filter
                  </Button>
                </Form>
              </Box>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default ShopSidebarComponent;
