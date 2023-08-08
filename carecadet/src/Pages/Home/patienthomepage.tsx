import React from "react";
import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import healthcare from "../../Images/healthcare.jpg";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";

import {
  Grid,
  Typography,
  Paper,
  TextField,
  Select,
  IconButton,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  Menu,
  Link,
  Autocomplete,
  AutocompleteRenderInputParams,
  createFilterOptions,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../Redux/Hook";
import { pageUser } from "../../Redux/ProviderRedux/LoginSlice";

import { axiosPrivate } from "../../axios/axios";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import SelectField from "../../Components/Select";
import FormTextField from "../../Components/Textfield";
import { toast } from "react-toastify";

import dashboardicon from "../../Images/dashboardicon.png";
import dentallogo from "../../Images/dentallogo.jpg";
import lab from "../../Images/lab.png";
import emergency from "../../Images/emergency.jpg";
import care from "../../Images/care.jpg";
import { dataQuery, dataSearch } from "../../Redux/ProviderRedux/HomeSlice";
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import InputAdornment from "@mui/material/InputAdornment";


interface forminitialValues {
  Service: string;
  Location: string;
}


const Patienthomepage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [checkInfo, setCheckInfo] = useState<any>([])
  const [locaInfo, setLocaInfo] = useState<any>([])
  const OPTIONS_LIMIT = 10;
  const defaultFilterOptions = createFilterOptions();

//   const[lat,setLatitude] = useState<number>();
//   const [lon,setLongitude] = useState<any>();
  
//   console.log("locaInfo",locaInfo)


//        navigator.geolocation.getCurrentPosition((position) =>{
//      setLatitude(position.coords.latitude);
//      setLongitude(position.coords.longitude)
//      const zipCode = {lat,lon}
//      console.log("zipCode",zipCode)
//      axiosPrivate.post(`/search/serviceLocationSearch`,zipCode)
//    .then((res)=>{
// setLocaInfo(res.data.data)
//    })
//    .catch((e)=>console.log(e));
//     })
  
  
  // console.log(lat,'latitude');
  // console.log(lon,'longitude');

  const filterOptions = (options: any, state: any) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };



  const initialValues: forminitialValues = {
    Service: "",
    Location: ""
  };
  const validationSchema = Yup.object().shape({
    Service: Yup.string().required("Required"),
    Location: Yup.string().required("Required")
  }); 
  const onSubmit = (values: forminitialValues, actions: any) => {
   dispatch(dataQuery(values))
    navigate(`/patient/search?q=${values.Service.trim()}&location=${values.Location.trim()}`);
};
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
       {({ handleChange, setFieldValue, values }) => (
      <Form>

        <Box
          sx={{
            width: "100%",
            backgroundColor: "primary.light",
          }}
        >
          <Grid
            container
            spacing={3.5}
            direction="row"
          >
            <Grid item xs={12} md={7}>
              <Grid container xs={12} sx={{
                padding: "1rem",
                background: "#4D77FF",
                // width: "55em",
                gap: "1.5rem", mb: { xs: 5, md: 0 }

              }}>
                <Grid item xs={12} md={7.5} >
               
                <Field
                    label="Service Name"
                    placeholder="Search Service"
                    name="Service"
                    component={Autocomplete}
                    options={checkInfo ?? []}
                    loading={checkInfo.length === 0}
                    //  PaperComponent={CustomPaper}
                    filterOptions={filterOptions}
                    freeSolo
                    onInputChange={(e: any, value: any) => {
                    const postData = { q:value }
                    console.log(value,'onchangevalue')
                    setFieldValue("Service", value);
                   axiosPrivate.post(`/search/serviceNamesearch`, postData)
                      .then((res) => {
                        console.log(res.data.data, 'servicesearch')
                        setCheckInfo(res.data.data)
                      })
                      .catch((e) => console.log(e));

                    }}
                    value={values.Service}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <TextField
                        {...params}
                        name="Service"
                        placeholder="Search Service"
                        // label="Search Service Name"
                        onChange={handleChange}
                        variant="outlined"

                        sx={{
                          
                          "& .MuiAutocomplete-popupIndicator": { transform: "none" },
                          ".MuiInputBase-input": {
                            background: "white",
                          },
                          ".MuiInputBase-root": {
                            background: "white"
                          },
                          borderRadius: 1,
                          "&::placeholder": {
                            fontSize: "1.1rem",
                            color: "black",
                          }      
                        
                        }}
                      />
                    )}
                  />
                 
           
                </Grid>
                <Grid item xs={12} md={4}>
                <Field
                    as={TextField}
                    name="Location"
                    // value= {locaInfo}
                    placeholder="Location"
                    type="text"
                    // onChange={((e:any,value:any)=>{
                    //   if(!locaInfo){
                    //   e.target.value
                    //   console.log(e.target.value,".............k")}
                    //   else{
                    //     value={locaInfo}
                    //   }
                    //                     })}
           
                    fullWidth={true}
                    sx={{
                      borderRadius: 1,
                      "&::placeholder": {
                        fontSize: "1.1rem",
                        color: "black",
                      },
                      ".MuiInputBase-input": {
                        background: "white",
                      },
                      ".MuiFormLabel-root ": {
                        letterSpacing: "0.2rem",
                        fontSize: "0.8rem",
                      },
                      ".MuiInputLabel-shrink": {
                        letterSpacing: 0,
                      },
                    }}
                  />
                </Grid>
              </Grid>

            </Grid>

            <Grid item xs={3.75} sx={{ mt: "-250px", display: { xs: "none", md: 'block' } }}>
              <img
                src={healthcare}
                alt="Home"
                style={{
                  width: "650px",
                  height: "530px",
                  //  top: "35px",
                  // right: "60%",
                  borderRadius: "13px",
                }}
              />

            </Grid>
            <Grid>
              <Buttoncomponent
                type="submit"
                size="large"
                fullWidth={false}
                variant="contained"
                sx={{
                  marginTop: { xs: "15px", md: "-100px" },
                  height: "40px",
                  ml: { xs: "150px", md: "350px" },
                  mb: { xs: 15, md: 0 },
                  backgroundColor: "secondary.dark",
                  // width: "20vw",
                  color: "#fff",
                  // display: "flex",
                  justifyContent: "center",
                  // gap:"1.2rem",

                  "&:hover": {
                    color: "secondary.dark",
                    border: "1px solid blue",
                    // letterSpacing: "0.2rem",
                    // fontSize: "1rem",
                  },
                }}
               
              >
                <SearchIcon /> Find care
              </Buttoncomponent>
            </Grid>


          </Grid>

          <Box
            sx={{
              backgroundColor: "RGB(217 229 251)",
              height: { xs: "5em", md: "10em" },
              mt: "35px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                fontWeight: "bold",
                fontSize: { xs: "20px", md: "30px" },
                padding: { xs: "10px", md: "50px" },
              }}
            >
              Care<Box sx={{ color: "#4D77FF" }}>Cadet</Box>
            </Box>
          </Box>
        </Box>
      </Form>)}
    </Formik>
    // </Box>
    // <Box
    //   sx={{
    //     background: "transparent",
    //   }}
    // >
    //   <Formik
    //     initialValues={initialValues}
    //     validationSchema={validationSchema}
    //     onSubmit={onSubmit}
    //   >
    //     <Form>
    //         {/* <Box
    //               sx={{
    //                 padding:"1rem",
    //                 display: "flex",
    //                 justifyContent:"center",
    //                 alignItems:"center",
    //                 background: "#4D77FF",
    //                 height: "6em",
    //                 width: "55em",
    //                 gap:"1rem"

    //               }}
    //             >
    //               <FormTextField
    //                 container={TextField}

    //                 name="Service"
    //                 placeholder="Search Service"
    //                 type="text"
    //                 fullWidth={false}
    //                 sx={{
    //                  borderRadius:1,
    //                   ".MuiInputBase-input" : {
    //                     background: "white"
    //                   },
    //                   ".MuiFormLabel-root ": {
    //                     letterSpacing: "0.2rem",
    //                     fontSize: "0.8rem",
    //                   },
    //                   ".MuiInputLabel-shrink": {
    //                     letterSpacing: 0,
    //                   },
    //                 }}
    //               />

    //               <FormTextField
    //                 container={TextField}

    //                 name="Location"
    //                 placeholder="location"
    //                 type="text"
    //                 fullWidth={false}
    //                 sx={{
    //                   borderRadius:1,
    //                   ".MuiInputBase-input" : {
    //                     background: "white"
    //                   },
    //                   ".MuiFormLabel-root ": {
    //                     letterSpacing: "0.2rem",
    //                     fontSize: "0.8rem",
    //                   },
    //                   ".MuiInputLabel-shrink": {
    //                     letterSpacing: 0,
    //                   },
    //                 }}
    //               />
    //             </Box> */}
    //       <Box
    //         sx={{
    //           width: "100%",
    //           // height: "160vh",
    //           backgroundColor: "primary.light",
    //         }}
    //       >
    //         <Grid
    //           container
    //           spacing={3.5}
    //           direction="row"
    //           // justifyContent="flex-start"
    //           // alignItems="flex-start"
    //           // sx={{ ml: "10px" }}
    //         >

    //         <Grid item xs= {12} md={7}>

    //             <Grid container xs={12} sx={{
    //                 padding:"1rem",                    
    //                 background: "#4D77FF",                   
    //                 // width: "55em",
    //                 gap:"1.5rem"

    //               }}>
    //                 <Grid item xs={12} md={7.5} >
    //                 <FormTextField
    //                 container={TextField}                   
    //                 name="Service"
    //                 placeholder="Search Service"
    //                 type="text"
    //                 fullWidth={false}
    //                 inputProps={{ sx: { height: 500 } }}
    //                 sx={{
    //                  borderRadius:1,
    //                   ".MuiInputBase-input" : {
    //                     background: "white"
    //                   },
    //                   ".MuiFormLabel-root ": {
    //                     letterSpacing: "0.2rem",
    //                     fontSize: "0.8rem",

    //                   },
    //                   ".MuiInputLabel-shrink": {
    //                     letterSpacing: 0,
    //                   },
    //                   '&::placeholder': {
    //                     fontSize:"1.3rem",
    //                      color: 'black'
    //                    }

    //                 }}
    //               />
    //                 </Grid>
    //                 <Grid  item xs ={12} md={4}>
    //                 <FormTextField
    //                 container={TextField}                   
    //                 name="Location"
    //                 placeholder="Location"
    //                 type="text"
    //                 fullWidth={false}
    //                 sx={{
    //                   borderRadius:1,
    //                   ".MuiInputBase-input" : {
    //                     background: "white"
    //                   },
    //                   ".MuiFormLabel-root ": {
    //                     letterSpacing: "0.2rem",
    //                     fontSize: "0.8rem",
    //                   },
    //                   ".MuiInputLabel-shrink": {
    //                     letterSpacing: 0,
    //                   },
    //                   '&::placeholder': {
    //                     fontSize:"1.3rem",
    //                      color: 'black'
    //                    }
    //                 }}/>
    //                 </Grid>                    
    //                 </Grid>
    //                 <Buttoncomponent
    //             type="submit"
    //             size="large"
    //             fullWidth={false}
    //             variant="contained"
    //             sx={{
    //               marginTop: "-100px",
    //               ml: "350px",
    //               backgroundColor: "secondary.dark",
    //               // width: "20vw",
    //               color: "#fff",
    //               display: "flex",
    //               justifyContent: "center",
    //               // gap:"1.2rem",

    //               "&:hover": {
    //                 color: "secondary.dark",
    //                 border: "1px solid blue",
    //                 // letterSpacing: "0.2rem",
    //                 // fontSize: "1rem",
    //               },
    //             }}
    //           >
    //             <SearchIcon /> Find care
    //           </Buttoncomponent>
    //           </Grid>

    //           <Grid item xs={3.75} sx={{ mt: "-250px" , display:{xs:"none" , md:'block'}}}>
    //             <img
    //               src={healthcare}
    //               alt="Home"
    //               style={{
    //                 width: "650px",
    //                 height: "530px",
    //                 //  top: "35px",
    //                 // right: "60%",
    //                 borderRadius: "13px",
    //               }}
    //             />

    //           </Grid>


    //         </Grid>

    //         <Box
    //           sx={{
    //             backgroundColor: "RGB(217 229 251)",
    //             height: "10em",
    //             mt: "50px",
    //           }}
    //         >
    //           <Box
    //             sx={{
    //               display: "flex",
    //               fontWeight: "bold",
    //               fontSize: "30px",
    //               padding: "50px",
    //             }}
    //           >
    //             Care<Box sx={{ color: "#4D77FF" }}>Cadet</Box>
    //           </Box>
    //         </Box>
    //       </Box>
    //     </Form>
    //   </Formik>
    // // </Box>
  );
};

export default Patienthomepage;
