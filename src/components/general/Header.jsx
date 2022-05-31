import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  styled,
  Button,
  Box,
} from "@mui/material";
import { stringAvatar } from "../../utils/getAvatarString";
import { useEffect, useState } from "react";
import { logout } from "../../store/slice/auth";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import { CatalogModal } from "../shop/CatalogModal";
import { fetchCatalog } from "../../fetchers/fetchCatalog";

const MyBtn = styled("button")`
  margin: 0;
  padding: 0;
  background: none;
  border: none;
`;

export function Header({ title, rightContent, ...rest }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [catalog, setCatalog] = useState([]);
  const [catalogOpened, setCatalogOpened] = useState(false);

  useEffect(() => {
    fetchCatalog().then((response) => {
      setCatalog(response);
    });
  }, []);

  const dispatch = useDispatch();

  const settings =
    // ["Profile", "Account", "Dashboard", "Logout"];
    [
      {
        name: "Logout",
        do: <MyBtn onClick={() => dispatch(logout())}>Logout</MyBtn>,
      },
    ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { currentUser } = useSelector((state) => state.auth);

  return (
    <AppBar position="sticky" {...rest}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
          {title}
        </Typography>
        <div>
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
        </div>
        <Box sx={{ flexGrow: 1 }}></Box>
        <div>
          {rightContent}

          {/* <Box sx={{ flexGrow: 0 }}> */}
          <Tooltip title="Open settings">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenUserMenu}
            >
              <Avatar {...stringAvatar(currentUser.email)} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  {/* <MyBtn
                    onClick={() => {
                      dispatch(setToken(""));
                    }}
                  >
                    {setting.name}
                  </MyBtn> */}
                  {setting.do}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          {/* </Box> */}
        </div>
      </Toolbar>
    </AppBar>
  );
}
