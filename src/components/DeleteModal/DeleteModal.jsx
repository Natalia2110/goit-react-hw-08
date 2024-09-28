import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import css from "./DeleteModal.module.css";
// import { Typography } from "@mui/material";
// import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#acc5fa",
  border: "1px solid #3468d8",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className={css.title}>Are you sure you want to delete contact?</p>
          <div className={css["btn-box"]}>
            <Button variant="contained" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
