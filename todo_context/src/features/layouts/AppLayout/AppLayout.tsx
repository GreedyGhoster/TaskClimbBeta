import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { APP_SIDEBAR_WIDTH, AppSidebar } from "./AppSidebar";
import { UseTodoProvider } from "../../../context";

export function AppLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        flex: 1,
      }}
    >
      <UseTodoProvider>
        <AppSidebar />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            paddingLeft: APP_SIDEBAR_WIDTH,
          }}
          component={"main"}
        >
          <Outlet />
        </Box>
      </UseTodoProvider>
    </Box>
  );
}
