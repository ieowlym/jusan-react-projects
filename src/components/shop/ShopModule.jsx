import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//mui
import {
  // IconButton,
  // styled,
  Button,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";
// import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

//components
import { ProductItem } from "./ProductItem";
import { BasketDrawer } from "./BasketDrawer";

//redux
import { loadProducts } from "../../store/actions/loadProducts";
import { addToBasket, setBasketOpened } from "../../store/slice/shop";

// const BasketButton = styled(IconButton)`
//   position: fixed;
//   right: 10px;
//   top: 10px;
//   border: 1px solid currentColor;
// `;

export const ShopModule = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.shop);

  const load = useCallback(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAddToBasket = useCallback(
    (product) => {
      dispatch(addToBasket(product));
    },
    [dispatch]
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <div style={{ border: "1px solid red", color: "red" }}>
        {error}
        <Button onClick={load}>Reload</Button>
      </div>
    );
  }

  return (
    <>
      <BasketDrawer onClose={() => dispatch(setBasketOpened(false))} />
      <Container>
        <Grid container gap={2} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product.id}>
              <ProductItem
                product={product}
                onAddToBasket={() => handleAddToBasket(product)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
