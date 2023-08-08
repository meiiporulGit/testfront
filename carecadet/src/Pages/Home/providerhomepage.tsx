import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import healthcare from "../../Images/healthcare.jpg";
import SearchIcon from "@mui/icons-material/Search";

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
import { dataProviderSearch, dataQueryProvider, dataSearch,  } from "../../Redux/ProviderRedux/HomeSlice";
import { toast } from "react-toastify";

import dashboardicon from "../../Images/dashboardicon.png";
import dentallogo from "../../Images/dentallogo.jpg";
import lab from "../../Images/lab.png";
import emergency from "../../Images/emergency.jpg";
import care from "../../Images/care.jpg";

// import LocationOnIcon from '@material-ui/icons/LocationOn';
import InputAdornment from "@mui/material/InputAdornment";

interface forminitialValues {
  Service: string;
  Location: string;
}
const options = [
  { value: "Type1", item: "Type1" },
  { value: "Type2", item: "Type2" },
  { value: "Type3", item: "Type3" },
];
const Providerhomepage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [state, setState] = React.useState("Provider");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [checkInfo, setCheckInfo] = useState<any>([])
  const OPTIONS_LIMIT = 10;
  const defaultFilterOptions = createFilterOptions();

  const filterOptions = (options: any, state: any) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  const initialValues: forminitialValues = {
    Service: "",
    Location: "",
  };
  const validationSchema = Yup.object().shape({
    Service: Yup.string().required("Required"),
    Location: Yup.string().required("Required"),
  });
  const onSubmit = (values: forminitialValues, actions: any) => {
    // alert(JSON.stringify(facilitydata, null, 2));
    // alert(JSON.stringify(values, null, 2))
    actions.resetForm({
    values:initialValues
    
    });
  dispatch(dataQueryProvider(values))
    navigate(`/provider/search?q=${values.Service.trim()}&location=${values.Location.trim()}`);
    // axiosPrivate
    //   .get(`http://210.18.155.251:5003/search/?q=`)
    // axiosPrivate.get (`http://210.18.155.251:5003/search/negotiatedSearch?q=${values.Service}&location=${values.Location}&serviceCode=21`)
    //   .then((res) => {
    //     console.log(res.data);
    //     dispatch(dataProviderSearch(res.data.data));
    //     navigate(`/provider/search?q=${values.Service}&location=${values.Location}`);
    //     console.log("i", res);
    //   })
    //   .catch((e) => console.log(e));
  };
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 const [data,setData] = React.useState ({
   Link:"Urgent Care"
          });
 const [data1,setData1] = React.useState ({
  Link:"Dental Care"
  });
 const [data2,setData2] = React.useState ({
  Link:"Labs"
    });
    const [data3,setData3] = React.useState ({
      Link:"Services"
      });

  return (
    // <Box
    //   // elevation={5}
    //   sx={{
    //     background: "transparent",
    //   }}
    // >
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
              // height: "160vh",
              backgroundColor: "primary.light",
            }}
          >
            {/* <Grid container justifyContent={{xs:"center",md:"flex-end"}}>
              <Buttoncomponent
                type="button"
                size="small"
                fullWidth={false}
                variant="contained"
                onClick={() => navigate("/provider/login")}
                sx={{
                  backgroundColor: "secondary.dark",
                  width: {xs:"20vw",md:"7vw"},
                  color: "#fff",
                  mt: {xs:"0px",md:"-260px"},
                  mb: {xs:"20px",md:"260px"},
                  mr: {md:"40px"},
                  "&:hover": {
                    color: "secondary.dark",
                    border: "1px solid blue",
                    // letterSpacing: "0.2rem",
                    // fontSize: "1rem",
                  },
                }}
              >
                Sign in
              </Buttoncomponent>
            </Grid> */}

        

            <Grid
              container
              spacing={3.5}
              direction="row"
              // justifyContent="flex-start"
              // alignItems="flex-start"
              // sx={{ ml: "10px" }}
            >
              <Grid  item xs = {12} md={7} >
              
                <Grid container xs={12} sx={{
                    padding:"1rem",
                    
                    background: "#4D77FF",
                   
                    // width: "55em",
                    gap:"1.5rem",mb:{xs:5,md:0}
                   
                  }}>
                <Grid item xs = {12} md={7.5}  >
             
                <Field
                    label="Service Name"
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
                        // label="Search Service Name"
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="Search Service"
                        sx={{
                          
                          "& .MuiAutocomplete-popupIndicator": { transform: "none" },
                          ".MuiInputBase-input": {
                            background: "white",
                          },
                          ".MuiInputBase-root": {
                            background: "white"
                          },
                          ".MuiFormLabel-root ": {
                            letterSpacing: "0.2rem",
                            fontSize: "0.8rem",
                          },
                          borderRadius: 1,
                          "&::placeholder": {
                            fontSize:{xs:"1rem",md:"1.3rem"},
                            color: 'black'
                          }   
                        
                        }}
                      />
                    )}
                  />
                 
              
                </Grid>
                <Grid item xs = {12} md={4.1}>
                  <FormTextField
                    container={TextField}
                    name="Location"
                    placeholder="Location"
                    type="text"
                    fullWidth={false}
                    sx={{
                      borderRadius: 1,
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
                      '&::placeholder': {
                        fontSize:{xs:"1rem",md:"1.3rem"},
                         color: 'black'
                       }
                    }}
                  />
                </Grid>
                </Grid>
              </Grid>

              <Grid item xs={5} sx={{ mt: "-250px" , display:{xs:"none" , md:'block'}}}>
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
                  marginTop: {xs:"15px",md:"-100px"},
                  ml: {xs:"80px",md:"350px"},
                  mb:{xs:10,md:20},
                  backgroundColor: "secondary.dark",
                  // width: "20vw",
                  color: "#fff",
                  // display: "flex",
                  // justifyContent: "center",
                  // gap:"1.2rem",

                  "&:hover": {
                    color: "#000",
                    border: "1px solid blue",
                    // letterSpacing: "0.2rem",
                    // fontSize: "1rem",
                  },
                }}
              >
                <SearchIcon /> Find Negotiated rates
              </Buttoncomponent>
              </Grid>
             
            </Grid>

            <Card
              raised
              sx={{
                backgroundColor: "RGB(217 229 251)",
                padding: {md:"10px"},
                marginTop: {md:"5px"},
                height: {md:"35em"},
                marginBottom: {md:"80px"},
              }}
            >
              <Grid container sx={{ padding: {md:"10px"},mb: "30px", ml:{xs:"-20px"}}}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  
                >
                  <Typography
                    // variant={{md:"h3"}}
                    sx={{   fontSize:{xs:"1.8rem",sm:"2rem",md:"4rem"},color: "#728AB7", padding: "10px", mb: "40px" }}
                  >
                    Products
                  </Typography>
                </Grid>

                <Grid
                  container
                  // direction="row"
                  justifyContent="center"
                 alignItems="center"
                 
                  spacing={{xs:1, md:30}}
                >
                  <Grid item xs={12} md={4} >
                    <Card
                      raised
                      sx={{
                        display: "flex",
                         flexDirection:"column" ,
                        justifyContent: "center",
                        alignItems: "center",
                        // padding: "10px",
                        height: "15em",
                        ml:{xs:"3rem",md:0}                   

                        // ,width:"18em"
                      }}
                    >
                      <CardMedia
                        sx={{ width: "100px", 
                        height: "90px",
                    
                      }}
                        component="img"
                        image={dashboardicon}
                        title="payer dashboard"
                        
                      />
                      <CardContent>
                        <Typography
                          // variant="h6"
                          color="textSecondary"
                          sx={{ textAlign: "center",fontSize:{xs:"1 rem",md:"1.2rem"} }}
                        >
                          Dashboards for Payer<br></br> negotiated rates
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4} justifyContent={"center"}alignItems={"center"}>
                    <Card
                      raised
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        // padding: "10px",
                        ml:{xs:"3rem",md:0},
                        height: "15em",
                        // mb: "30px",
                       
                      }}
                    >
                      <CardMedia
                        sx={{ 
                          width: "100px", 
                      
                        // height: "90px",
                        
                      }}
                        component="img"
                        image={dashboardicon}
                        title="payer dashboard"
                      />
                      <CardContent>
                        <Typography
                          // variant="h6"
                          color="textSecondary"
                          sx={{ textAlign: "center",fontSize:{xs:"1 rem",md:"1.2rem"} }}
                        >
                          Customized Rate report
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Card>




            <Grid container sx={{ padding: "10px" }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                item
                sx={{ mb: "20px" }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "#4D77FF", fontWeight: "bold", padding: "5px" }}
                >
                  Providers
                </Typography>
                <Typography
                  // variant="h3"
                  sx={{
                    color: "#728AB7",
                    padding: "5px",
                    letterSpacing: "0.2rem",
                    textAlign:"center",
                    fontSize:{xs:"1.8rem",sm:"2rem",md:"4rem"}
                  }}
                >
                  HELP PATIENTS FIND YOU
                </Typography>
                <Typography
                  sx={{ padding: "10px", fontSize: "1rem", mt: "15px" }}
                >
                  Use our free service to manage your price listing
                </Typography>
              </Grid>
              <Grid
                container
                direction={{md:"row"}}
                // flexWrap={"wrap"}
                // justifyContent="center"
                // alignItems="center"
                spacing={3}
        
              >
                <Grid item xs = {10} md={3} justifyContent={"center"} alignItems={"center"}>
                  <Link
                    to="/provider/login" state={{data:data}}
                   
                    style={{ textDecoration: "none" }}
                    // onClick={(e) => clickHandler(e)}
                  >
                    <Card
                      raised
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "5px",
                        ml:{xs:5,md:0},
                        height: {xs:"8em",md:"15em"},
                      }}
                    >
                      <CardMedia
                        sx={{ padding:{xs:"5px"},width: {xs:"40px",md:"100px"}, height: {md:"90px"} }}
                        component="img"
                        image={emergency}
                        title="emergency"
                      />
                      <CardContent>
                        <Typography
                          // variant="h6"
                          color="textSecondary"
                          sx={{ textAlign: "center",fontSize:{xs:"1 rem",md:"1.6rem"} }}
                        >
                          Urgent care
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
                <Grid item xs ={10} md={3}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/provider/login"
                    state={{data:data1}}
                  >
                    <Card
                      raised
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "5px",
                        ml:{xs:5,md:0},
                        height: {xs:"8em",md:"15em"},
                      }}
                    >
                      <CardMedia
                         sx={{ padding:{xs:"5px"},width: {xs:"60px",md:"100px"}, height: {md:"90px"} }}
                        component="img"
                        image={dentallogo}
                        title="dentalcarelogo"
                      />
                      <CardContent>
                        <Typography
                          // variant="h6"
                          color="textSecondary"
                          sx={{ textAlign: "center",fontSize:{xs:"1 rem",md:"1.6rem"} }}
                        >
                          Dental care
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
                <Grid item xs ={10} md={3}>
                  <Link
                    style={{ textDecoration: "none" }}
                    
                    to="/provider/login"
                    state={{data:data2}}
                  >
                    <Card
                      raised
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        ml:{xs:5,md:0},
                        padding: "5px",
                        height: {xs:"8em",md:"15em"},
                      }}
                    >
                      <CardMedia
                       sx={{ padding:{xs:"5px"},width: {xs:"60px",md:"100px"}, height: {md:"90px"} }}
                        component="img"
                        image={lab}
                        title="lab"
                      />
                      <CardContent>
                        <Typography
                          // variant="h6"
                          color="textSecondary"
                          sx={{ textAlign: "center",fontSize:{xs:"1 rem",md:"1.6rem"} }}
                        >
                          Labs
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
                <Grid item xs ={10} md={3}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/provider/login"
                    
                    state={{data:data3}}
                  >
                    <Card
                      raised
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "5px",
                        ml:{xs:5,md:0},
                        height: {xs:"8em",md:"15em"},
                      }}
                    >
                      <CardMedia
                        sx={{ padding:{xs:"5px"},width: {xs:"80px",md:"100px"}, height: {md:"90px"} }}
                        component="img"
                        image={care}
                        title="care"
                      />
                      <CardContent>
                        <Typography
                          // variant="h6"
                          color="textSecondary"
                          sx={{ textAlign: "center",fontSize:{xs:"1 rem",md:"1.6rem"} }}
                        >
                          others
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Box
              sx={{
                backgroundColor: "RGB(217 229 251)",
                height: "10em",
                mt: "50px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  fontWeight: "bold",
                  fontSize: "30px",
                  padding: "50px",
                }}
              >
                Care<Box sx={{ color: "#4D77FF" }}>Cadet</Box>
              </Box>
            </Box>
          </Box>
        </Form>)}
      </Formik>
    // </Box>
  );
};

export default Providerhomepage;
