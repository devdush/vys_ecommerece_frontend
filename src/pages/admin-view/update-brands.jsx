import React from "react";
import { Box, Typography } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const UpdateBrands = () => {
  const [value, setValue] = React.useState("");

  return (
    <Box>
      <Typography variant="h6">Description</Typography>
      <ReactQuill
        value={value}
        onChange={setValue}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }], // Font color and background color
            ["link", "image", "video"],
            [{ align: [] }],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "color",
          "background",
          "list",
          "bullet",
          "link",
          "image",
          "video",
          "align",
        ]}
        style={{ height: "300px" }}
      />
    </Box>
  );
};

export default UpdateBrands;
