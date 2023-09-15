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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useContext, useState } from "react";
import { ColorModeContext } from "../../../App";
import Main from "../../../components/Main/Main";
import AppBar from "../../../components/AppBar/AppBar";
import DrawerHeader from "../../../components/DrawerHeader/Drawer";

export function AppLayout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const colorMode = useContext(ColorModeContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
              gap: 0.5,
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
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
