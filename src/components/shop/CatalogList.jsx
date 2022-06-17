import * as React from "react";

import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";

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

export const CatalogList = ({ catalog }) => {
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
            <ListItem disablePadding key={item.id}>
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
      {selectedCategory && selectedCategory.childCategories && (
        <CatalogList
          key={selectedCategory.id}
          catalog={selectedCategory.childCategories}
        />
      )}
    </>
  );
};
