
import React, { useState, useRef,useEffect } from "react";
import { Formik, Form, Field ,ErrorMessage,} from "formik";
import * as Yup from "yup";
import { TextField, Box, Typography, Grid, Paper, Button, Autocomplete,
  AutocompleteRenderInputParams,
  createFilterOptions, } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import FormTextField from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";

import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { storeLoginInfoupdate } from "../../Redux/ProviderRedux/LoginSlice";
import { organizationImage } from "../../Redux/ProviderRedux/orgSlice";
import { axiosPrivate } from "../../axios/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { tabValueNav } from "../../Redux/ProviderRedux/LoginSlice";

import ErrorProps from "../../Components/Errorprops"
import { toast } from "react-toastify";

interface InitialValues {
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
    orgImg: String;
  };

  contactPersonInformation: {
    firstName: string;
    lastName: string;
    role: string;
    contactno: string;
    email: string;
  };
}

const EditOrganization = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation()
  const [currentFile, setCurrentFile] = useState<any>();
  const [fileName, setFileName] = useState<any>("");
  const [buttonEdit, setButtonEdit] = useState<Boolean>(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [zipDisable,setZipDisable]=useState<Boolean>(true)
  const [autoCompleteData,setAutoCompleteData]=useState<any>([])
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const selectOrg = useAppSelector((state) => state.providerOrganization.orgEditData[0]);
  console.log(selectOrg, "editorg")
  const image = useAppSelector((state) => state.providerOrganization.orgEditImage);
  console.log("imageedit", image);
  const dataLogin = useAppSelector(
    (state: { providerAuth: { login: any } }) => state.providerAuth.login
  );
  const navigate = useNavigate();
  console.log(selectOrg, "shjjhjh");
  const fileInput = useRef<any>();

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
      providerID: selectOrg.providerID,
      organizationName: selectOrg.organizationName,
      streetAdd1: selectOrg.address.addressLine1,
      streetAdd2: selectOrg.address.addressLine2,
      city: selectOrg.address.city,
      state: selectOrg.address.state,
      zipCode: selectOrg.address.zipCode,
      phone: selectOrg.contact,
      Email: selectOrg.email,
      orgImg: selectOrg.orgImg,
    },

    contactPersonInformation: {
      firstName: dataLogin.firstName,
      lastName: dataLogin.lastName,
      role: dataLogin.role,
      contactno: selectOrg.contactPerson.contact,
      email: dataLogin.email,
    },
  };
  const handleFiles = (e: any) => {
    var files = e.target.files;
    let formData = new FormData();
    formData.append("file", files[0]);
    console.log(formData, "formDataonchangeedit");
    setCurrentFile(files[0]);
  };

  const SingleFileChange = () => {
    setCurrentFile(fileInput.current.files[0]);
    setFileName(fileInput.current.files[0].name);
    //     let formData = new FormData();
    //     formData.append("file", currentFile);
    // console.log(currentFile,'currentedit')
    var file = document.getElementById("upload-photo");
    if (/\.(jpe?g|png|gif)$/i.test(fileInput.current.files[0].name) === false) {
      setErrorMessage("Unsupported File Format (Allowed PNG,JPG,JPEG,gif)")
    } else {
      setErrorMessage("")
    }
  };
  const onSubmit = async (values: InitialValues, actions: any) => {
    setIsLoading(true)
    const orgprovider = {
      providerID: dataLogin.userID,
      firstName: values.contactPersonInformation.firstName,
      lastName: values.contactPersonInformation.lastName,
      // role: values.contactPersonInformation.role,
      contact: values.contactPersonInformation.contactno,
      // email: values.contactPersonInformation.email,
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
        // navigate("/provider/viewOrg");
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err, "orgErr");
        toast.error(err.message);
      });
    } catch (err) { }

    let formData = new FormData();
    formData.append("file", currentFile);
    // formData.append("file", fileName);
    console.log(formData, "formData");
    console.log(currentFile, "curredit");
    try {
      axiosPrivate
        .post("organization/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data, "resedit");
          const orgdata = {
            organizationID: selectOrg.organizationID,
            providerID: values.organizationInformation.providerID,
            organizationName: values.organizationInformation.organizationName,
            orgImg: res.data.data ? res.data.data.filename : image,
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
              email: values.contactPersonInformation.email,
            },
          };
          // alert(JSON.stringify(orgdata, null, 2));
          console.log(orgdata, "orgdata");
          axiosPrivate
            .put("/organization/updateOrganization", orgdata)
            .then((res) => {
              // alert("success");
              // dispatch(organizationEdit(orgdata))
              toast.success(res.data.message)
              if(buttonEdit){
                setIsLoading(false)
                navigate("/provider/viewOrg",{ state: { previousPath: pathname } });
              }else{
setIsLoading(false)
              navigate("/provider/facility/viewFacility",{ state: { previousPath: pathname } });
              }
              // actions.resetForm({
              //   values: initialValues,
              // });
            }).catch(err=>{
              setIsLoading(false)
              toast.error(err.message)
            })
        });
    } catch { setIsLoading(false)}
  };

  // const validationSchema = Yup.object().shape({
  //   organizationInformation: Yup.object().shape({
  //     organizationName: Yup.string().required("Organization Name is required"),
  //     streetAdd1: Yup.string().required("Address is required"),
  //     city: Yup.string().required("city is required"),
  //     state: Yup.string().required("state is required"),
  //     zipCode: Yup.string().required("zip code is required"),
  //     Email: Yup.string().required("Email is required").email("invalid email"),
  //   }),
  //   contactPersonInformation: Yup.object().shape({
  //     firstName: Yup.string().required("First Name is a required field"),
  //     lastName: Yup.string().required("Last Name is required"),
  //     role: Yup.string().required("Role is a required field"),
  //     contactno: Yup.string().required("Contact is a required field"),
  //     email: Yup.string()
  //       .required("Email is a required field")
  //       .email("invalid email"),
  //   }),
  // });

  const validationSchema = Yup.object().shape({
    organizationInformation: Yup.object().shape({
      organizationName: Yup.string().required("Organization Name is required"),
      streetAdd1: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required").matches(/^[A-Za-z -]+$/, 'City can only contain alphabets.'),
      state: Yup.string().required("State is required").matches(/^[A-Za-z -]+$/, 'State can only contain alphabets.'),
      zipCode: Yup.string().required("Zip Code is required").matches(/^[A-Za-z0-9]+$/,"Zip Code can only contain alphabets and number"),
      Email: Yup.string().required("Email is required").email("invalid email"),
      phone: Yup.string().required("Phone is required").matches(/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, "only numbers").test("len", "Invalid Contact no", (val: any) => val && val.length === 10),
    }),
    contactPersonInformation: Yup.object().shape({
      firstName: Yup.string().required("First Name is a required field").matches(/^[A-Za-z -]+$/, 'First Name can only contain alphabets.'),
      lastName: Yup.string().required("Last Name is required").matches(/^[A-Za-z -]+$/, 'Last Name can only contain alphabets.'),
      role: Yup.string().required("Role is a required field").matches(/[A-Za-z0-9]+$/,"Role can only contain alphabets and number"),
      contactno: Yup.string().required("Contact is a required field").matches(/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/,"only numbers") .test("len","Invalid contact no", (val: any) => val && val.length === 10),
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
    //   xs:12,
    //   md: 4,
    //   label: "City *",
    //   name: "organizationInformation.city",
    //   placeholder: "City",
    //   type: "text",
    // },
    // {
    //   xs:12,
    //   md: 4,
    //   label: "State *",
    //   name: "organizationInformation.state",
    //   placeholder: "State",
    //   type: "text",
    // },
    // {
    //   xs:12,
    //   md: 4,
    //   label: "Zip Code *",
    //   name: "organizationInformation.zipCode",
    //   placeholder: "Zip Code",
    //   type: "text",
    // },
    // {
    //   xs:12,
    //   md: 6,
    //   label: "Phone *",
    //   name: "organizationInformation.phone",
    //   placeholder: "Phone Number",
    //   type: "text",
    // },
    // {
    //   xs:12,
    //   md: 6,
    //   label: "Email *",
    //   name: "organizationInformation.Email",
    //   placeholder: "Email",
    //   type: "email",
    // },
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
    //   xs:12,
    //   md: 6,
    //   label: "Role *",
    //   name: "contactPersonInformation.role",
    //   placeholder: "Role",
    //   type: "text",
    // },
    // {
    //   xs:12,
    //   md: 6,
    //   label: "Contact *",
    //   name: "contactPersonInformation.contactno",
    //   placeholder: "Contact Number",
    //   type: "text",
    // },
    // {
    //   xs:12,
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
      {/* <p>{JSON.stringify(select)}</p> */}
      {/* <Typography
        variant="h6"
        textAlign={"right"}
        justifyItems={"right"}
        sx={{ color: "Black" }}
        margin={"10px"}
        marginBottom={"5px"}
      >
        Hello {data.userID},
      </Typography>
      <div
        style={{
          marginBottom: "10px",
          flex: 1,
          height: "3px",
          backgroundColor: "darkgray",
        }}
      /> */}
      {/* <Grid container item xs={12} justifyContent="left">
        <Button
          variant="outlined"
          type="button"
          onClick={() => {
            dispatch(tabValueNav(0))
            // dispatch(editButton())
            navigate("/providerlanding");
          }}
          sx={{
            backgroundColor: "secondary.dark",
            width: "8vw",

            marginBottom: "0.5rem",
            color: "#fff",
            "&:hover": {
              color: "secondary.dark",
              border: "1px solid blue",
            },
          }}
          startIcon={<ArrowBackIcon fontSize="large" />}
        >
          BACK
        </Button>
      </Grid> */}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
         {({ handleChange, setFieldValue, values, touched,
          errors, }) => (
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
                  // name="upload-photo"
                  type="file"
                  accept="image/*"
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
              {/* <Box component="span" sx={{ marginLeft: "1rem" }}>
                {fileName}
              </Box> */}
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
                  {org.label}<Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <FormTextField
                  container={TextField}
                  name={org.name}
                  placeholder={org.placeholder}
                  type={org.type}
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
               Zip Code <Typography display="inline" sx={{color:"red"}}>*</Typography>
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
                  placeholder="Zip code"
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

                
                />)}/>
              </Grid>
              <Grid item xs={12} md ={4}>
              <Typography
                    // variant="h6"
                    sx={{
                      fontSize: "1.2rem",
                      mb: "0.5rem",
                    }}
                  >
                    City <Typography display="inline" sx={{color:"red"}}>*</Typography>
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
              <Grid item xs={12} md ={4}>
              <Typography
                    // variant="h6"
                    sx={{
                      fontSize: "1.2rem",
                      mb: "0.5rem",
                    }}
                  >
                    State <Typography display="inline" sx={{color:"red"}}>*</Typography>
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
                  Phone No <Typography display="inline" sx={{color:"red"}}>*</Typography>
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
                  <ErrorMessage name="organizationInformation.phone">
                    {(error) => <ErrorProps>{error}</ErrorProps>}
                  </ErrorMessage>
                  }
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
                  Email <Typography display="inline" sx={{color:"red"}}>*</Typography>
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
                  {person.label}<Typography display="inline" sx={{color:"red"}}>*</Typography> 
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
                Role  <Typography 
                  display="inline"
                    style={{
                      textAlign: "left",
                      color: "red", 
                      fontSize: "0.7rem",
                   
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
                  Contact Number <Typography display="inline" sx={{color:"red"}}>*</Typography>
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
                // helperText={
                // //    <div style={{
                // //   textAlign: "left",
                // //   color: "red",
                // //   fontSize: "0.9rem",

                // // }} >readonly</div>
                // <ErrorMessage name="contactPersonInformation.email">
                //   {(error) => <ErrorProps>{error}</ErrorProps>}
                // </ErrorMessage>
                // }
                name="contactPersonInformation.email"
                placeholder="Email"
                type="email"
                fullWidth={true}
                autoComplete="text"
                inputProps={{ readOnly: true }}
              />

            </Grid>
            <Grid container item xs={12} justifyContent="right" >
              <Buttoncomponent

                type="submit"
                size="large"
                fullWidth={false}
                variant="contained"
                disable={isLoading}
                sx={{
                  display: { xs: "none", md: "block" },
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
                Update
              </Buttoncomponent>
              <Buttoncomponent
                disable={isLoading}
                type="submit"
                size="large"
                fullWidth={false}
                variant="contained"
                onClick={() => {
                  setButtonEdit(true)
                }}
                sx={{
                  display: { xs: "flex", md: "none" },
                  backgroundColor: "secondary.dark",
                  width: "15vw",
                  color: "#fff",
                  "&:hover": {
                    color: "secondary.dark",
                    border: "1px solid blue",
                    // letterSpacing: "0.2rem",
                    // fontSize: "1rem",
                  },
                }}
              >
                Update
              </Buttoncomponent>
            </Grid>
          </Grid>
        </Form>
          )}
      </Formik>
    </Paper>
  );
};

export default EditOrganization;
