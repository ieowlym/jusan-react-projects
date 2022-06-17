import React, { useMemo, useCallback } from "react";
//mui
import { Box, Modal, Typography } from "@mui/material";
import { OrderForm } from "../general/OrderForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

export const OrderModal = ({ ...props }) => {
  return (
    <Modal {...props}>
      <Box sx={style}>
        <OrderForm />
      </Box>
    </Modal>
  );
};
