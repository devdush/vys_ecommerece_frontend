import { useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";

import { useEffect } from "react";

import { getMainCategory } from "../../services/main-category/getMainCategory";
import { getCategoriesByMainCategory } from "../../services/main-category/getCategoriesByMainCategory";
const Item = ({ title, to, icon, selected, setSelected }) => {
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

const SidebarComponent = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const [loading, setLoading] = useState (true)
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        // Fetch main categories
        const mainCategoriesResponse = await getMainCategory();
        
        const mainCategories = mainCategoriesResponse.data.data;
        console.log(mainCategories);

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
        setLoading(false)
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
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }
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

        "& .css-dip3t8": {
          backgroundColor: "#0000001a",
          borderRight: "0px solid white",
        },
        "& .css-1wvake5": {
          borderRightWidth: "0px",
        },
        "& .css-1oldgkv >.ps-menu-button": {
          margin: "5px 10px 5px 10px",
        },
        "& .css-18unl23": {
          backgroundColor: "#0000001a",
          marginLeft: "10px",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed} style={{ width: "350px" }}>
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
    </Box>
  );
};

export default SidebarComponent;
