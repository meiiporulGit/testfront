import { Box, Typography,Paper, Link, Grid, Menu, IconButton, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import {

  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Card,
 FormGroup,
  Container,
  ListItemButton,
  ListItemIcon,
  Collapse,
  ListItemText,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../Redux/Hook";
import { logoutButton } from "../Redux/ProviderRedux/LoginSlice";
import { refrestState } from "../Redux/ProviderRedux/orgSlice";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { axiosPrivate } from "../axios/axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import ClearIcon from '@mui/icons-material/Clear';
import { dataSearch, dataSearchTenMiles, dataSearchTwentyMiles, dataSearchThirtyMiles } from "../Redux/ProviderRedux/HomeSlice";


const SearchNav = () => {
  const [checkText,setCheckText]=useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const location = useLocation().pathname.split("/")[2];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
   
  const open = Boolean(anchorEl);

  const [open1, setOpen1] = useState<boolean>(false)
  const [distance, setDistance] = useState("")
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  function handleInputChange(event: any) {
    if (event.target.value === distance) {
     setCheckText(false)
      setDistance("");     
    } else {
      setCheckText(true)
      setDistance(event.target.value);
    }
  }
  interface forminitialValues {
    Service: string;
    Location: string;
  }

  const initialValues: forminitialValues = {
    Service: "",
    Location: "",

  };


  const validationSchema = Yup.object().shape({
    Service: Yup.string().required("Required"),
    Location: Yup.string().required("Required"),
  });
  const onSubmit = (values: forminitialValues, actions: any) => {

    axiosPrivate
      .get(
        `http://server01:5003/search/?q=${values.Service}&location=${values.Location}`
      )
      .then((res) => {
        console.log(res.data);
        dispatch(dataSearch(res.data.data));
        // navigate("/patient/search");
        console.log("searchi", res);
      })
      .catch((e) => console.log(e));

  };

  const logout = useAppSelector(
    (state) => state.providerAuth.providerLogoutButton
  );
  const userID = useAppSelector((state) => state.providerAuth.login.userID)
  const userName = useAppSelector(state => state.providerAuth.login.userName)

  return (

    <Box sx={{  display: { xs: "block", md: "none" } }}>
       <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, setFieldValue, values }) => (<Form>  
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
 {/* <ClearIcon onClick={handleCloseNavMenu}/> */}
       
          <MenuItem onClick={handleCloseNavMenu} sx={{ width: 250,fontSize: "1.25rem" }}>
         
               <Box>
                  {/* <Paper sx={{
                    fontSize: "1rem",
                    borderRadius: "20px",
                    backgroundColor: "#CDDBF8",
                    mb: "10px"
                  }}> */}
                    <IconButton sx={{fontSize: "1rem"}}
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen1(!open1)}
                    >
                      {open1 ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                    Distance
                  {/* </Paper> */}
                  <Collapse in={open1} timeout="auto" unmountOnExit>
                    <Grid item xs={12}>
                      <FormGroup
                      // name="distancefilter"
                      // value={distance}
                      >
                        <FormControlLabel value="10mi"
                          control={<Checkbox
                            checked={distance === "10mi" && checkText }
                            onClick={handleInputChange}
                            onChange={() => {
                              distance != "10mi" ?
                              axiosPrivate
                                .get(
                                  `http://server01:5003/search/?q=${values.Service}&location=${values.Location}&distance= 10mi`
                                )
                                .then((res) => {
                                  console.log(res.data, "10miles");
                                  dispatch(dataSearch(res.data.data))
                                  // setSearchqueryData(res.data.data)
                                })
                                .catch((e) => console.log(e)) 
                                 : axiosPrivate
                                  .get(
                                    `http://server01:5003/search/?q=${values.Service}&location=${values.Location}`
                                  )
                                  .then((res) => {
                                    console.log(res.data);
                                    // setSearchqueryData(res.data.data)
                                     dispatch(dataSearch(res.data.data));
                                    // navigate("/patient/search");
                                    console.log("searchi", res);
                                  })
                                  .catch((e) => console.log(e))
                            }}
                          />}
                          label="10 miles" 
                          labelPlacement="end"/>
                        <FormControlLabel value="20mi"
                          control={<Checkbox
                            checked={distance === "20mi" && checkText}
                            onClick={handleInputChange}
                            onChange={() => {
                              distance != "20mi" ?
                              axiosPrivate
                                .get(
                                  `http://server01:5003/search/?q=${values.Service}&location=${values.Location}&distance= 20mi`
                                )
                                .then((res) => {
                                  console.log(res.data, "20miles");
                                  dispatch(dataSearch(res.data.data))
                                  // setSearchqueryData(res.data.data)
                                })
                                .catch((e) => console.log(e))
                                :axiosPrivate
                                .get(
                                  `http://server01:5003/search/?q=${values.Service}&location=${values.Location}`
                                )
                                .then((res) => {
                                  console.log(res.data);
                                  // setSearchqueryData(res.data.data)
                                   dispatch(dataSearch(res.data.data));
                                  // navigate("/patient/search");
                                  console.log("searchi", res);
                                })
                                .catch((e) => console.log(e))
                            }} />}
                          label="20 miles" labelPlacement="end"
                          />
                        <FormControlLabel value="30mi"
                          control={<Checkbox
                            checked={distance === "30mi" && checkText}
                            onClick={handleInputChange}
                            onChange={() => {
                              distance != "30mi" ?
                              axiosPrivate
                                .get(
                                  `http://server01:5003/search/?q=${values.Service}&location=${values.Location}&distance= 30mi`
                                )
                                .then((res) => {
                                  console.log(res.data, "30miles");
                                  dispatch(dataSearch(res.data.data))
                                  // setSearchqueryData(res.data.data)
                                })
                                .catch((e) => console.log(e))
                                :axiosPrivate
                                .get(
                                  `http://server01:5003/search/?q=${values.Service}&location=${values.Location}`
                                )
                                .then((res) => {
                                  console.log(res.data);
                                  // setSearchqueryData(res.data.data)
                                   dispatch(dataSearch(res.data.data));
                                  // navigate("/patient/search");
                                  console.log("searchi", res);
                                })
                                .catch((e) => console.log(e))
                            }} />}
                          label="30 miles" 
                          labelPlacement="end" />

                      </FormGroup>
                    </Grid>
                 
                  </Collapse>
                </Box>
            
          </MenuItem>
     
          <MenuItem onClick={handleCloseNavMenu}  sx={{ width: 250 }}>
            <Typography
              sx={{
                // color: location === "facility" ? "#4D77FF" : "default",
                fontSize: "1.1rem",
                // borderBottom: location === "facility" ? "3px solid blue" : "none",
                // padding: "0.3rem",

                cursor: "pointer"
              }}
            >
              Quality Score
            </Typography>
          </MenuItem>
      
          <MenuItem onClick={handleCloseNavMenu}  sx={{ width: 250 }}>
            <Typography
              sx={{
                // color: location === "service" ? "#4D77FF" : "default",
                fontSize: "1.1rem",
                // borderBottom: location === "service" ? "3px solid blue" : "none",
                padding: "0.3rem",
                cursor: "pointer"
              }}
            >
            Negotiated Rates
            </Typography>
          </MenuItem>
    
          <MenuItem onClick={handleCloseNavMenu} sx={{ width: 250 }}>
            <Typography
              sx={{
                // color: location === "serviceView" ? "#4D77FF" : "default",
                fontSize: "1.1rem",
                // borderBottom: location === "serviceView" ? "3px solid blue" : "none",
                padding: "0.3rem",
                cursor: "pointer"
              }}
            >
              Facility Type
            </Typography>
          </MenuItem>
      
     
      </Menu>
    
      </Form>)}
      </Formik>
   
   </Box>

  );
};

export default SearchNav;
