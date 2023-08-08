import { Box, Typography, Link, Grid, Menu, IconButton, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../Redux/Hook";
import { logoutButton } from "../Redux/ProviderRedux/LoginSlice";
import { refrestState } from "../Redux/ProviderRedux/orgSlice";

import { axiosPrivate } from "../axios/axios";
import { toast } from "react-toastify";

const OrganizationNav = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const location = useLocation().pathname.split("/")[2];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const logout = useAppSelector(
    (state) => state.providerAuth.providerLogoutButton
  );
  const userID = useAppSelector((state) => state.providerAuth.login.userID)
  const userName = useAppSelector(state => state.providerAuth.login.userName)

  return (
    <Box sx={{padding:"1rem 0 0 0"}}>
      <Box sx={{  display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {/* <Box display={"flex"} gap="2rem"> */}
          <Link
            to="/provider/viewOrg"
            component={NavLink}
            underline="none"
          >
            <MenuItem onClick={handleCloseNavMenu} sx={{ width: 250 }}>
              <Typography
                sx={{
                  color: location === "viewOrg" ? "#4D77FF" : "default",
                  fontSize: "1.1rem",
                  borderBottom: location === "viewOrg" ? "3px solid blue" : "none",
                  padding: "0.3rem",
                  cursor: "pointer"
                }}
              >
                Organization info
              </Typography>
            </MenuItem>
          </Link>
          <Link
            to="/provider/facility/viewFacility"
            component={NavLink}
            underline="none"
          >
            <MenuItem onClick={handleCloseNavMenu} sx={{ width: 250 }}>
              <Typography
                sx={{
                  color: location === "facility" ? "#4D77FF" : "default",
                  fontSize: "1.1rem",
                  borderBottom: location === "facility" ? "3px solid blue" : "none",
                  padding: "0.3rem",

                  cursor: "pointer"
                }}
              >
                Facility
              </Typography>
            </MenuItem>
          </Link>
          <Link
            to="/provider/service/listService"
            component={NavLink}
            underline="none"
          >
            <MenuItem onClick={handleCloseNavMenu} sx={{ width: 250 }}>
              <Typography
                sx={{
                  color: location === "service" ? "#4D77FF" : "default",
                  fontSize: "1.1rem",
                  borderBottom: location === "service" ? "3px solid blue" : "none",
                  padding: "0.3rem",
                  cursor: "pointer"
                }}
              >
                Service
              </Typography>
            </MenuItem>
          </Link>
          <Link
            to="/provider/serviceView/serviceView"
            component={NavLink}
            underline="none"
          >
            <MenuItem onClick={handleCloseNavMenu} sx={{ width: 250 }}>
              <Typography
                sx={{
                  color: location === "serviceView" ? "#4D77FF" : "default",
                  fontSize: "1.1rem",
                  borderBottom: location === "serviceView" ? "3px solid blue" : "none",
                  padding: "0.3rem",
                  cursor: "pointer"
                }}
              >
                Service Details
              </Typography>
            </MenuItem>
          </Link>
          {/* </Box> */}
       
        </Menu>
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <Box display={"flex"} gap="2rem">
          <Link
            to="/provider/facility/viewFacility"
            component={NavLink}
            underline="none"
          >
            <Typography
              sx={{
                color: location === "facility" ? "#4D77FF" : "default",
                fontSize: "1.1rem",
                borderBottom: location === "facility" ? "3px solid blue" : "none",
                padding: "0.3rem",

                cursor: "pointer"
              }}
            >
              Facility
            </Typography>
          </Link>
          <Link
            to="/provider/service/listService"
            component={NavLink}
            underline="none"
          >
            <Typography
              sx={{
                color: location === "service" ? "#4D77FF" : "default",
                fontSize: "1.1rem",
                borderBottom: location === "service" ? "3px solid blue" : "none",
                padding: "0.3rem",
                cursor: "pointer"
              }}
            >
              Service
            </Typography>
          </Link>
          <Link
            to="/provider/serviceView/serviceView"
            component={NavLink}
            underline="none"
          >
            <Typography
              sx={{
                color: location === "serviceView" ? "#4D77FF" : "default",
                fontSize: "1.1rem",
                borderBottom: location === "serviceView" ? "3px solid blue" : "none",
                padding: "0.3rem",
                cursor: "pointer"
              }}
            >
              Service Details
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default OrganizationNav;
