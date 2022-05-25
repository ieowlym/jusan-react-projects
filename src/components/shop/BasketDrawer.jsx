import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import React, { Fragment, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

//mui
import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled
} from "@mui/material";
import { Box, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";

import {
  changeBasketItemCount,
  deleteBasket,
  removeItemBasket
} from "../../store/slice/shop";

const StyledBox = styled(Box)`
  padding: 8px;
  width: 400px;
`;

export const BasketDrawer = (props) => {
  const dispatch = useDispatch();
  const { basketOpened, basket } = useSelector((state) => state.shop);

  const onBasketItemCountChange = useCallback(
    (product, increment) => {
      dispatch(changeBasketItemCount({ product, increment }));
    },
    [dispatch]
  );

  const onBasketItemsDelete = useCallback(() => {
    dispatch(deleteBasket());
  }, [dispatch]);

  const onBasketItemRemove = useCallback(
    (product) => {
      dispatch(removeItemBasket(product));
    },
    [dispatch]
  );

  const totalPrice = useMemo(() => {
    return basket.reduce((acc, item) => acc + item.price * item.count, 0);
  }, [basket]);

  return (
    <div>
      <Fragment>
        <Drawer {...props} open={basketOpened} anchor={"right"}>
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
                          ${(item.price * item.count).toFixed(2)}
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
                      onClick={() => onBasketItemRemove(item)}
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
                ${totalPrice.toFixed(2)}
              </span>
            </Typography>
          </StyledBox>
        </Drawer>
      </Fragment>
    </div>
  );
};

// import {
//   Button,
//   Divider,
//   Drawer,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   styled
// } from "@mui/material";
// import { Box, Typography } from "@mui/material";
// import React, { Fragment, useMemo } from "react";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
// import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";

// const StyledBox = styled(Box)`
//   padding: 8px;
//   width: 400px;
// `;

// export const BasketDrawer = ({
//   basket,
//   onBasketItemCountChange,
//   onBasketItemsDelete,
//   onBasketItemDelete,
//   ...props
// }) => {
//   const totalPrice = useMemo(() => {
//     return basket.reduce((acc, item) => acc + item.price * item.count, 0);
//   }, [basket]);

//   return (
//     <div>
//       <Fragment>
//         <Drawer {...props} anchor={"right"}>
//           <StyledBox>
//             <Typography
//               sx={{ display: "flex", justifyContent: "space-between" }}
//               id="modal-modal-title"
//               variant="h6"
//               component="h2"
//             >
//               <span>Your Basket</span>
//               <Button color="error" onClick={() => onBasketItemsDelete()}>
//                 <DeleteForeverTwoToneIcon />
//               </Button>
//             </Typography>
//             {basket.length === 0 && <span>It's empty!</span>}
//             <List sx={{ width: "100%", bgcolor: "background.paper" }}>
//               {basket.map((item, index) => (
//                 <>
//                   {index !== 0 && (
//                     <Divider
//                       key={"divider_" + item.id}
//                       variant="inset"
//                       component="li"
//                     />
//                   )}
//                   <ListItem key={item.id} alignItems="flex-start">
//                     <ListItemAvatar sx={{ mr: 1 }}>
//                       <img
//                         alt=""
//                         src={item.image}
//                         style={{
//                           width: "80px",
//                           height: "80px",
//                           objectFit: "contain"
//                         }}
//                       />
//                     </ListItemAvatar>
//                     <ListItemText
//                       primary={`${item.title} x${item.count}`}
//                       secondary={
//                         <Typography
//                           sx={{ display: "inline" }}
//                           component="span"
//                           variant="body2"
//                           color="text.primary"
//                         >
//                           ${(item.price * item.count).toFixed(2)}
//                           {item.count > 1 && <>(${item.price} per item)</>}
//                         </Typography>
//                       }
//                     />
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         alignItems: "center"
//                       }}
//                     >
//                       <Button onClick={() => onBasketItemCountChange(item, 1)}>
//                         <KeyboardArrowUpIcon />
//                       </Button>
//                       {item.count}
//                       <Button onClick={() => onBasketItemCountChange(item, -1)}>
//                         <KeyboardArrowDownIcon />
//                       </Button>
//                     </div>
//                     <Button
//                       color="error"
//                       onClick={() => onBasketItemDelete(item)}
//                       sx={{
//                         margin: "auto",
//                         width: "auto"
//                       }}
//                     >
//                       <RemoveCircleTwoToneIcon />
//                     </Button>
//                   </ListItem>
//                 </>
//               ))}
//             </List>
//             <Typography
//               sx={{ display: "flex", justifyContent: "space-between" }}
//               id="modal-modal-title"
//               variant="h6"
//               component="h2"
//             >
//               <span>Total: </span>
//               <span
//                 style={{
//                   minWidth: "60px",
//                   textAlign: "center"
//                 }}
//               >
//                 ${totalPrice.toFixed(2)}
//               </span>
//             </Typography>
//           </StyledBox>
//         </Drawer>
//       </Fragment>
//     </div>
//   );
// };
