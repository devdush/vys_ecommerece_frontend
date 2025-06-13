import React, { useEffect, useState } from "react";
import { getDataFromERP } from "../../services/erp/getProducts";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Modal,
  InputLabel,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { useTheme } from "@mui/material/styles";
import { deleteCategory } from "../../services/category/deleteCategory";
import { getCategories } from "../../services/category/getcategory";
import { getCategoriesByMainCategory } from "../../services/main-category/getCategoriesByMainCategory";

const UpdateCategory = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input
  const [filteredData, setFilteredData] = useState([]); // State to hold filtered data
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();

        if (response.data.success) {
          setData(response.data.data);

          setFilteredData(response.data.data); // Set initial filtered data
        }
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.categoryTitle
        .replace(/\s+/g, "")
        .toLowerCase()
        .includes(searchQuery.replace(/\s+/g, "").toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handleDelete = async (id) => {
    try {
      console.log(id.mainCategory._id);
      const categoryCountForMainCategory = await getCategoriesByMainCategory(
        id.mainCategory._id
      );
      console.log(categoryCountForMainCategory.data.data.length);
      if (categoryCountForMainCategory.data.data.length <= 1) {
        toast.error(
          "This category cannot be deleted as it has only one sub-category left."
        );
        return;
      }
      const response = await deleteCategory(id._id);
      if (response.data.success) {
        toast.success("Successfully deleted!");
      } else {
        toast.error("Deletion Unsuccessful!");
      }
    } catch (error) {
      toast.error("Something went wrong while deletion!");
    }
  };

  const columns = [
    {
      field: "categoryTitle",
      headerName: "Category Title",
      flex: 3,
      cellClassName: "name-column--cell",
    },

    {
      field: "action",
      headerName: "Actions",
      flex: 2,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <Box>
          <Box
            sx={{
              display: "flex",
              width: "60%",
              justifyContent: "space-around",
            }}
          >
            <Button
              onClick={() => handleDelete(params.row)}
              variant="contained"
              style={{
                backgroundColor: "#ff4040",
                color: "white",
              }}
            >
              <DoNotDisturbIcon sx={{ mr: "5px" }} />
              Delete
            </Button>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        padding: "15px",
        margin: "20px",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: "10px",
      }}
    >
      {/* Search box above the table */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontFamily: "Poppins, sans-serif", // Change to any font family you want
            fontWeight: "600",
            padding: "10px",
          }}
        >
          Main Category List
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          padding: "10px",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          sx={{
            width: "30%",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: "20px" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        display="grid"
        height="78vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.secondary,
          },
        }}
      >
        <DataGrid
          rows={filteredData} // Use filtered data here
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default UpdateCategory;
