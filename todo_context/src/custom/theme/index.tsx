import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import createTheme from "@mui/material/styles/createTheme";
import { LinkProps } from "@mui/material/Link";

const LinkBehaviour = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    mode: "dark",
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
});
