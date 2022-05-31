import React from "react";
import { useDispatch } from "react-redux";

//mui
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { IconButton } from "@mui/material";

//components
import { Header } from "../components/general/Header";
import { ShopModule } from "../components/shop/ShopModule";

//redux
import { setBasketOpened } from "../store/slice/shop";

//router
import { AuthorisedPage } from "./AuthorisedPage";

export function ShopPage() {
  const dispatch = useDispatch();

  return (
    <AuthorisedPage>
      <Header
        title="E-Stroi.kz"
        sx={{ mb: 2 }}
        rightContent={
          <IconButton
            color="inherit"
            size="large"
            onClick={() => dispatch(setBasketOpened(true))}
          >
            <ShoppingBasketIcon />
          </IconButton>
        }
      />
      <ShopModule />
    </AuthorisedPage>
  );
}
