import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Grid, Box, Typography, TextField, Paper } from "@mui/material";
import Formtext from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import { axiosPrivate, baseURL } from "../../axios/axios";
import { useLocation } from "react-router-dom";

// interface Iconprops{
//  icon: any
// }
//create schema
const schema = yup.object().shape({
  firstName: yup.string().required("Firstname is a required field")
  
  .matches(/^[A-Za-z ]*$/,"First Name can only contain alphabets."),
  lastName: yup.string().required("Lastname is a required field")
  .matches(/^[A-Za-z ]*$/,"First Name can only contain alphabets."),
  email: yup
    .string()
    .min(2, 'Too Short!')
     .max(50, 'Too Long!')
    .required("Email is a required field")
    .email("Invalid email"),
  password: yup
    .string()
    .required("Password is a required field")
    
     .max(50, 'Too Long!')
    
    .min(4, "Password must be at least 4 characters")
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/[@$!%*#?&]+/, "One special character")
    .matches(/\d+/, "One number")
 
});

export default function Signup() {
  const [state, setState] = React.useState("Provider");
  const [text, setText] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const location = useLocation();

 console.log(location, " useLocation Hook");
const data = location.state?.signup;
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        mt: "-0.5vh",
        // height: "95vh",
        backgroundColor: "primary.light",
      }}
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName:"",
          email: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          setIsLoading(true)
          // alert(JSON.stringify(values));
          console.log(values, "values");
          const Registerdata = {
            firstName: values.firstName,
            password: values.password,
            lastName:values.lastName,
            email: values.email,
            role:"PROVIDER"
          };

          axiosPrivate
            .post(`/provider/createProvider`, Registerdata)

            .then((res) => {
              setIsLoading(false)
              toast.success(res.data.message);
              navigate("/provider/login");
              // alert("Success");
            })
            .catch((err) => {
              console.log(err, "signuperr");
              // toast.error(err.response.data);
              toast.error(err.message);
              setIsLoading(false)
              
            });
        }}
      >
        <Form>
          <Grid
            container
            direction="row"
            justifyContent="center"
            //  alignItems="center"
          >
            <Paper
              variant="outlined"
              sx={{
                bgcolor: "#E4ECF7",
                boxShadow: 1,
                borderRadius: 2,
                padding: 5,
                mt: 2,
                minWidth: 300,
              }}
            >
              <Typography variant="h4">Welcome {data}! </Typography>
              <Typography variant="h4" sx={{ ml: 9 }}>
                Sign Up{" "}
              </Typography>
              {/* <Grid>
    <FontAwesomeIcon icon="fa-brands fa-twitter" />
    <FontAwesomeIcon icon ="fa-brands fa-facebook" />
    <FontAwesomeIcon icon="fa-brands fa-twitter" />
    </Grid> */}
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  mt: 4,
                }}
              >
                First Name <Typography display="inline" sx={{color:"red"}}>*</Typography>
              </Typography>
              <Formtext
                name="firstName"
                container={TextField}
                placeholder="FirstName"
                type="text"
                autoComplete="new-country-area"
                sx={{
                  width: {md:"20vw"},
                  "&::placeholder": {
                    // color: "green",

                    letterSpacing: "0.2rem",
                    fontSize: "1rem",
                  },
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  mt: 2,
                }}
              >
                Last Name <Typography display="inline" sx={{color:"red"}}>*</Typography>
              </Typography>
              <Formtext
                name="lastName"
                container={TextField}
                placeholder="LastName"
                type="text"
                autoComplete="new-country-area"
                sx={{
                  width:{md:"20vw"},
                  "&::placeholder": {
                    // color: "green",

                    letterSpacing: "0.2rem",
                    fontSize: "1rem",
                  },
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  mt: 2,
                }}
              >
                Email <Typography display="inline" sx={{color:"red"}}>*</Typography>
              </Typography>
              <Formtext
                name="email"
                container={TextField}
                placeholder="Email"
                type="email"
                autoComplete="new-country-area"
                sx={{
                  width: {md:"20vw"},
                  "&::placeholder": {
                    // color: "green",

                    letterSpacing: "0.2rem",
                    fontSize: "1rem",
                  },
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  mt: 2,
                }}
              >
                Password <Typography display="inline" sx={{color:"red"}}>*</Typography>
              </Typography>
              <Formtext
                name="password"
                container={TextField}
                placeholder="Password"
                type="password"
                autoComplete="new-country-area"
                sx={{
                  width: {md:"20vw"},
                  "&::placeholder": {
                    // color: "green",

                    letterSpacing: "0.2rem",
                    fontSize: "1rem",
                  },
                }}
              />
              <Grid item>
                <Buttoncomponent
                  type="submit"
                  size="large"
                  fullWidth={false}
                  variant="contained"
                  disable={isLoading}
                  sx={{
                    mt: 2,
                    backgroundColor: "secondary.dark",
                    width: "20vw",
                    color: "#fff",
                    "&:hover": {
                      color: "secondary.dark",
                      border: "1px solid blue",
                      // letterSpacing: "0.2rem",
                      // fontSize: "1rem",
                    },
                  }}
                >
                  Register
                </Buttoncomponent>
              </Grid>
              <Typography>
                Already have an account?<Link to="/provider/login">Login</Link>
              </Typography>
            </Paper>
          </Grid>
        </Form>
      </Formik>
    </Box>
  );
}
