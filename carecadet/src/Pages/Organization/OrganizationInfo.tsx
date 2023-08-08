import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  AutocompleteRenderInputParams,
  createFilterOptions,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import FormTextField from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";

import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { axiosPrivate } from "../../axios/axios";
import OrganizationLandingView from "./OrganizationLandingView";
import { useNavigate } from "react-router-dom";
import ErrorProps from "../../Components/Errorprops";
import { storeLoginInfoupdate } from "../../Redux/ProviderRedux/LoginSlice";
// import FileUploadService from './Fileupload/FileUpload';
interface InitialValues {
  file: any;
  organizationInformation: {
    providerID: string;
    organizationName: string;
    streetAdd1: string;
    streetAdd2: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    Email: string;
  };
  contactPersonInformation: {
    firstName: string;
    lastName: string;
    role: string;
    contactno: string;
    email: string;
  };
}

const OrganizationInfo = () => {
  const dispatch = useAppDispatch();
  const dataLogin = useAppSelector((state) => state.providerAuth.login);
  const navigate = useNavigate();

  const [currentFile, setCurrentFile] = useState<any>();
  const [checked, setChecked] = React.useState<boolean>(false);
  const [autoCompleteData, setAutoCompleteData] = React.useState<any>([])
  const [isLoading,setIsLoading]=useState<boolean>(false)

  const [fileName, setFileName] = useState<any>("");

  const fileInput = useRef<any>();
  // console.log(currentFile,'single');

  useEffect(() => {
    axiosPrivate.get("/organization/cityStateList").then((res) => {
      console.log("citystate", res.data.data)
      setAutoCompleteData(res.data.data)

    })
  }, [])

  const CustomPaper = (props: any) => {
    return <Paper elevation={8} sx={{ backgroundColor: "#DCF0FA", color: "black" }}{...props} />;
  };

  const OPTIONS_LIMIT = 10;
  const defaultFilterOptions = createFilterOptions();

  const filterOptions = (options: any, state: any) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  const initialValues: InitialValues = {
    organizationInformation: {
      providerID: "",
      organizationName: "",
      streetAdd1: "",
      streetAdd2: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      Email: dataLogin.email,
    },
    contactPersonInformation: {
      firstName: dataLogin.firstName,
      lastName: dataLogin.lastName,
      role: dataLogin.userType,
      contactno: "",
      email: dataLogin.email,
    },
    file: "",
  };
  const [errorMessage, setErrorMessage] = useState("")
  const [zipDisable, setZipDisable] = useState(false)

  const SingleFileChange = () => {
    setCurrentFile(fileInput.current.files[0]);
    setFileName(fileInput.current.files[0].name);
    console.log(currentFile, 'currentfile')
    var file = document.getElementById("upload-photo");
    if (/\.(jpe?g|png|gif)$/i.test(fileInput.current.files[0].name) === false) {
      setErrorMessage("Unsupported File Format (Allowed PNG,JPG,JPEG,gif)")
    } else {
      setErrorMessage("")
    }
    // { alert("Uploaded file has unsupported format!"); } 


  };

  // const onSubmit = async (values: InitialValues, actions: any,) => {
  //   console.log(values,"checkValues")
  // }

  const onSubmit = async (values: InitialValues, actions: any,) => {
    setIsLoading(true)
    console.log(values,"checkValues")
    const orgprovider = {
      providerID: dataLogin.userID,
      firstName: values.contactPersonInformation.firstName,
      lastName: values.contactPersonInformation.lastName,
      role: values.contactPersonInformation.role,
      contact: values.contactPersonInformation.contactno,
      email: dataLogin.email,
    };
    // alert(JSON.stringify(orgprovider, null, 2));
    try {
      axiosPrivate
        .put("provider/updateProvider", orgprovider)
        .then((res) => {
          const updatelogininfo = {
            firstName: values.contactPersonInformation.firstName,
            lastName: values.contactPersonInformation.lastName
          }

        dispatch(storeLoginInfoupdate(updatelogininfo))
        toast.success(res.data.message);
        actions.resetForm({
          values: initialValues,
        });
        
        // navigate("/provider/facility/addFacility");
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err, "orgErr");
        toast.error(err.message);
      });
    } catch (err) { }

    let formData = new FormData();
    formData.append("file", currentFile);
    //  formData.append("file", fileName);
    console.log(formData, "formData");
    console.log(currentFile, "curr");
    console.log(values.file, 'imgfile')
    try {
      axiosPrivate
        .post("organization/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const orgdata = {
            providerID: dataLogin.userID,
            organizationName: values.organizationInformation.organizationName,
            orgImg: res.data.data ? res.data.data.filename : "",
            address: {
              addressLine1: values.organizationInformation.streetAdd1,
              addressLine2: values.organizationInformation.streetAdd2,
              city: values.organizationInformation.city,
              state: values.organizationInformation.state,
              zipCode: values.organizationInformation.zipCode,
            },
            email: values.organizationInformation.Email,
            contact: values.organizationInformation.phone,
            contactPerson: {
              firstName: values.contactPersonInformation.firstName,
              lastName: values.contactPersonInformation.lastName,
              role: values.contactPersonInformation.role,
              contact: values.contactPersonInformation.contactno,
              email: dataLogin.email,
            },
          };
          // alert(JSON.stringify(orgdata, null, 2));
          console.log(orgdata, "orgdata");
          axiosPrivate
            .post("/organization/createOrganization", orgdata)
            .then((res) => {
              toast.success(res.data.message);
              actions.resetForm({
                values: initialValues,
              });
              setIsLoading(false)
              navigate("/provider/facility/addFacility");
            })
            .catch((err) => {
              setIsLoading(false)
              console.log(err, "orgErr");
              toast.error(err.message);
            });
        })
        .catch((err) => {
          setIsLoading(false)
          console.log(err, "imgerr");
          toast.error(err.message);
        });
    } catch (err) {
      setIsLoading(false)
      throw err;
      // console.log(err, "err");
    }
  };

  const validationSchema = Yup.object().shape({
    organizationInformation: Yup.object().shape({
      organizationName: Yup.string().required("Organization Name is required"),
      streetAdd1: Yup.string().required("Address is required"),
      city: Yup.string()
        .required("City is required")
        .matches(/^[A-Za-z -]+$/, "City can only contain alphabets."),
      state: Yup.string()
        .required("State is required")
        .matches(/^[A-Za-z -]+$/, "State can only contain alphabets."),
      zipCode: Yup.string()
        .required("Zip Code is required")
        .matches(
          /^[A-Za-z0-9]+$/,
          "Zip Code can only contain alphabets and number"
        ),
      Email: Yup.string().required("Email is required").email("invalid email"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(
          /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/,
          "only numbers"
        )
        .test(
          "len",
          " Invalid Contact no",
          (val: any) => val && val.length === 10
        ),
    }),
    contactPersonInformation: Yup.object().shape({
      firstName: Yup.string()
        .required("First Name is a required field")
        .matches(/^[A-Za-z -]+$/, "First Name can only contain alphabets."),
      lastName: Yup.string()
        .required("Last Name is required")
        .matches(/^[A-Za-z -]+$/, "Last Name can only contain alphabets."),
      role: Yup.string()
        .required("Role is a required field")
        .matches(/[A-Za-z0-9]+$/, "Role can only contain alphabets and number"),
      contactno: Yup.string()
        .required("Contact is a required field")
        .matches(
          /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/,
          "only numbers"
        )
        .test(
          "len",
          "Invalid Contact no",
          (val: any) => val && val.length === 10
        ),
      email: Yup.string()
        .required("Email is a required field")
        .email("invalid email"),
    }),
  });

  const organizationData = [
    {
      xs: 12,
      md: 12,
      label: "Organization Name ",
      name: "organizationInformation.organizationName",
      placeholder: "Organization Name",
      type: "text",
    },
    {
      xs: 12,
      md: 6,
      label: "Street Address1 ",
      name: "organizationInformation.streetAdd1",
      placeholder: "Street Address1",
      type: "text",
    },
    // {
    //   xs: 12,
    //   md: 6,
    //   label: "Street Address2",
    //   name: "organizationInformation.streetAdd2",
    //   placeholder: "Street Address2",
    //   type: "text",
    // },
    // {
    //   xs: 12,
    //   md: 4,
    //   label: "City",
    //   name: "organizationInformation.city",
    //   placeholder: "City",
    //   type: "text",
    // },
    // {
    //   xs: 12,
    //   md: 4,
    //   label: "State",
    //   name: "organizationInformation.state",
    //   placeholder: "State",
    //   type: "text",
    // },
    // {
    //   xs: 12,
    //   md: 4,
    //   label: "Zip Code",
    //   name: "organizationInformation.zipCode",
    //   placeholder: "Zip Code",
    //   type: "text",
    // },
  ]
  const orgDetail2 = [
    {
      xs: 12,
      md: 4,
      label: "City *",
      name: "organizationInformation.city",
      placeholder: "City",
      type: "text",
    },
    {
      xs: 12,
      md: 4,
      label: "State *",
      name: "organizationInformation.state",
      placeholder: "State",
      type: "text",
    },
    {
      xs: 12,
      md: 6,
      label: "Phone *",
      name: "organizationInformation.phone",
      placeholder: "Phone Number",
      type: "text",
    },
    {
      xs: 12,
      md: 6,
      label: "Email *",
      name: "organizationInformation.Email",
      placeholder: "Email",
      type: "email",
    },
  ];
  const contactPersonData = [
    {
      xs: 12,
      md: 6,
      label: "First Name ",
      name: "contactPersonInformation.firstName",
      placeholder: "First Name",
      type: "text",
    },
    {
      xs: 12,
      md: 6,
      label: "Last Name ",
      name: "contactPersonInformation.lastName",
      placeholder: "Last Name",
      type: "text",
    },

    // {
    //   xs: 12,
    //   md: 6,
    //   label: "Role *",
    //   name: "contactPersonInformation.role",
    //   placeholder: "Role",
    //   type: "text",
    // },
    // {
    //   xs: 12,
    //   md: 6,
    //   label: "Contact *",
    //   name: "contactPersonInformation.contactno",
    //   placeholder: "Contact Number",
    //   type: "text",
    // },
    // {
    //   xs: 12,
    //   md: 12,
    //   label: "Email",
    //   name: "contactPersonInformation.email",
    //   placeholder: "Email",
    //   type: "email",
    // },
  ];

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
        {({ handleChange, setFieldValue, values }) => (
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
                  Organization Information
                </Typography>
              </Grid>
              <Grid xs={12}>
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="file"
                    type="file"
                    hidden
                    accept=".png,.jpg,.jpeg"
                    value={values.file}
                    ref={fileInput}
                    onChange={SingleFileChange}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    component="span"
                    sx={{ backgroundColor: "#B4C8FC", marginLeft: "1rem" }}
                  >
                    Upload profile image
                  </Button>

                  {/* <ErrorMessage name="file" /> */}

                </label>

                {errorMessage ? (errorMessage &&
                  <div style={{
                    textAlign: "left",
                    color: "red",
                    fontSize: "0.9rem",
                    marginTop: "0.6rem",
                  }}>{errorMessage}</div>) : (
                  <Box component="span" sx={{ marginLeft: "1rem" }}>
                    {fileName}
                  </Box>)}
              </Grid>

              {organizationData.map((org, i) => (
                <Grid item xs={org.xs} md={org.md} key={i}>
                  <Typography
                    // variant="h6"
                    sx={{
                      fontSize: "1.2rem",
                      mb: "0.5rem",
                    }}
                  >
                    {org.label} <Typography display="inline" sx={{color:"red"}}>*</Typography>
                  </Typography>
                  <FormTextField
                    container={TextField}
                    name={org.name}
                    placeholder={org.placeholder}
                    type={org.type}
                    fullWidth={true}
                    autoComplete="text"
                    // autoComplete="new-country-area"
                    sx={{
                      "&::placeholder": {
                        // color: "green",
                        letterSpacing: "0.2rem",
                        // fontSize: "1rem",
                      },
                    }}
                  />
                </Grid>
              ))}
<Grid item xs={12} md={6}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                 Street Address 2  
                </Typography>
                <Field
                  as={TextField}
                  name="organizationInformation.streetAdd2"
                  placeholder="Street Address2"
                  type="text"
                  fullWidth={true}
                  autoComplete="text"
                  
                  inputProps={{
                    sx: { "&::placeholder": {
                      // color: "green",
                      letterSpacing: "0.2rem",
                      // fontSize: "1rem",
                    },},
                  }}               
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                  Zip Code  <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>

                <Field
                          
              name="organizationInformation.zipCode"
              component={Autocomplete}
               options = {autoCompleteData}
               loading={autoCompleteData.length === 0}
               PaperComponent={CustomPaper}
              filterOptions = {filterOptions}
               getOptionLabel={(option: any) => option.ZIP_CODE || option}         
              freeSolo    
             fullWidth={true}
             value={values.organizationInformation.zipCode}
             
              onChange={(e: any, value: any) => {
            
                
           if(value===null){
            setZipDisable(false)
           }else{
            setZipDisable(true)
           }
               
               setFieldValue("organizationInformation.zipCode",value !== null ? value.ZIP_CODE :"");
               setFieldValue("organizationInformation.city",value !== null ? value.city :"");
               setFieldValue("organizationInformation.state",value !== null ? value.state :"");
             
                             }}
                            
               renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  helperText={<ErrorMessage name="organizationInformation.zipCode">
                  {(error) => <ErrorProps>{error}</ErrorProps>}
                    </ErrorMessage>}
                  name="organizationInformation.zipCode"
                  placeholder="Zip Code"
                  onChange={handleChange}
                   variant="outlined"
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


                    />)} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                  City  <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <Field
                  as={TextField}
                  value={values.organizationInformation.city}
                  sx={{
                    // boxShadow: "0 0 45px 1px red" ,
                    "&::placeholder": {
                      // color: "green",
                      letterSpacing: "0.2rem",
                      // fontSize: "1rem",
                    },
                  }}
                  helperText={
                    //    <div style={{
                    //   textAlign: "left",
                    //   color: "red",
                    //   fontSize: "0.9rem",

                    // }} >readonly</div>
                    <ErrorMessage name="organizationInformation.city">
                      {(error) => <ErrorProps>{error}</ErrorProps>}
                    </ErrorMessage>
                  }
                  name="organizationInformation.city"
                  placeholder="City"
                  type="text"
                  fullWidth={true}
                  autoComplete="text"
                  inputProps={{
                    sx: { "&::placeholder": {
                      // color: "green",
                      letterSpacing: "0.2rem",
                      // fontSize: "1rem",
                    },},
                    readOnly:zipDisable
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                  State  <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <Field
                  as={TextField}
                  value={values.organizationInformation.state}
                  sx={{
                    // boxShadow: "0 0 45px 1px red" ,
                    "&::placeholder": {
                      // color: "green",
                      letterSpacing: "0.2rem",
                      // fontSize: "1rem",
                    },
                  }}
                  helperText={
                    //    <div style={{
                    //   textAlign: "left",
                    //   color: "red",
                    //   fontSize: "0.9rem",

                    // }} >readonly</div>
                    <ErrorMessage name="organizationInformation.state">
                      {(error) => <ErrorProps>{error}</ErrorProps>}
                    </ErrorMessage>
                  }
                  name="organizationInformation.state"
                  placeholder="state"
                  type="text"
                  fullWidth={true}
                  autoComplete="text"
                  
                    
                  inputProps={{
                    sx: { "&::placeholder": {
                      // color: "green",
                      letterSpacing: "0.2rem",
                      // fontSize: "1rem",
                    },},
                    readOnly:zipDisable
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                  Phone No  <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <Field
                  as={TextField}
                  name="organizationInformation.phone"
                  placeholder="Phone Number"
                  type="text"
                  fullWidth={true}
                  autoComplete="text"
                  
                  inputProps={{
                    sx: { "&::placeholder": {
                      // color: "green",
                      letterSpacing: "0.2rem",
                      // fontSize: "1rem",
                    },},
                  }}
                  
                  helperText={
               
                  <ErrorMessage name="organizationInformation.phone">
                    {(error) => <ErrorProps>{error}</ErrorProps>}
                  </ErrorMessage>
                  }
               
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                  Email  <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <Field
                  as={TextField}
                  // value={values.contactPersonInformation.email}
                  sx={{
                    // boxShadow: "0 0 45px 1px red" ,
                    "&::placeholder": {
                      // color: "green",
                      letterSpacing: "0.2rem",
                      // fontSize: "1rem",
                    },
                  }}
                  helperText={
                    //    <div style={{
                    //   textAlign: "left",
                    //   color: "red",
                    //   fontSize: "0.9rem",

                    // }} >readonly</div>
                    <ErrorMessage name="organizationInformation.Email">
                      {(error) => <ErrorProps>{error}</ErrorProps>}
                    </ErrorMessage>
                  }
                  name="organizationInformation.Email"
                  placeholder="Email"
                  type="email"
                  fullWidth={true}
                  autoComplete="text"

                />

              </Grid>

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
                  Contact Person Information
                </Typography>
              </Grid>
              {contactPersonData.map((person, i) => (
                <Grid item xs={person.xs} md={person.md} key={i}>
                  <Typography
                    // variant="h6"
                    sx={{
                      fontSize: "1.2rem",
                      mb: "0.5rem",
                    }}
                  >
                    {person.label} <Typography display="inline" sx={{color:"red"}}>*</Typography>
                  </Typography>
                  <FormTextField
                    container={TextField}
                    sx={{
                      // boxShadow: "0 0 45px 1px red" ,
                      "&::placeholder": {
                        // color: "green",
                        letterSpacing: "0.2rem",
                        // fontSize: "1rem",
                      },
                    }}
                    name={person.name}
                    placeholder={person.placeholder}
                    type={person.type}
                    fullWidth={true}
                    autoComplete="text"
                  />
                </Grid>
              ))}
              {/* <Grid item xs={12}>
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      color: "#BBC7D9",
                      fontSize: "1.1rem"
                    }
                  }}
                  control={
                    <Checkbox checked={checked} sx={{
                      "&.Mui-checked": {
                        color: 'blue'
                      },
                    }}
                      onChange={(e: any) => {
                        setChecked(e.target.checked)
                        if (e.target.checked === true) {
                          setFieldValue("contactPersonInformation.email", values.organizationInformation.Email)
                        }
                        else {
                          setFieldValue("contactPersonInformation.email", "")
                        }
                      }} />
                  }
                  label="Same as organization email"
                />
              </Grid> */}

              <Grid item xs={12} md={6}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                  Role  <Typography 
                  display="inline"
                    style={{
                      textAlign: "left",
                      color: "red", 
                      fontSize: "0.7rem",
                      marginBottom:"1rem"
                    }}>(* Readonly)</Typography>
                  </Typography>
                <Field
                  as={TextField}

                  sx={{
                    // boxShadow: "0 0 45px 1px red" ,
                    "&::placeholder": {
                      // color: "green",
                      letterSpacing: "0.2rem",
                      // fontSize: "1rem",
                    },
                  }}
                  helperText={
                    <ErrorMessage name="contactPersonInformation.role">
                      {(error) => <ErrorProps>{error}</ErrorProps>}
                    </ErrorMessage>
                  }
                  name="contactPersonInformation.role"
                  placeholder="Role"
                  type="text"
                  fullWidth={true}
                  autoComplete="text"
                  inputProps={{ readOnly: true }}
                />

              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                  Contact Number  <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <Field
                  as={TextField}

                  sx={{
                    // boxShadow: "0 0 45px 1px red" ,
                    "&::placeholder": {
                      // color: "green",
                      letterSpacing: "0.2rem",
                      // fontSize: "1rem",
                    },
                  }}
                  helperText={
                    <ErrorMessage name="contactPersonInformation.contactno">
                      {(error) => <ErrorProps>{error}</ErrorProps>}
                    </ErrorMessage>
                  }
                  name="contactPersonInformation.contactno"
                  placeholder="Contact Number"
                  type="number"
                  fullWidth={true}
                  autoComplete="text"

                />

              </Grid>
              <Grid item xs={12} md={12}>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                  }}
                >
                  Email  <Typography 
                  display="inline"
                    style={{
                      textAlign: "left",
                      color: "red", 
                      fontSize: "0.7rem",
                      marginBottom:"1rem"
                    }}>(* Readonly)</Typography>
                </Typography>
                <Field
                  as={TextField}
                  // value={values.contactPersonInformation.email}
                  sx={{
                    // boxShadow: "0 0 45px 1px red" ,
                    "&::placeholder": {
                      // color: "green",
                      letterSpacing: "0.2rem",
                      // fontSize: "1rem",
                    },
                  }}
                  helperText={
                    //    <div style={{
                    //   textAlign: "left",
                    //   color: "red",
                    //   fontSize: "0.9rem",

                    // }} >readonly</div>
                    <ErrorMessage name="contactPersonInformation.email">
                      {(error) => <ErrorProps>{error}</ErrorProps>}
                    </ErrorMessage>
                  }
                  name="contactPersonInformation.email"
                  placeholder="Email"
                  type="email"
                  fullWidth={true}
                  autoComplete="text"
                  inputProps={{ readOnly: true }}
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
    </Paper>
  );
};

export default OrganizationInfo;
