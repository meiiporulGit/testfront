import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { TextField, Box, Typography, Grid, Paper,Autocomplete,
  AutocompleteRenderInputParams,
  createFilterOptions } from "@mui/material";
import axios from "axios";

import FormTextField from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";

import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { axiosPrivate, baseURL } from "../../axios/axios";
import Pricelistlandingpage from "./pricelistlandingpage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorProps from "../../Components/Errorprops";

interface InitialValues {
  Organisationid: string;
  ServiceCode: string;
  DiagnosisTestorServiceName: string;
  OrganisationPrices?: string;
  FacilityName:string;
  FacilityNPI?: string;
  FacilityPrices: string;
}

const CreateServicethroFacility = () => {

 
  const [info,setInfo]=useState([])
  console.log(info,'info')
  const select = useAppSelector((state) => state.providerAuth.login);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const Organisationid = useAppSelector((state) => state.providerOrganization.orgEditData);
  const facilityinput = useAppSelector(
    (state) => state.providerService.serviceData)
  console.log(facilityinput.facilityName, "ggg")
  const initialValues: InitialValues = {
    Organisationid: "",
    ServiceCode: "",
    DiagnosisTestorServiceName: "",
    OrganisationPrices: "",
    FacilityNPI: "",
    FacilityName:"",
    FacilityPrices: "",
  };
  const CustomPaper = (props:any) => {
    return <Paper elevation={8} sx={{backgroundColor:"#DCF0FA",color:"black"}}{...props} />;
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
          console.log("info",info)
        
     
      })
      }
      fetchUsers()
    }, [])

  const onSubmit = (values: InitialValues, actions: any) => {
    const servicedata = {
      Organisationid: Organisationid[0].organizationID,
      ServiceCode: values.ServiceCode,
      DiagnosisTestorServiceName: values.DiagnosisTestorServiceName,
      OrganisationPrices: values.OrganisationPrices,
      FacilityNPI: facilityinput.facilityNPI,
      FacilityName:facilityinput.facilityName,
      FacilityPrices: values.FacilityPrices,
    };
  
    axiosPrivate.post("/service/createservice", servicedata).then((res) => {
      toast.success(res.data.message)
      actions.resetForm({
        values: initialValues,
      });
      navigate("/provider/facility/pricelistlanding");
    }).catch(err=>{
      toast.error(err.message)
    })
  };

  const validationSchema = Yup.object().shape({
    ServiceCode: Yup.string().required("Service Code is required"),
    DiagnosisTestorServiceName: Yup.string().required("Service Name is required"),
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
                  name="serviceCode"
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
             fullWidth={true}
             value={values.ServiceCode}
              onChange={(e: any, value: any) => {
            
                
                console.log("value",value.Code)
               
               setFieldValue("ServiceCode",value !== null ? value.Code :"");
               setFieldValue("DiagnosisTestorServiceName",value !== null ? value.DiagnosisTestorServiceName :"");
             
                             }}
                            
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
                placeholder="OrganisationPrices"
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

            {/* <Grid item xs={12} >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  // m: "0.5rem 0 0.2rem 0",
                  mb: "0.3rem",
                }}
              >
                Facility Name
              </Typography>
              <FormTextField
                container={TextField}
                label="Facility Name"
                name="FacilityName"
                placeholder="FacilityName"
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
{/* 
            <Grid item xs={12} >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  // m: "0.5rem 0 0.2rem 0",
                  mb: "0.3rem",
                }}
              >
                Facility NPI
              </Typography>
              <FormTextField
                container={TextField}
                label="Facility NPI"
                name="FacilityNPI"
                autoComplete="text"
                placeholder="FacilityNPI"
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
                Facility Prices <Typography display="inline" sx={{color:"red"}}>*</Typography>
              </Typography>
              <FormTextField
                container={TextField}
                label="Facility Prices"
                name="FacilityPrices"
                placeholder="Facility Prices"
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
                  "& .MuiAutocomplete-popupIndicator": { transform: "none" }                  
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
          </Grid>
        </Form>
)}
      </Formik>
    </Paper>
  );
};

export default CreateServicethroFacility;
