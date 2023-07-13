import createTheme from "@mui/material/styles/createTheme";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";
import React from "react";

const LinkBehaviour = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

export const theme = createTheme({
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
  // palette: {
  //   primary: {
  //     // Purple and green play nicely together.
  //     main: purple[500],
  //   },
  //   secondary: {
  //     // This is green.A700 as hex.
  //     main: '#11cb5f',
  //   },
  // },
});
