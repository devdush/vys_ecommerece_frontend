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
import { getMainCategory } from "../../services/main-category/getMainCategory";
import { Formik } from "formik";
import * as Yup from "yup";
import { updateMainCategory } from "../../services/main-category/updateMainCategory";
import { deleteMainCategory } from "../../services/main-category/deleteMainCategory";
import { useTheme } from "@mui/material/styles";

const UpdateMainCategory = () => {
  const initialValues = { title: "" };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required!"),
  });
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input
  const [filteredData, setFilteredData] = useState([]); // State to hold filtered data
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    padding: "50px",
    bgcolor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    backdropFilter: "blur(3px)", // Blur effect
    borderRadius: "15px",
    // boxShadow: "0 8px 32px rgba(167, 167, 167, 0.37)", // Softer shadow for depth
    border: "1px solid rgba(255, 255, 255, 0.18)", // Light border
    textAlign: "center",
    "@media (max-width: 600px)": {
      width: "90%", // Smaller screen adjustment
      maxWidth: "100%",
      p: 3,
    },
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMainCategory();

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
      item.title
        .replace(/\s+/g, "")
        .toLowerCase()
        .includes(searchQuery.replace(/\s+/g, "").toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handleUpdate = async (id) => {
    setSelectedData(id);
    handleOpen();
  };
  const handleDelete = async (id) => {
    try {
      const response = await deleteMainCategory(id._id);
      if (response.data.success) {
        toast.success("Successfully deleted!");
      } else {
        toast.error("Deletion Unsuccessful!");
      }
    } catch (error) {
      toast.error("Something went wrong while deletion!");
    }
    console.log();
  };

  const columns = [
    {
      field: "title",
      headerName: "Main Category Title",
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
              onClick={() => handleUpdate(params.row)}
              variant="contained"
              style={{
                backgroundColor: "#fad015",
                color: "black",
              }}
            >
              Edit
            </Button>
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                try {
                  const obj = {
                    title: values.title,
                  };
                  const response = await updateMainCategory(
                    obj,
                    selectedData._id
                  );
                  console.log("Res", response);
                  if (response.data.success)
                    toast.success("Successfully Updated the Main Category");

                  //   const indexOfItem = data.findIndex(
                  //     (item) => item._id === selectedData._id
                  //   );
                  //   const updatedTitle = {
                  //     ...data[indexOfItem],
                  //     title: values.title,
                  //   };

                  //   console.log("my", data[0]);
                  //   console.log("my2", updatedTitle);
                  //   data[indexOfItem] = updatedTitle;
                  //   console.log("my22", data[indexOfItem]);
                } catch (error) {
                  console.log(error);

                  toast.error("Error submitting form:", error);
                } finally {
                  handleClose(); // Close the modal after submission
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                handleSubmit,
                isValid,
                errors,
                touched,
                handleBlur,
                handleChange,
                resetForm,
              }) => (
                <Box noValidate sx={{ mt: 1 }}>
                  <form onSubmit={handleSubmit}>
                    <InputLabel
                      htmlFor="email"
                      sx={{
                        color: theme.palette.text.primary,
                      }}
                    >
                      Update Main Category Title
                    </InputLabel>
                    <TextField
                      margin="normal"
                      fullWidth
                      variant="filled"
                      id="title"
                      label={`Title "${selectedData.title}"`}
                      name="title"
                      autoComplete="none"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      sx={{
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderRadius: "10px",
                        color: theme.palette.text.primary,
                        "& .MuiInputBase-input": {
                          color: "#fff", // Input text color
                        },
                        "& .MuiFormLabel-root": {
                          color: theme.palette.text.primary,
                        },
                      }}
                      error={!!touched.title && !!errors.title}
                      helperText={touched.title && errors.title}
                    />

                    <Box
                      display="flex"
                      justifyContent="center"
                      marginTop="10px"
                    >
                      <Button
                        variant="contained"
                        type="submit"
                        style={{
                          fontSize: "15px",
                          margin: "10px",

                          color: theme.palette.text.primary,
                        }}
                      >
                        Save
                      </Button>
                    </Box>
                  </form>
                </Box>
              )}
            </Formik>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default UpdateMainCategory;
