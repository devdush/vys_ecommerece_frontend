import { Box, Modal } from "@mui/material";
import { useState } from "react";

const GetQuotation = (handleClose, {open}) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>Test</Box>
    </Modal>
  );
};

export default GetQuotation;
