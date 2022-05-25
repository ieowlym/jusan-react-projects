import React, { useMemo } from "react";

//mui
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled
} from "@mui/material";
import { Box, Modal, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";

const StyledBox = styled(Box)`
  width: 400px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #acacac;
  box-shadow: 24px;
  padding: 8px;
  border-radius: 8px;
`;
export const BasketModal = ({
  basket,
  onBasketItemCountChange,
  onBasketItemsDelete,
  onBasketItemDelete,
  ...props
}) => {
  const totalPrice = useMemo(() => {
    return basket.reduce((acc, item) => acc + item.price * item.count, 0);
  }, [basket]);
  return (
    <Modal {...props}>
      <StyledBox>
        <Typography
          sx={{ display: "flex", justifyContent: "space-between" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          <span>Your Basket</span>
          <Button color="error" onClick={() => onBasketItemsDelete()}>
            <DeleteForeverTwoToneIcon />
          </Button>
        </Typography>
        {basket.length === 0 && <span>It's empty!</span>}
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {basket.map((item, index) => (
            <>
              {index !== 0 && (
                <Divider
                  key={"divider_" + item.id}
                  variant="inset"
                  component="li"
                />
              )}
              <ListItem key={item.id} alignItems="flex-start">
                <ListItemAvatar sx={{ mr: 1 }}>
                  <img
                    alt=""
                    src={item.image}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain"
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${item.title} x${item.count}`}
                  secondary={
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      ${item.price * item.count}
                      {item.count > 1 && <>(${item.price} per item)</>}
                    </Typography>
                  }
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Button onClick={() => onBasketItemCountChange(item, 1)}>
                    <KeyboardArrowUpIcon />
                  </Button>
                  {item.count}
                  <Button onClick={() => onBasketItemCountChange(item, -1)}>
                    <KeyboardArrowDownIcon />
                  </Button>
                </div>
                <Button
                  color="error"
                  onClick={() => onBasketItemDelete(item)}
                  sx={{
                    margin: "auto",
                    width: "auto"
                  }}
                >
                  <RemoveCircleTwoToneIcon />
                </Button>
              </ListItem>
            </>
          ))}
        </List>
        <Typography
          sx={{ display: "flex", justifyContent: "space-between" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          <span>Total: </span>
          <span
            style={{
              minWidth: "60px",
              textAlign: "center"
            }}
          >
            ${totalPrice}
          </span>
        </Typography>
      </StyledBox>
    </Modal>
  );
};
