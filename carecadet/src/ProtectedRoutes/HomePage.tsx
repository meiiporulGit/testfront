import React from "react";
// import { Route, RouteProps, Navigate, useLocation } from "react-router";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SideNavBar from "../component/SideNav/SideNavComp";
import { Box, Grid, Paper, Typography, Link, Button, MenuItem, Menu, Divider } from "@mui/material";

import { useAppSelector, useAppDispatch } from "../Redux/Hook";
import { refresh } from "../Redux/ProviderRedux/LoginSlice";

import { Formik, Form, ErrorMessage, Field } from "formik";

import * as Yup from "yup";
import { Select } from "@mui/material";
import SelectField from "../Components/Select";

import { InputLabel } from '@mui/material';
import { FormControl } from '@mui/material';
import { NativeSelect } from '@mui/material';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';



type Props = {
  children: React.ReactNode;
  getData: string
};
const HomePage = ({ children, getData }: Props) => {
  // const dispatch = useAppDispatch();
  // dispatch(refresh());
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()
  const location = useLocation().pathname.split("/");
  //   const path = location === "" ? "patient" : location;
  const patientUser = useAppSelector(
    (state) => state.patientAuth.patientLogoutButton
  );

  const providerUser = useAppSelector(state => state.providerAuth.providerLogoutButton)
  const adminUser =useAppSelector(state=>state.adminAuth.adminLogoutButton)
  //   const options = [
  //     { value: "Provider", item: "Provider" },
  //     { value: "Patient", item: "Patient" },
  //     { value: "Payer", item: "Payer" },
  //   ];

  //  const handleChange=(e:any)=>{
  //   navigate(`/${e.target.value}`)

  //  }
  //   interface forminitialValues {
  //     userType: string;
  //   }


  //   const initialValues: forminitialValues = {
  //     userType:""
  //   }

  //   const validationSchema = Yup.object().shape({
  //     userType: Yup.string().required("Required"),}
  //   )  

  //   const onSubmit = (values: forminitialValues, actions: any) => {
  //     const userdata = {
  //       userType:values.userType}
  //     }

  React.useEffect(() => {
    if (patientUser) {
      navigate("/patient/checkPage")
    }
    if (providerUser) {
      navigate("/provider/facility/viewFacility")
    }
    if(adminUser){
      navigate("/admin/adminlogin")
    }
  }, [getData])

  // let isAuth=true
  //   return !authUser && path==="patient" ? (
  //     <> {children}</>
  //   ) : (
  //     <Navigate to="/patient/checkPage" replace />
  //   );

  // return (
  //   <Box sx={{ backgroundColor: "primary.light", padding: "1.8rem" }}>

  // const [open, setOpen] = React.useState(true);

  // const handleClick = () => {
  //   setOpen(!open);
  // };
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (

    <Box>
      <Box sx={{ backgroundColor: "primary.light", padding: {md:"1.8rem"}, display: "flex" }}>
        <Typography
          // variant="h3"
          sx={{
            display: "flex",
            //  color: "#728AB7",
            color: "black",
            fontSize:{xs:"1.5rem",sm:"2rem",md:"4rem"},
            //  fontWeight: "bold",
            // padding: "20px",
            marginBottom: {xs:"40px",md:"15px"},
            mt: {xs:location[2] === "search" ? 0 : "40px",md:location[2] === "search" ? 0 : "150px"},
            ml: {xs:location[2] === "search" ? 0 : "80px", md:location[2] === "search" ? 0 : "150px"}
          }}
        >
          {/* I am <Box sx={{ color: "#4D77FF" }}>Provider/Employer</Box> */}
          I am a
        

        <Button sx={{
           mt: {xs:location[2] === "search" ? "0" : "-5px",md:location[2] === "search" ? "-50px" : "5px"},
           ml: {xs: location[2] === "search" ? 1 : 1,md:location[2] === "search" ? 1 : 1}
        }}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {/* Provider */}
          <Typography
            // variant="h4"
            sx={{
              // fontSize: "3.5rem",
              fontSize:{xs:"1.5rem",sm:"2rem",md:"4rem"},
              color: "#4D77FF",
              textDecoration: 'underline',
              "&:hover": {
                color: "blue",


              },
            }}
          >{location[1] === "" ? "Patient" : "Provider"}

          </Typography>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          elevation={0}
          // anchorReference="anchorPosition"
          // anchorPosition={{ top: 140, left: 600 }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
 
          
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            sx: { width: {xs:'10ch',md:'30ch'},height:{xs:'12ch'},background: "#DEFFF8",padding:0,mt:"-10" }
            
          }}
          // PaperProps={{
          //   style: {
          //     width: '30ch',
          //     background: "#DEFFF8",
          //   },
          // }}
        >
          <Link component={NavLink} to="/" color="blue" underline="none">
            <MenuItem onClick={handleClose} sx={{ fontSize: {xs:"1rem",md:"1.5rem"} }}>Patient</MenuItem> </Link>
          <Divider />
          <Link component={NavLink} to="/provider/home" color="blue" underline="none">
            <MenuItem onClick={handleClose} sx={{ fontSize: {xs:"1rem",md:"1.5rem"} }}>Provider</MenuItem></Link>

        </Menu>
        </Typography>
      </Box>
      {children}
    </Box>


  );
}




{/* <Typography
        variant="h3"
        sx={{
          display: "flex",
          gap: "1.3rem",

          color: "#728AB7",
          fontWeight: "bold",
          // padding: "20px",
          //   marginBottom: "50px",
        }}
      >
        I am a
        <Link component={NavLink} to="/" color="black" underline="none">
          <Typography
            variant="h3"
            sx={{
              color: "#4D77FF",
              borderBottom: location === "" ? "2px solid blue" : "none",
              "&:hover": {
                color: "blue",
               
                // letterSpacing: "0.2rem",
                // fontSize: "1rem",
              },
            }}
          >
            Patient
          </Typography>
        </Link>
        or
        <Link
          component={NavLink}
          to="/provider/home"
          color="black"
          underline="none"
        >
          <Typography
            variant="h3"
            sx={{
              color: "#4D77FF",
              borderBottom: location === "provider" ? "2px solid blue" : "none",
              "&:hover": {
                color: "blue",
               
                // letterSpacing: "0.2rem",
                // fontSize: "1rem",
              },
            }}
          >
            Provider
          </Typography>
        </Link>
      </Typography>  */}
{/* {children} */ }
// </Box>
//   );
// };

export default HomePage;

// import React from "react";
// import { Route, RouteProps, Navigate } from "react-router";
// import {Paper} from '@mui/material';
// import SideNavBar from './component/SideNav/SideNavComp';
// import "./check.css"

// interface Props {
//   children: JSX.Element;
// }
// const ProtectedRoute = ({ children }: Props) => {
//   const isAuth = true;
//   return isAuth ? <div className="check"><SideNavBar/>{children} </div> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;
