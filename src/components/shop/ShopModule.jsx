import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//mui
import {
  // IconButton,
  // styled,
  Button,
  CircularProgress,
  Container,
  Grid
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
      {/* <BasketButton
        color="primary"
        size="large"
        onClick={() => dispatch(setBasketOpened(true))}
      >
        <ShoppingBasketIcon />
      </BasketButton> */}
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

// import { IconButton, styled } from "@mui/material";
// import { Container, Grid } from "@mui/material";
// import { useCallback, useEffect, useState, useMemo } from "react";
// import { fetchProducts } from "../fetchers/fetchProducts";
// import { ProductItem } from "./ProductItem";
// import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
// import { BasketModal } from "./BasketModal";
// import { BasketDrawer } from "./BasketDrawer";

// const BasketButton = styled(IconButton)`
//   position: fixed;
//   right: 10px;
//   top: 10px;
//   border: 1px solid currentColor;
// `;
// export const ShopModule = () => {
//   const [products, setProducts] = useState([]);
//   const [openBasket, setOpenBasket] = useState(false);
//   const [drawerState, setDrawerState] = useState(false);
//   const [basket, setBasket] = useState([]);

//   useEffect(() => {
//     fetchProducts().then(setProducts);
//   }, []);

//   const handleAddToBasket = useCallback(
//     (product) => {
//       const newBasket = [...basket];
//       const elem = newBasket.find((item) => item.id === product.id);
//       if (elem) {
//         elem.count += 1;
//       } else {
//         newBasket.push({
//           ...product,
//           count: 1
//         });
//       }
//       setBasket(newBasket);
//     },
//     [basket]
//   );

//   const handleBasketItemCount = useCallback(
//     (product, increment) => {
//       const newBasket = [...basket];
//       const elem = newBasket.find((item) => item.id === product.id);
//       if (elem) {
//         elem.count += increment;
//         setBasket(newBasket);
//       }
//       if (elem?.count === 0) {
//         setBasket(newBasket.filter((item) => item.id !== product.id));
//       }
//     },
//     [basket]
//   );

//   const handleDeleteBasket = useCallback(() => {
//     setBasket([]);
//   }, [basket]);

//   const handleDeleteBasketItem = useCallback(
//     (product) => {
//       const newBasket = basket.filter((item) => item.id !== product.id);
//       setBasket(newBasket);
//     },
//     [basket]
//   );

//   return (
//     <>
//       <BasketButton
//         color="primary"
//         size="large"
//         onClick={() => setDrawerState(true)}
//       >
//         <ShoppingBasketIcon />
//       </BasketButton>
//       <BasketDrawer
//         open={drawerState}
//         onClose={() => setDrawerState(false)}
//         basket={basket}
//         onBasketItemCountChange={handleBasketItemCount}
//         onBasketItemsDelete={handleDeleteBasket}
//         onBasketItemDelete={handleDeleteBasketItem}
//       />
//       <BasketModal
//         open={openBasket}
//         onClose={() => setOpenBasket(false)}
//         basket={basket}
//         onBasketItemCountChange={handleBasketItemCount}
//         onBasketItemsDelete={handleDeleteBasket}
//         onBasketItemDelete={handleDeleteBasketItem}
//       />
//       <Container>
//         <Grid container gap={2} justifyContent="center">
//           {products.map((product) => (
//             <Grid item xs={6} sm={4} md={3} key={product.id}>
//               <ProductItem
//                 product={product}
//                 onAddToBasket={() => handleAddToBasket(product)}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </>
//   );
// };
