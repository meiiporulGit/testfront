 import React from "react";
import { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage, Field, FormikProps } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  Select,
  IconButton,
  Button,
  Autocomplete,
  AutocompleteRenderInputParams,
  createFilterOptions,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';
//redux store
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { nppesInfo } from '../../Redux/ProviderRedux/facilitySlice';
import { facilityTypeInfo } from "../../Redux/ProviderRedux/facilitySlice";

//components
import FormTextField from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import SelectField from "../../Components/Select";
import ErrorProps from "../../Components/Errorprops";
import { axiosPrivate, baseURL } from "../../axios/axios";
import { tabValueNav } from "../../Redux/ProviderRedux/LoginSlice";

interface forminitialValues {
  providerID: string;
  organizationID: string,
  facilityNPI?: string | number;
  facilityName: string;
  // facilityType:string;
  // othersFacilityType:string;
  MainfacilityType: string;
  OthersfacilityType: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  contact: string;
  email: string;
  latitude: string;
  longitude: string;
}

export default function CreateFacility() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [checkInfo, setCheckInfo] = useState<any>([])
  const [disabled, setDisabled] = useState<boolean>(false)
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const data = useAppSelector(state => state.providerAuth.login);
  console.log("datafaciltiy", data);
  const orgID = useAppSelector((state) => state.providerOrganization.orgEditData);
  const initialValues: forminitialValues = {
    providerID: data.userID,
    organizationID: orgID[0].organizationID,
    facilityNPI: "",
    facilityName: "",
    // facilityType:"",
    // othersFacilityType:"",
    MainfacilityType: "",
    OthersfacilityType: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    contact: "",
    email: "",
    latitude: "",
    longitude: ""
  };

// const options = [
//   { value: "1- Primary care", item: "1- Primary care" },
//   { value: "2- Urgent Care", item: "2- Urgent Care" },
//   { value: "3- Dentist Office", item: "3- Dentist Office" },
//   {value:"4- Imaging and Laboratory",item: "4- Imaging and Laboratory"},
//   {value:"5- Hospital",item:"5- Hospital"},
//   {value:"6- Others",item:"6- Others"}
// ];
  useEffect(() => {
    const fetchFacilityNPI = async () => {
      await axiosPrivate.get(`/facility/findfacilityNPI`)
        .then((res) => {
          console.log(res.data, 'nppes')
          //  dispatch(nppesInfo(res.data))
          setCheckInfo(res.data)
        })
        .catch((e) => console.log(e));
      // .then (res => {setInfo(res.data);
      // setQuery(res.data)})
    }
    fetchFacilityNPI()

  }, [])
  useEffect(() => {
    const getFacilityType = async () => {
      await axiosPrivate.get(`/facility/findfacilityType`)
        .then((res) => {
          console.log(res.data, 'facilityType')
          dispatch(facilityTypeInfo(res.data))
        })
        .catch((e) => console.log(e));
    }
    getFacilityType()
  }, [])

  const OPTIONS_LIMIT = 10;
  const defaultFilterOptions = createFilterOptions();

  const filterOptions = (options: any, state: any) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };
  //  const info = useAppSelector((state) => state.providerFacility.nppes);
  const options = useAppSelector((state) => state.providerFacility.facilityTypedata)
  console.log(options, 'options')
  const validationSchema = Yup.object().shape({
    facilityNPI: Yup.string().required("FacilityNPI is required").matches(/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, "only numbers").test("len", " Invalid NPI", (val: any) => val && val.length === 10),
    facilityName: Yup.string().required("Facility Name is required"),
    // facilityType: Yup.string().required("Facility Type is required"),
    //facilityTypeOthers: Yup.string().required("Required"),
    MainfacilityType:Yup.string().required("Facility Type is Required"),
    addressLine1: Yup.string().required("Street Address1 is required"),
    // addressLine2: Yup.string().required("Required field"),
    city: Yup.string().nullable().required("City is required").matches(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/, 'City name should be alpha-characters'),
    zipCode: Yup.string()
      .required("Zipcode is required")
      .test("len", (val: any) => val && val.length === 5)
      .matches(/^[A-Za-z0-9]+$/, "Zipcode should be alpha-numeric characters"),
    state: Yup.string().nullable().required("State is required").matches(/^[A-Za-z -]+$/, 'State name should be alpha-characters').min(2, 'State must be at least 2 characters.')
    .max(100, 'State has a maximum limit of 100 characters.'),
    contact: Yup.string().required("Phone is required").matches(/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, "only numbers").test("len", " Invalid Contact no", (val: any) => val && val.length === 10),
    email: Yup.string().email().required("Email is required")
  });
 

  const onSubmit = (values: forminitialValues, actions: any) => {
    setIsLoading(true)
    const facilitydata = {
      providerID: values.providerID,
      organizationID: values.organizationID,
      facilityNPI: values.facilityNPI,
      facilityName: values.facilityName,
      // facilityType: values.facilityType,
      // facilityType: values.facilityType === "6- Others" ? (values.othersFacilityType) : values.facilityType,
      facilityType:{
        MainfacilityType:values.MainfacilityType,
        OthersfacilityType:values.OthersfacilityType 
        // values.OthersfacilityType === "" ? values.MainfacilityType : values.OthersfacilityType
      },
      address: {
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
      },
      email: values.email,
      contact: values.contact,
      GPSCoordinate: {
        latitude: values.latitude,
        longitude: values.longitude
      }

    };
    // alert(JSON.stringify(facilitydata, null, 2));
    actions.resetForm({
      values: initialValues,
    });
    axiosPrivate
      .post(`/facility/createFacility`, facilitydata)
      .then((res) => {
        toast.success(res.data.message);
        console.log("resfacilitypost", res.data);
        setIsLoading(false)
        dispatch(tabValueNav(1));
        navigate("/provider/facility/viewFacility");
      })
      .catch((err) => {
        setIsLoading(false)
        toast.error(err.message);
      });
  };

  const CustomPaper = (props: any) => {
    return <Paper elevation={8} sx={{ backgroundColor: "#DCF0FA", color: "black" }}{...props} />;
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, values, setFieldValue }) => (

          <Form>
            <Grid container spacing={2} justifyContent={"center"}>
              <Grid item xs={12}>
                <Typography
                  mb={"0.3rem"}
                  sx={{
                    backgroundColor: "secondary.light",
                    padding: "0.7rem",
                    textAlign: "center",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Add Facility Information
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12}
              // style={{ marginLeft: "70%" }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
                  }}
                >
                  Search Facility NPI <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>

                <Field
                  name="facilityNPI"
                  component={Autocomplete}
                  filterOptions={filterOptions}
                  loading={checkInfo.length === 0}
                  options={checkInfo}
                  PaperComponent={CustomPaper}
                  getOptionLabel={(option: any) => option.facilityNPI || option}
                  freeSolo
                  onChange={(e: any, value: any) => {
                    { value !== null ? setDisabled(true) : setDisabled(false) }
                    console.log(value, "imanualentervalue");
                    setFieldValue("facilityName", value !== null ? value.facilityName : "");
                    setFieldValue("facilityNPI", value !== null ? value.facilityNPI : "");
                    // setFieldValue("facilityType", value !== null ? value.facilityType : "");
                    setFieldValue("addressLine1", value !== null ? value.addressLine1 : "");
                    setFieldValue("addressLine2", value !== null ? value.addressLine2 : "");
                    setFieldValue("city", value !== null ? value.city : "");
                    setFieldValue("state", value !== null ? value.state : "");
                    setFieldValue("zipCode", value !== null ? value.zipCode : "");
                    setFieldValue("latitude", value !== null ? value.latitude : "");
                    setFieldValue("longitude", value !== null ? value.longitude : "")
                  }}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField
                      {...params}
                      name="facilityNPI"
                      label="Search Facility NPI"
                      onChange={handleChange}
                      variant="outlined"
                      helperText={
                        <ErrorMessage name="facilityNPI">
                          {(error) => <ErrorProps>{error}</ErrorProps>}
                        </ErrorMessage>}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {/* {info.length === 0 ? <CircularProgress color="inherit" size={20} /> : null} */}
                            {checkInfo.length === 0 ? <CircularProgress color="inherit" size={20} /> : null}
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

              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
                  }}
                >
                  Facility Name <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <Field
                  as={TextField}
                  label="Facility Name"
                  name="facilityName"
                  placeholder="FacilityName"
                  type="text"
                  fullWidth={true}
                  autoComplete="new-country-area"
                  helperText={
                    <ErrorMessage name="facilityName">
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
              <Grid item xs={12} sm={6}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
                  }}
                >
                  Facility Type <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel sx={{ letterSpacing: "0.2rem", fontSize: "0.8rem", "&.MuiInputLabel-shrink": { letterSpacing: 0 } }}>Facility Type</InputLabel>
                  <Field as={Select} name="MainfacilityType" label="Facility Type">
                    {(options || []).map((select: any, index: any) => (
                      <MenuItem key={index + 1} value={select.facilityTypeId}>
                        {select.item}
                      </MenuItem>
                    ))}

                  </Field>

                  <ErrorMessage name="MainfacilityType">
                    {(error) => (
                      <ErrorProps >
                        {error}
                      </ErrorProps>
                    )}
                  </ErrorMessage>
                </FormControl>
                {values.MainfacilityType=== "FACT-6" ?
                  (<Field
                    as={TextField}
                    label="Enter Options for Others"
                    name="OthersfacilityType"
                    placeholder="Enter options for facility Type"
                    type="text"
                    fullWidth
                    autoComplete="new-country-area"
                    value = {values.OthersfacilityType}
                    sx={{
                      mt: "0.7rem",
                      ".MuiFormLabel-root ": {
                        letterSpacing: "0.2rem",
                        fontSize: "0.8rem",
                      },
                      ".MuiInputLabel-shrink": {
                        letterSpacing: 0,
                      },
                    }}
                  />
                  ) : null
                }
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
                  }}
                >
                  Street Address1 <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <Field
                  as={TextField}
                  label="Street Address1"
                  name="addressLine1"
                  placeholder="Street Address1"
                  type="text"
                  fullWidth={true}
                  autoComplete="new-country-area"
                  helperText={
                    <ErrorMessage name="addressLine1">
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
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
                  }}
                >
                  Street Address2
                </Typography>
                <Field
                  as={TextField}
                  label="Street Address2"
                  name="addressLine2"
                  placeholder="Street Address2"
                  type="text"
                  fullWidth={true}
                  autoComplete="new-country-area"
                  helperText={
                    <ErrorMessage name="addressLine2">
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
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
                  }}
                >
                  City <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <Field
                  as={TextField}
                  label="City"
                  name="city"
                  placeholder="City"
                  type="text"
                  fullWidth={true}
                  autoComplete="new-country-area"
                  helperText={
                    <ErrorMessage name="city">
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
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
                  }}
                >
                  State <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <Field
                  as={TextField}
                  label="State"
                  name="state"
                  placeholder="State"
                  type="text"
                  fullWidth={true}
                  autoComplete="new-country-area"
                  helperText={
                    <ErrorMessage name="state">
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
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
                  }}
                >
                  ZipCode <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <Field
                  as={TextField}
                  label="ZipCode"
                  name="zipCode"
                  placeholder="ZipCode"
                  type="text"
                  fullWidth={true}
                  autoComplete="new-country-area"
                  helperText={
                    <ErrorMessage name="zipCode">
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
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
                  }}
                >
                  Phone <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <FormTextField
                  container={TextField}
                  label="Phone"
                  name="contact"
                  placeholder="Phone"
                  type="text"
                  fullWidth={true}
                  autoComplete="new-country-area"
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
              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.3rem",
                  }}
                >
                  Email <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <FormTextField
                  container={TextField}
                  label="Email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  fullWidth={true}
                  autoComplete="new-country-area"
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
                  disable={isLoading}
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
    </Box>
  );
}
