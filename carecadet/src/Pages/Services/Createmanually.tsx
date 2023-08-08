import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { TextField, Box, Typography, Grid, Paper ,Autocomplete,
  AutocompleteRenderInputParams,
  createFilterOptions} from "@mui/material";
import axios from "axios";

import FormTextField from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import SelectField from "../../Components/Select";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { axiosPrivate, baseURL } from "../../axios/axios";
import Pricelistlandingpage from "./pricelistlandingpage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorProps from "../../Components/Errorprops";
import { facilityInfo } from "../../Redux/ProviderRedux/facilitySlice";
interface InitialValues {
  Organisationid: string;
  ServiceCode: string;
  DiagnosisTestorServiceName: string;
  OrganisationPrices?: string;
  FacilityNPI?: string;
  FacilityName?: string;
  FacilityPrices: string;
}


const CreateService = () => {
  const facilityinput = useAppSelector(
    (state) => state.providerService.facilityData
  );
  console.log("Facilityinput",facilityinput)
  const [checkInfo, setCheckInfo] = useState<any>([])
  const [query,setQuery] = useState([]);
  console.log(query,'q')
  const [info,setInfo]=useState([])
  console.log(info,'query')
  const [disabled, setDisabled] = useState<boolean>(false)
  const select = useAppSelector((state) => state.providerAuth.login);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const Organisationid = useAppSelector((state) => state.providerOrganization.orgEditData);
  const initialValues: InitialValues = {
    Organisationid: "",
    ServiceCode: "",
    DiagnosisTestorServiceName: "",
    OrganisationPrices: "",
    FacilityNPI: "",
    FacilityName: "",
    FacilityPrices: "",
  };

  const OPTIONS_LIMIT = 10;
  const defaultFilterOptions = createFilterOptions();
  
  const filterOptions = (options:any, state:any) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };
    useEffect(() => {
  
      const fetchUsers = async() =>{
        await axiosPrivate.get(`/service/findServiceCode`)
        .then (res => {setInfo(res.data);
        setQuery(res.data)})
      }
      fetchUsers()
    }, []);

    // useEffect(() => {
    //   const fetchFacilityNPI = async () => {
    //     await axiosPrivate.get(`/facility/findfacilityNPI`)
    //       .then((res) => {
    //         console.log(res.data, 'nppes')
    //         //  dispatch(nppesInfo(res.data))
    //         setCheckInfo(res.data)
    //       })
    //       .catch((e) => console.log(e));
    //     // .then (res => {setInfo(res.data);
    //     // setQuery(res.data)})
    //   }
    //   fetchFacilityNPI()
  
    // }, [])

    // const filterOptions1 = (options:any, state:any) => {
    //   return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
    // };
      // useEffect(() => {
    
      //   const fetchUsers= async() =>{
      //     await axiosPrivate.get(`/service/findDiagnosisTestorServiceName`)
      //     .then (res => {setInfo(res.data);
      //     setQuery(res.data)})
      //   }
      //   fetchUsers()
      // }, [])
    

  const onSubmit = (values: InitialValues, actions: any) => {
    console.log("test")
    const servicedata = {
      Organisationid: Organisationid[0].organizationID,
      ServiceCode: values.ServiceCode,
      DiagnosisTestorServiceName: values.DiagnosisTestorServiceName,
      OrganisationPrices: values.OrganisationPrices,
      FacilityNPI: values.FacilityNPI,
      FacilityName: values.FacilityName,
      FacilityPrices: values.FacilityPrices,
    };
    // alert(JSON.stringify(servicedata, null, 2));
    axiosPrivate.post("/service/createservice", servicedata).then((res) => {
     toast.success(res.data.message)
      actions.resetForm({
        values: initialValues,
      });
      navigate("/provider/service/listservice");
    }).catch(err=>{
      toast.error(err.message)
    })
  };

  const CustomPaper = (props:any) => {
    return <Paper elevation={8} sx={{backgroundColor:"#DCF0FA",color:"black"}}{...props} />;
  };

  const validationSchema = Yup.object().shape({
    ServiceCode: Yup.string().required("Service Code is required"),
    DiagnosisTestorServiceName: Yup.string().required("Service Name is required"),
    FacilityName: Yup.string().required("Facility Name is required"),
    FacilityNPI: Yup.string().required("FacilityNPI is required").matches(/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/,"only numbers"),
    FacilityPrices: Yup.string().required("Facility price is required").matches(/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/,"only numbers"),
 
  });


  return (
    <Paper
      elevation={9}
      sx={{
        backgroundColor: "primary.light",
        padding: "1.5rem",
        borderRadius: "15px",
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >

{({ handleChange, setFieldValue,values}) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                mb={"0.5rem"}
                sx={{
                  backgroundColor: "#B4C8FC",
                  padding: "0.7rem",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
              >
                Add Service Price
              </Typography>
            </Grid>
            {/* {servicepriceData.map((d, i) => (
              <Grid item xs={d.xs} key={i}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                  {d.label}
                </Typography>
                <FormTextField
                  container={TextField}
                  name={d.name}
                  placeholder={d.placeholder}
                  type={d.type}
                  fullWidth={true}
                  sx={{
                    "&::placeholder": {
                      // color: "green",
                      letterSpacing: "0.2rem",
                      // fontSize: "1rem",
                    },
                  }}
                />
              </Grid>
            ))} */}
<Grid item xs={12}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                 DiagnosisTest or Service Name <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <Field
               label="Service Name"
               name="DiagnosisTestorServiceName"
              component={Autocomplete}
               options = {info}
               loading={info.length === 0}
               PaperComponent={CustomPaper}
filterOptions = {filterOptions}
               getOptionLabel={(option: any) => option.DiagnosisTestorServiceName || option}         
              freeSolo    
             
              onChange={(e: any, value: any) => {
                setFieldValue("ServiceCode",value !== null ? value.Code :"");
               setFieldValue("DiagnosisTestorServiceName",value !== null ? value.DiagnosisTestorServiceName :"");
                
                             }}
                             value={values.DiagnosisTestorServiceName}
               renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  name="DiagnosisTestorServiceName"
                  label="Search Service Name"
                  onChange={handleChange}
                   variant="outlined"
                   helperText={
                    <ErrorMessage name="DiagnosisTestorServiceName">
                      {(error) => <ErrorProps>{error}</ErrorProps>}
                    </ErrorMessage>}
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
                      fontSize: "0.8rem",
                    },
                    ".MuiInputLabel-shrink": {
                      letterSpacing: 0,
                    },
                    "& .MuiAutocomplete-popupIndicator": { transform: "none" }                  
                  }}
                />
              )}
            />

              </Grid>

            <Grid item xs={12}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                 Service Code <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <Field
              name="ServiceCode"
              component={Autocomplete}
               options = {info}
               loading={info.length === 0}
               PaperComponent={CustomPaper}
filterOptions = {filterOptions}
               getOptionLabel={(option: any) => option.Code || option}         
              freeSolo    
             
              onChange={(e: any, value: any) => {
                setFieldValue("ServiceCode",value !== null ? value.Code :"");
               setFieldValue("DiagnosisTestorServiceName",value !== null ? value.DiagnosisTestorServiceName :"");
                
                             }}
                             value={values.ServiceCode}
               renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  name="ServiceCode"
                  label="Search Service Code"
                  onChange={handleChange}
                   variant="outlined"
                   helperText={
                    <ErrorMessage name="ServiceCode">
                      {(error) => <ErrorProps>{error}</ErrorProps>}
                    </ErrorMessage>}
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
                      fontSize: "0.8rem",
                    },
                    ".MuiInputLabel-shrink": {
                      letterSpacing: 0,
                    },
                    "& .MuiAutocomplete-popupIndicator": { transform: "none" }                  
                  }}
                />
              )}
            />

              </Grid>

              {/* <Grid item xs={12} sm={4}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  // m: "0.5rem 0 0.2rem 0",
                  mb: "0.3rem",
                }}
              >
                Description
              </Typography>
              <FormTextField
                container={TextField}
                label="Description"
                name="Description"
                placeholder="Description"
                type="text"
                fullWidth={true}
                sx={{
                  ".MuiFormLabel-root ": {
                    letterSpacing: "0.2rem",
                    fontSize: "0.8rem",
                  },
                  ".MuiInputLabel-shrink": {
                    letterSpacing: 0,
                  },
                }}
              />
            </Grid> */}

              {/* <Grid item xs={12} >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  // m: "0.5rem 0 0.2rem 0",
                  mb: "0.3rem",
                }}
              >
                DiagnosisTest or Service Name
              </Typography>
              <FormTextField
                container={TextField}
                label="DiagnosisTest or ServiceName"
                name="DiagnosisTestorServiceName"
                component={Autocomplete}
                placeholder="DiagnosisTestorServiceName"
                type="text"
                fullWidth={true}
                
              onChange={(e: any, value: any) => {
                setFieldValue("ServiceCode",value !== null ? value.Code :"");
               setFieldValue("DiagnosisTestorServiceName",value !== null ? value.DiagnosisTestorServiceName :"");
                
                             }}
               
                sx={{
                  ".MuiFormLabel-root ": {
                    letterSpacing: "0.2rem",
                    fontSize: "0.8rem",
                  },
                  ".MuiInputLabel-shrink": {
                    letterSpacing: 0,
                  },
                }}
              />
            </Grid> */}


            {/* <Grid item xs={12} >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  // m: "0.5rem 0 0.2rem 0",
                  mb: "0.3rem",
                }}
              >
                Organisation Prices
              </Typography>
              <FormTextField
                container={TextField}
                label="OrganisationPrices"
                name="OrganisationPrices"
                autoComplete="text"
                placeholder="OrganisationPrices"
                type="text"
                fullWidth={true}
                sx={{
                  ".MuiFormLabel-root ": {
                    letterSpacing: "0.2rem",
                    fontSize: "0.8rem",
                  },
                  ".MuiInputLabel-shrink": {
                    letterSpacing: 0,
                  },
                }}
              />
            </Grid> */}



            <Grid item xs={12} >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  mb: "0.5rem",
                }}
              >
                Facility NPI <Typography display="inline" sx={{color:"red"}}>*</Typography>
              </Typography>
              {/* <FormTextField
                container={TextField}
                label="Facility NPI"
                name="FacilityNPI"
                placeholder="Facility NPI"
                autoComplete="text"
                type="text"
                fullWidth={true}
                sx={{
                  ".MuiFormLabel-root ": {
                    letterSpacing: "0.2rem",
                    fontSize: "0.8rem",
                  },
                  ".MuiInputLabel-shrink": {
                    letterSpacing: 0,
                  },
                }}
              /> */}
             <Field
                  name="FacilityNPI"
                  component={Autocomplete}
                  options = {facilityinput}
                  loading={facilityinput.length === 0}
                  PaperComponent={CustomPaper}
                  filterOptions={filterOptions}
                  // loading={checkInfo.length === 0}
                  // options={checkInfo}
                  
                  getOptionLabel={(option: any) => option.facilityNPI || option}
                  freeSolo
                  onChange={(e: any, value: any) => {
                    { value !== null ? setDisabled(true) : setDisabled(false) }
                    console.log(value, "imanualentervalue");
                    setFieldValue("FacilityName", value !== null ? value.facilityName : "");
                    setFieldValue("FacilityNPI", value !== null ? value.facilityNPI : "");
                 
                  }}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField
                      {...params}
                      name="FacilityNPI"
                      label="Facility NPI"
                      onChange={handleChange}
                      variant="outlined"
                      helperText={
                        <ErrorMessage name="FacilityNPI">
                          {(error) => <ErrorProps>{error}</ErrorProps>}
                        </ErrorMessage>}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {/* {info.length === 0 ? <CircularProgress color="inherit" size={20} /> : null} */}
                            {/* {checkInfo.length === 0 ? <CircularProgress color="inherit" size={20} /> : null} */}
                            {params.InputProps.endAdornment}
                          </React.Fragment>),
                      }}
                      sx={{
                        ".MuiFormLabel-root ": {
                          letterSpacing: "0.2rem",
                          fontSize: "0.8rem",
                        },
                        ".MuiInputLabel-shrink": {
                          letterSpacing: 0,
                        },
                        "& .MuiAutocomplete-popupIndicator": { transform: "none" }

                        // ".MuiInputBase-root":{
                        //   borderRadius: "50px",
                        //   // height:"40px"
                        // },

                      }}
                    />
                  )}
                />
            </Grid>
            <Grid item xs={12} >
              <Typography
              sx={{
                fontSize: "1.2rem",
                mb: "0.5rem",
              }}
              >
                Facility Name <Typography display="inline" sx={{color:"red"}}>*</Typography>
              </Typography>
              <Field
                  as={TextField}
                  label="Facility Name"
                  name="FacilityName"
                  placeholder="FacilityName"
                  type="text"
                  fullWidth={true}
                  autoComplete="new-country-area"
                  helperText={
                    <ErrorMessage name="FacilityName">
                      {(error) => <ErrorProps>{error}</ErrorProps>}
                    </ErrorMessage>
                  }
                  inputProps={{ readOnly: disabled }}
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
                      fontSize: "0.8rem",
                    },
                    ".MuiInputLabel-shrink": {
                      letterSpacing: 0,
                    },
                    //  ".Mui-focused":{
                    //     letterSpacing: "0.2rem"
                    //  }
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  mb: "0.5rem",
                }}
              >
                Facility Prices <Typography display="inline" sx={{color:"red"}}>*</Typography>
              </Typography>
              <FormTextField
                container={TextField}
                label="Facility Prices"
                name="FacilityPrices"
                placeholder="Facility Prices"
                type="text"
                autoComplete="text"
                fullWidth={true}
                sx={{
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

            <Grid container item xs={12} justifyContent="right">
              <Buttoncomponent
                type="submit"
                size="large"
                fullWidth={false}
                variant="contained"
                sx={{
                  backgroundColor: "secondary.dark",
                  width: "10vw",
                  color: "#fff",
                  "&:hover": {
                    color: "secondary.dark",
                    border: "1px solid blue",
                    // letterSpacing: "0.2rem",
                    // fontSize: "1rem",
                  },
                }}
              >
                Submit
              </Buttoncomponent>
        </Grid>
       
        </Form>
)}
      </Formik>
    </Paper>
  );
};

export default CreateService;
