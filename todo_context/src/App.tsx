import "./global.css";
import { AppRouter } from "./routes";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material";
// import { theme } from "./custom/theme";
import { createContext, forwardRef, useMemo, useState } from "react";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const LinkBehaviour = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

export default function App() {
  const matches = useMediaQuery("(min-width:1024px)");
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          secondary: {
            light: "#ffae42",
            main: "#ffae42",
            dark: "#ba000d",
            contrastText: "#000",
          },
        },
        components: {
          MuiLink: {
            defaultProps: {
              component: LinkBehaviour,
            } as LinkProps,
          },
          MuiButtonBase: {
            defaultProps: {
              LinkComponent: LinkBehaviour,
            },
          },
        },
      }),
    [mode]
  );

  return (
    <>
      {matches ? (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <AppRouter />
          </ThemeProvider>
        </ColorModeContext.Provider>
      ) : (
        <h1>Try opening on a wider screen (1024px and higher)</h1>
      )}
    </>
  );
}
