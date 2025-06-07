import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useEffect } from "react";
import { getBrands } from "../../services/brand/getBrands";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
const UpdateBrands = () => {
  const theme = useTheme();
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getBrands();
      
      if (res.status === 200) {
        setBrands(res?.data?.data);
      } else {
        console.error("Failed to fetch brands");
      }
    };
    fetchData();
  }, []);
  const columns = [
    {
      field: "brandTitle",
      headerName: "Brand Title",
      flex: 3,
      headerAlign: "center",
      cellClassName: "name-column--cell",
    },

    {
      field: "action",
      headerName: "Actions",
      flex: 2,
      headerAlign: "center",
      align: "center",
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
              // onClick={() => handleUpdate(params.row)}
              variant="contained"
              style={{
                backgroundColor: "#fad015",
                color: "black",
              }}
            >
              Edit
            </Button>
            <Button
              //    onClick={() => handleDelete(params.row)}
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
    <Box>
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
          rows={brands} // Use filtered data here
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default UpdateBrands;
