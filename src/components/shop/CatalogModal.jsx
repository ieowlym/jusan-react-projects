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
  position: "relative",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  width: "100%",
  maxWidth: 300,
  maxHeight: 500,
  bgcolor: "background.paper",
  top: 55,
  left: "185px",
  overflowY: "auto",
};
export const CatalogModal = ({ catalog, ...props }) => {
  const [secondLevelOpened, setSecondLevelOpened] = React.useState(false);

  return (
    <Modal {...props}>
      <Box sx={style}>
        <nav aria-label="secondary mailbox folders">
          <List>
            {catalog.map((item) => (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    component="a"
                    href="#simple-list"
                    // onClick={setSecondLevelOpened(true)}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                  {/* <Modal
                    open={secondLevelOpened}
                    onClose={setSecondLevelOpened(false)}
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Text in a modal
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                      </Typography>
                    </Box>
                  </Modal> */}
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </nav>
      </Box>
    </Modal>
  );
};
