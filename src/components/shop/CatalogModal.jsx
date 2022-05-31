import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const style = {
  position: "absolute",
  maxHeight: 500,
  bgcolor: "background.paper",
  top: 55,
  left: "185px",
  overflowY: "auto",
};
export const CatalogModal = ({catalog, ...props}) => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = React.useState(null);

  return (
    <Modal {...props}>
      <Box sx={style}>
        <nav aria-label="secondary mailbox folders" style={{ display: 'flex' }}>
          <List>
            {catalog.map((item) => (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    component="a"
                    href="#simple-list"
                    onMouseEnter={() => {setSelectedCategory(item)}}
                  >
                    <ListItemText primary={item.name}/>
                  </ListItemButton>
                </ListItem>
                <Divider/>
              </>
            ))}
          </List>
          {selectedCategory && (
            <List>
              {selectedCategory.childCategories.map((item) => (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href="#simple-list"
                      onMouseEnter={() => {setSelectedSubcategory(item)}}
                    >
                      <ListItemText primary={item.name}/>
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                </>
              ))}
            </List>
          )}
          {selectedSubcategory && (
            <List>
              {selectedSubcategory.childCategories.map((item) => (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href="#simple-list"
                    >
                      <ListItemText primary={item.name}/>
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                </>
              ))}
            </List>
          )}
        </nav>
      </Box>
    </Modal>
  );
};
