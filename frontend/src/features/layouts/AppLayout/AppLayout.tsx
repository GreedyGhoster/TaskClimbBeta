import { Outlet } from "react-router-dom";
import { APP_SIDEBAR_WIDTH, AppSidebar } from "./AppSidebar";
import { UseTodoProvider } from "../../../hooks";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import { ColorModeContext } from "../../../App";
import Main from "../../../components/Main/Main";
import AppBar from "../../../components/AppBar/AppBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DrawerHeader from "../../../components/DrawerHeader/Drawer";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";

export function AppLayout() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const colorMode = useContext(ColorModeContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        transition: "0.7s",
      }}
    >
      <UseTodoProvider>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              gap: 0.6,
              width: "50%",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              edge="start"
              sx={{
                marginLeft: "2px",
              }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Toolbar>
          <Toolbar
            sx={{
              width: "50%",
              display: "inline-flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={handleClick}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: APP_SIDEBAR_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: APP_SIDEBAR_WIDTH,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <AppSidebar />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </UseTodoProvider>
    </Box>
  );
}
