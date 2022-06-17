import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//mui
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Button, IconButton } from "@mui/material";

//components
import { Header } from "../components/general/Header";
import { ShopModule } from "../components/shop/ShopModule";

//redux
import { setBasketOpened } from "../store/slice/shop";

//router
import { AuthorisedPage } from "./AuthorisedPage";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import { CatalogModal } from "../components/shop/CatalogModalTest";
import { fetchCatalog } from "../fetchers/fetchCatalog";

export function ShopPage() {
  const dispatch = useDispatch();
  const [catalog, setCatalog] = useState([]);
  const [catalogOpened, setCatalogOpened] = useState(false);

  useEffect(() => {
    fetchCatalog().then((response) => {
      setCatalog(response);
    });
  }, []);

  return (
    <AuthorisedPage>
      <Header
        title="E-Stroi.kz"
        sx={{ mb: 2 }}
        leftContent={
          <>
            <Button
              variant="contained"
              sx={{ ml: 2 }}
              onClick={() => setCatalogOpened(true)}
            >
              Catalog
              <KeyboardArrowDownTwoToneIcon />
            </Button>
            <CatalogModal
              open={catalogOpened}
              onClose={() => setCatalogOpened(false)}
              catalog={catalog}
            />
          </>
        }
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
