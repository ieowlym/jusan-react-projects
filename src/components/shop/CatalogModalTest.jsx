import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";

// import { CatalogList } from "./CatalogList";

const style = {
  position: "absolute",
  maxHeight: 330,
  bgcolor: "background.paper",
  top: 55,
  left: "185px",
  overflowY: "auto",
  border: "#1976d2 solid 1px",
  borderRadius: "4px",
  display: "flex",
};

const StyledListItemButton = styled(ListItemButton)`
  padding: 0 4px;
  max-height: 100%;
  width: 221px;
  &:hover {
    background: #1976d2;
    color: white;
  }
  ${({ active }) =>
    active && {
      background: "#1976d2",
      color: "white",
    }}
`;

const CatalogList = ({ catalog }) => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  return (
    <>
      <List
        sx={{
          paddingLeft: "12px",
          paddingTop: 0,
          maxHeight: "100%",
          overflow: "auto",
        }}
      >
        {catalog.map((item) => (
          <>
            <ListItem disablePadding>
              <StyledListItemButton
                active={item === selectedCategory}
                component="a"
                onMouseEnter={() => {
                  setSelectedCategory(item);
                }}
              >
                <ListItemText primary={item.name} />
              </StyledListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
      {selectedCategory &&
        selectedCategory.childCategories &&
        selectedCategory.childCategories.length > 1 && (
          <CatalogList
            key={selectedCategory.id}
            catalog={selectedCategory.childCategories}
          />
        )}
    </>
  );
};

export const CatalogModal = ({ catalog, ...props }) => {
  return (
    <Modal {...props}>
      <Box sx={style}>
        {/* <nav aria-label="secondary mailbox folders" style={{ display: "flex" }}> */}
        <CatalogList catalog={catalog} />
        {/* </nav> */}
      </Box>
    </Modal>
  );
};
