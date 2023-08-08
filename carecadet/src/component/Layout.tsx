import React, { FC, ReactNode } from "react";
import { Box, CssBaseline, Grid } from "@mui/material";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <CssBaseline />

      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            position: "sticky",
            top: "0px",
            zIndex: 1,
          }}
        >
          <Navbar />
        </Grid>
        <Grid item xs={12}>
          <Box>{children}</Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
