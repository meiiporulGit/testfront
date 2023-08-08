import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, validateYupSchema, Field } from "formik";
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
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

//components
import FormTextField from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import SelectField from "../../Components/Select";

//redux store
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { tabValueNav } from "../../Redux/ProviderRedux/LoginSlice";
import { axiosPrivate, baseURL } from "../../axios/axios";
import ErrorProps from "../../Components/Errorprops";

interface forminitialValues {
  providerID: string;
  facilityNPI?: string | number;
  facilityName: string;
  // facilityType: string;
  MainfacilityType: string,
  OthersfacilityType: string,
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: string;
  longitude: string;
  contact: string;
  email: string;
}

// const options = [
//   { value: "1- Primary care", item: "1- Primary care" },
//   { value: "2- Urgent Care", item: "2- Urgent Care" },
//   { value: "3- Dentist Office", item: "3- Dentist Office" },
//   {value:"4- Imaging and Laboratory",item: "4- Imaging and Laboratory"},
//   {value:"5- Hospital",item:"5- Hospital"},
//   {value:"6- Others",item:"6- Others"}
// ];

export default function UpdateFacility() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const getid = useAppSelector(state => state.providerAuth.login);
  const facilityinput = useAppSelector(
    (state: { providerFacility: { fData: any } }) => state.providerFacility.fData
  );

  const options = useAppSelector((state) => state.providerFacility.facilityTypedata)
  const initialValues = {
    providerID: getid.userID,
    facilityNPI: facilityinput.facilityNPI,
    facilityName: facilityinput.facilityName,
    // facilityType: facilityinput.facilityType,
    MainfacilityType: facilityinput.facilityType.MainfacilityType,
    OthersfacilityType: facilityinput.facilityType.OthersfacilityType,
    addressLine1: facilityinput.address.addressLine1,
    addressLine2: facilityinput.address.addressLine2,
    city: facilityinput.address.city,
    state: facilityinput.address.state,
    zipCode: facilityinput.address.zipCode,
    latitude: facilityinput.latitude,
    longitude: facilityinput.longitude,
    contact: facilityinput.contact,
    email: facilityinput.email,
  };
  const validationSchema = Yup.object().shape({
    facilityNPI: Yup.string().required("FacilityNPI is required").matches(/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, "only numbers").test("len", " Invalid NPI", (val: any) => val && val.length === 10),
    facilityName: Yup.string().required("Facility Name is required"),
    // facilityType: Yup.string().required("Facility Type is required"),
    //facilityTypeOthers: Yup.string().required("Required"),
    MainfacilityType: Yup.string().required("Facility Type is Required"),
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
      facilityID: facilityinput.facilityID,
      providerID: values.providerID,
      facilityNPI: values.facilityNPI,
      facilityName: values.facilityName,
      facilityType: {
        MainfacilityType: values.MainfacilityType,
        OthersfacilityType: values.OthersfacilityType
      },
      address: {
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
      },
      latitude: values.latitude,
      longitude: values.longitude,
      email: values.email,
      contact: values.contact,
    };
    // alert(JSON.stringify(facilitydata, null, 2));
    // actions.resetForm({
    //   values: {
    //     facilityNPI: "",
    //     facilityName: "",
    //     facilityType: " ",
    //     addressLine1: "",
    //     addressLine2: "",
    //     city: "",
    //     state: "",
    //     zipCode: "",
    //     email: "",
    //     contact: "",
    //   },
    // });
    axiosPrivate
      .put(`/facility/updateFacility`, facilitydata)
      .then((res) => {
        // alert('updated')
        toast.success("Successfully Updated");
        console.log("updateFacility", res.data);
        setIsLoading(false)
        navigate("/provider/facility/viewFacility");
      })
      .catch(err => {
        setIsLoading(false)
        toast.error(err.message)
      });
  };

  return (
    <Box>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleChange, values, setFieldValue, }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  mb={"0.5rem"}
                  sx={{
                    backgroundColor: "#B4C8FC",
                    padding: "0.7rem",
                    textAlign: "center",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Facility Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.5rem",
                  }}
                >
                  Facility NPI <Typography display="inline" sx={{color:"red"}}>*</Typography>
                  <Typography 
                   display="inline"
                    style={{
                      textAlign: "left",
                      color: "red", 
                      fontSize: "0.7rem",
                      marginLeft:"0.5rem",
                      marginBottom:"1rem"
                    }}>(* Readonly)</Typography>
                </Typography>
                <Field
                  as={TextField}
                  label="Facility NPI"
                  name="facilityNPI"
                  placeholder="Facility NPI"
                  type="text"
                  fullWidth={true}
                  inputProps={{ readOnly: true }}
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
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
                    fontSize: "1.2rem",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.5rem",
                  }}
                >
                  Facility Name <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <FormTextField
                  container={TextField}
                  label="Facility Name"
                  name="facilityName"
                  placeholder="FacilityName"
                  type="text"
                  fullWidth={true}
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
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
                    fontSize: "1.2rem",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.5rem",
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
                {values.MainfacilityType === "FACT-6" ?
                  (
                    <FormTextField
                      container={TextField}
                      label="Enter Options for Others"
                      name="OthersfacilityType"
                      placeholder="Facility Type"
                      type="text"
                      autoComplete="new-country-area"
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
                    fontSize: "1.2rem",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.5rem",
                  }}
                >
                  Street Address1 <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <FormTextField
                  container={TextField}
                  label="Street Address1"
                  name="addressLine1"
                  placeholder="Street Address1"
                  type="text"
                  fullWidth={true}
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
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
                    fontSize: "1.2rem",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.5rem",
                  }}
                >
                  Street Address2
                </Typography>
                <FormTextField
                  container={TextField}
                  label="Street Address2"
                  name="addressLine2"
                  placeholder="Street Address2"
                  type="text"
                  fullWidth={true}
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
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
                    fontSize: "1.2rem",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.5rem",
                  }}
                >
                  City <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <FormTextField
                  container={TextField}
                  label="City"
                  name="city"
                  placeholder="City"
                  type="text"
                  fullWidth={true}
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
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
                    fontSize: "1.2rem",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.5rem",
                  }}
                >
                  State <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <FormTextField
                  container={TextField}
                  label="State"
                  name="state"
                  placeholder="State"
                  type="text"
                  fullWidth={true}
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
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
                    fontSize: "1.2rem",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.5rem",
                  }}
                >
                  ZipCode <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <FormTextField
                  container={TextField}
                  label="ZipCode"
                  name="zipCode"
                  placeholder="ZipCode"
                  type="text"
                  fullWidth={true}
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
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
                    fontSize: "1.2rem",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.5rem",
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
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
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
                    fontSize: "1.2rem",
                    // m: "0.5rem 0 0.2rem 0",
                    mb: "0.5rem",
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
                  sx={{
                    ".MuiFormLabel-root ": {
                      letterSpacing: "0.2rem",
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
                Update
                </Buttoncomponent>
              </Grid>
            </Grid>
          </Form>
        )}

      </Formik>
    </Box>
  );
}

// import React, { useEffect, useState } from "react";
// import { Formik, Form, ErrorMessage, validateYupSchema, Field } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import {
//   Grid,
//   Box,
//   Typography,
//   Paper,
//   TextField,
//   Select,
//   IconButton,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// //components
// import FormTextField from "../../Components/Textfield";
// import { Buttoncomponent } from "../../Components/Buttoncomp";
// import SelectField from "../../Components/Select";

// //redux store
// import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
// import { tabValueNav } from "../../Redux/ProviderRedux/LoginSlice";
// import { axiosPrivate, baseURL } from "../../axios/axios";
// import ErrorProps from "../../Components/Errorprops";

// interface forminitialValues {
//   providerID: string;
//   facilityNPI?: string | number;
//   facilityName: string;
//   // facilityType: string;
//   MainfacilityType: string,
//   OthersfacilityType: string,
//   addressLine1: string;
//   addressLine2?: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   latitude: string;
//   longitude: string;
//   contact: string;
//   email: string;
// }

// // const options = [
// //   { value: "1- Primary care", item: "1- Primary care" },
// //   { value: "2- Urgent Care", item: "2- Urgent Care" },
// //   { value: "3- Dentist Office", item: "3- Dentist Office" },
// //   {value:"4- Imaging and Laboratory",item: "4- Imaging and Laboratory"},
// //   {value:"5- Hospital",item:"5- Hospital"},
// //   {value:"6- Others",item:"6- Others"}
// // ];

// export default function UpdateFacility() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [isLoading,setIsLoading]=useState<boolean>(false)
//   const getid = useAppSelector(state => state.providerAuth.login);
//   const facilityinput = useAppSelector(
//     (state: { providerFacility: { fData: any } }) => state.providerFacility.fData
//   );

//   const options = useAppSelector((state) => state.providerFacility.facilityTypedata)
//   const initialValues = {
//     providerID: getid.userID,
//     facilityNPI: facilityinput.facilityNPI,
//     facilityName: facilityinput.facilityName,
//     // facilityType: facilityinput.facilityType,
//     MainfacilityType: facilityinput.facilityType.MainfacilityType,
//     OthersfacilityType: facilityinput.facilityType.OthersfacilityType,
//     addressLine1: facilityinput.address.addressLine1,
//     addressLine2: facilityinput.address.addressLine2,
//     city: facilityinput.address.city,
//     state: facilityinput.address.state,
//     zipCode: facilityinput.address.zipCode,
//     latitude: facilityinput.latitude,
//     longitude: facilityinput.longitude,
//     contact: facilityinput.contact,
//     email: facilityinput.email,
//   };
//   const validationSchema = Yup.object().shape({
//     facilityNPI: Yup.string().required("FacilityNPI is required").matches(/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, "only numbers").test("len", " Invalid NPI", (val: any) => val && val.length === 10),
//     facilityName: Yup.string().required("Facility Name is required"),
//     // facilityType: Yup.string().required("Facility Type is required"),
//     //facilityTypeOthers: Yup.string().required("Required"),
//     MainfacilityType: Yup.string().required("Facility Type is Required"),
//     addressLine1: Yup.string().required("Street Address1 is required"),
//     // addressLine2: Yup.string().required("Required field"),
//     city: Yup.string().nullable().required("City is required").matches(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/, 'City name should be alpha-characters'),
//     zipCode: Yup.string()
//       .required("Zipcode is required")
//       .test("len", (val: any) => val && val.length === 5)
//       .matches(/^[A-Za-z0-9]+$/, "Zipcode should be alpha-numeric characters"),
//     state: Yup.string().nullable().required("State is required").matches(/^[A-Za-z -]+$/, 'State name should be alpha-characters').min(2, 'State must be at least 2 characters.')
//       .max(100, 'State has a maximum limit of 100 characters.'),
//     contact: Yup.string().required("Phone is required").matches(/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, "only numbers").test("len", " Invalid Contact no", (val: any) => val && val.length === 10),
//     email: Yup.string().email().required("Email is required")
//   });
//   const onSubmit = (values: forminitialValues, actions: any) => {
//     setIsLoading(true)
//     const facilitydata = {
//       facilityID: facilityinput.facilityID,
//       providerID: values.providerID,
//       facilityNPI: values.facilityNPI,
//       facilityName: values.facilityName,
//       facilityType: {
//         MainfacilityType: values.MainfacilityType,
//         OthersfacilityType: values.OthersfacilityType
//       },
//       address: {
//         addressLine1: values.addressLine1,
//         addressLine2: values.addressLine2,
//         city: values.city,
//         state: values.state,
//         zipCode: values.zipCode,
//       },
//       latitude: values.latitude,
//       longitude: values.longitude,
//       email: values.email,
//       contact: values.contact,
//     };
//     // alert(JSON.stringify(facilitydata, null, 2));
//     // actions.resetForm({
//     //   values: {
//     //     facilityNPI: "",
//     //     facilityName: "",
//     //     facilityType: " ",
//     //     addressLine1: "",
//     //     addressLine2: "",
//     //     city: "",
//     //     state: "",
//     //     zipCode: "",
//     //     email: "",
//     //     contact: "",
//     //   },
//     // });
//     axiosPrivate
//       .put(`/facility/updateFacility`, facilitydata)
//       .then((res) => {
//         // alert('updated')
//         toast.success("Successfully Updated");
//         console.log("i", res.data);
//         setIsLoading(false)
//         navigate("/provider/facility/viewFacility");
//       })
//       .catch(err => {
//         setIsLoading(false)
//         toast.error(err.message)
//       });
//   };

//   return (
//     <Box>

//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
//         {({ handleChange, values, setFieldValue, }) => (
//           <Form>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Typography
//                   mb={"0.5rem"}
//                   sx={{
//                     backgroundColor: "#B4C8FC",
//                     padding: "0.7rem",
//                     textAlign: "center",
//                     fontSize: "1.2rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Facility Information
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={12}>
//                 <Typography
//                   sx={{
//                     fontSize: "1.2rem",
//                     // m: "0.5rem 0 0.2rem 0",
//                     mb: "0.5rem",
//                   }}
//                 >
//                   Facility NPI <Typography display="inline" sx={{color:"red"}}>*</Typography>
//                   <Typography 
//                   // display="inline"
//                     style={{
//                       textAlign: "left",
//                       color: "red", 
//                       fontSize: "0.7rem",
//                       marginLeft:"0.5rem",
//                       marginBottom:"1rem"
//                     }}>(* Readonly)</Typography>
//                 </Typography>
//                 <Field
//                   as={TextField}
//                   label="Facility NPI"
//                   name="facilityNPI"
//                   placeholder="Facility NPI"
//                   type="text"
//                   fullWidth={true}
//                   inputProps={{ readOnly: true }}
//                   sx={{
//                     ".MuiFormLabel-root ": {
//                       letterSpacing: "0.2rem",
//                     },
//                     ".MuiInputLabel-shrink": {
//                       letterSpacing: 0,
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography
//                   sx={{
//                     fontSize: "1.2rem",
//                     // m: "0.5rem 0 0.2rem 0",
//                     mb: "0.5rem",
//                   }}
//                 >
//                   Facility Name <Typography display="inline" sx={{color:"red"}}>*</Typography>
//                 </Typography>
//                 <FormTextField
//                   container={TextField}
//                   label="Facility Name"
//                   name="facilityName"
//                   placeholder="FacilityName"
//                   type="text"
//                   fullWidth={true}
//                   sx={{
//                     ".MuiFormLabel-root ": {
//                       letterSpacing: "0.2rem",
//                     },
//                     ".MuiInputLabel-shrink": {
//                       letterSpacing: 0,
//                     },
//                     //  ".Mui-focused":{
//                     //     letterSpacing: "0.2rem"
//                     //  }
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography
//                   // variant="h6"
//                   sx={{
//                     fontSize: "1.2rem",
//                     // m: "0.5rem 0 0.2rem 0",
//                     mb: "0.5rem",
//                   }}
//                 >
//                   Facility Type <Typography display="inline" sx={{color:"red"}}>*</Typography>
//                 </Typography>
//                 <FormControl sx={{ width: "100%" }}>
//                   <InputLabel sx={{ letterSpacing: "0.2rem", fontSize: "0.8rem", "&.MuiInputLabel-shrink": { letterSpacing: 0 } }}>Facility Type</InputLabel>
//                   <Field as={Select} name="MainfacilityType" label="Facility Type">
//                     {(options || []).map((select: any, index: any) => (
//                       <MenuItem key={index + 1} value={select.value}>
//                         {select.item}
//                       </MenuItem>
//                     ))}

//                   </Field>

//                   <ErrorMessage name="MainfacilityType">
//                     {(error) => (
//                       <ErrorProps >
//                         {error}
//                       </ErrorProps>
//                     )}
//                   </ErrorMessage>
//                 </FormControl>
//                 {values.MainfacilityType === "6- Others" ?
//                   (
//                     <FormTextField
//                       container={TextField}
//                       label="Enter Options for Others"
//                       name="OthersfacilityType"
//                       placeholder="Facility Type"
//                       type="text"
//                       autoComplete="new-country-area"
//                       sx={{
//                         mt: "0.7rem",
//                         ".MuiFormLabel-root ": {
//                           letterSpacing: "0.2rem",
//                           fontSize: "0.8rem",
//                         },
//                         ".MuiInputLabel-shrink": {
//                           letterSpacing: 0,
//                         },
//                       }}
//                     />
//                   ) : null
//                 }
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography
//                   sx={{
//                     fontSize: "1.2rem",
//                     // m: "0.5rem 0 0.2rem 0",
//                     mb: "0.5rem",
//                   }}
//                 >
//                   Street Address1 <Typography display="inline" sx={{color:"red"}}>*</Typography>
//                 </Typography>
//                 <FormTextField
//                   container={TextField}
//                   label="Street Address1"
//                   name="addressLine1"
//                   placeholder="Street Address1"
//                   type="text"
//                   fullWidth={true}
//                   sx={{
//                     ".MuiFormLabel-root ": {
//                       letterSpacing: "0.2rem",
//                     },
//                     ".MuiInputLabel-shrink": {
//                       letterSpacing: 0,
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography
//                   sx={{
//                     fontSize: "1.2rem",
//                     // m: "0.5rem 0 0.2rem 0",
//                     mb: "0.5rem",
//                   }}
//                 >
//                   Street Address2
//                 </Typography>
//                 <FormTextField
//                   container={TextField}
//                   label="Street Address2"
//                   name="addressLine2"
//                   placeholder="Street Address2"
//                   type="text"
//                   fullWidth={true}
//                   sx={{
//                     ".MuiFormLabel-root ": {
//                       letterSpacing: "0.2rem",
//                     },
//                     ".MuiInputLabel-shrink": {
//                       letterSpacing: 0,
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Typography
//                   sx={{
//                     fontSize: "1.2rem",
//                     // m: "0.5rem 0 0.2rem 0",
//                     mb: "0.5rem",
//                   }}
//                 >
//                   City <Typography display="inline" sx={{color:"red"}}>*</Typography>
//                 </Typography>
//                 <FormTextField
//                   container={TextField}
//                   label="City"
//                   name="city"
//                   placeholder="City"
//                   type="text"
//                   fullWidth={true}
//                   sx={{
//                     ".MuiFormLabel-root ": {
//                       letterSpacing: "0.2rem",
//                     },
//                     ".MuiInputLabel-shrink": {
//                       letterSpacing: 0,
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Typography
//                   sx={{
//                     fontSize: "1.2rem",
//                     // m: "0.5rem 0 0.2rem 0",
//                     mb: "0.5rem",
//                   }}
//                 >
//                   State <Typography display="inline" sx={{color:"red"}}>*</Typography>
//                 </Typography>
//                 <FormTextField
//                   container={TextField}
//                   label="State"
//                   name="state"
//                   placeholder="State"
//                   type="text"
//                   fullWidth={true}
//                   sx={{
//                     ".MuiFormLabel-root ": {
//                       letterSpacing: "0.2rem",
//                     },
//                     ".MuiInputLabel-shrink": {
//                       letterSpacing: 0,
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Typography
//                   sx={{
//                     fontSize: "1.2rem",
//                     // m: "0.5rem 0 0.2rem 0",
//                     mb: "0.5rem",
//                   }}
//                 >
//                   ZipCode <Typography display="inline" sx={{color:"red"}}>*</Typography>
//                 </Typography>
//                 <FormTextField
//                   container={TextField}
//                   label="ZipCode"
//                   name="zipCode"
//                   placeholder="ZipCode"
//                   type="text"
//                   fullWidth={true}
//                   sx={{
//                     ".MuiFormLabel-root ": {
//                       letterSpacing: "0.2rem",
//                     },
//                     ".MuiInputLabel-shrink": {
//                       letterSpacing: 0,
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography
//                   sx={{
//                     fontSize: "1.2rem",
//                     // m: "0.5rem 0 0.2rem 0",
//                     mb: "0.5rem",
//                   }}
//                 >
//                   Phone <Typography display="inline" sx={{color:"red"}}>*</Typography>
//                 </Typography>
//                 <FormTextField
//                   container={TextField}
//                   label="Phone"
//                   name="contact"
//                   placeholder="Phone"
//                   type="text"
//                   fullWidth={true}
//                   sx={{
//                     ".MuiFormLabel-root ": {
//                       letterSpacing: "0.2rem",
//                     },
//                     ".MuiInputLabel-shrink": {
//                       letterSpacing: 0,
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography
//                   sx={{
//                     fontSize: "1.2rem",
//                     // m: "0.5rem 0 0.2rem 0",
//                     mb: "0.5rem",
//                   }}
//                 >
//                   Email <Typography display="inline" sx={{color:"red"}}>*</Typography>
//                 </Typography>
//                 <FormTextField
//                   container={TextField}
//                   label="Email"
//                   name="email"
//                   placeholder="Email"
//                   type="email"
//                   fullWidth={true}
//                   sx={{
//                     ".MuiFormLabel-root ": {
//                       letterSpacing: "0.2rem",
//                     },
//                     ".MuiInputLabel-shrink": {
//                       letterSpacing: 0,
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid container item xs={12} justifyContent="right">
//                 <Buttoncomponent
//                   type="submit"
//                   size="large"
//                   fullWidth={false}
//                   variant="contained"
//                   disable={isLoading}
//                   sx={{
//                     backgroundColor: "secondary.dark",
//                     width: "10vw",
//                     color: "#fff",
//                     "&:hover": {
//                       color: "secondary.dark",
//                       border: "1px solid blue",
//                       // letterSpacing: "0.2rem",
//                       // fontSize: "1rem",
//                     },
//                   }}
//                 >
//                 Update
//                 </Buttoncomponent>
//               </Grid>
//             </Grid>
//           </Form>
//         )}

//       </Formik>
//     </Box>
//   );
// }
