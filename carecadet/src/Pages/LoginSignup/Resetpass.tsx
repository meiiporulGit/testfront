import React from "react";
import { TextField, Box, Typography, Grid } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import login from "../../Images/login.jpg";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom'
import Cookie from "js-cookie";
import { useState } from "react";
import FormTextField from "../../Components/Textfield";
import { Buttoncomponent } from "../../Components/Buttoncomp";

import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import {
  loginButton,
  storeLoginInfo,
} from "../../Redux/ProviderRedux/LoginSlice";
import { axiosPrivate } from "../../axios/axios";

const schema = yup.object().shape({
 
  password: yup
  .string()
  .required("Password is a required field")
  .min(4, "Password must be at least 4 characters")
   .max(50, 'Too Long!')
   .matches(/[a-z]+/, "One lowercase character")
  .matches(/[A-Z]+/, "One uppercase character")
  .matches(/[@$!%*#?&]+/, "One special character")
  .matches(/\d+/, "One number"),
  passwordConfirmation: yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
});
export default function Resetpass() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false)
    // console.log("searchParams",searchParams.get("resettoken"));

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ backgroundColor: "#EBF3FA", height: "95vh", mt: "-0.5vh",padding:{xs:"20px",md:"none"} }}>
      <Grid container>
        <Grid item md={7} sx={{ display: "flex", justifyContent: "center" }}>
            
          <Formik
            validationSchema={schema}
            initialValues={{
            
              password: "",
              passwordConfirmation:"",
              userType: "PROVIDER",
            }}
            
            onSubmit={(values) => {
              setIsLoading(true)
                let searchquery = searchParams.get("resettoken")
                console.log("searchquery",searchquery)
              // alert(JSON.stringify(values));
              const Resetdata = {
                resetLink: searchquery,
                newPass: values.password,
                userType: values.userType,
              };
              console.log(Resetdata, "values");

              axiosPrivate
                .put("/provider/resetpassword", Resetdata)
                .then((res) => {
                  setIsLoading(false)
                  toast.success(res.data.message);
                 
                  navigate("/provider/login");
                })
                .catch((err) => {
                  setIsLoading(false)
                  toast.error(err.message);
               
                });
            }}
          >
            <Form >
        
              <Typography variant="h4" sx={{ mt: 12, color: "#728AB7" }}>
                Reset Password
              </Typography>

              <Grid>
                <Typography
                  variant="h6"
                  sx={{ mt: 1, color: "#728AB7" }}
                  // mb={"0.5rem"}
                  // sx={{
                  //   backgroundColor: "secondary.light",
                  //   padding: "0.7rem",
                  //   textAlign: "center",
                  //   fontSize: "1.5rem",
                  // }}
                >
                  Enter your new password to reset
                </Typography>
              </Grid>

             
              <Grid>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                    color: "#728AB7",
                  }}
                >
                New  Password <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <FormTextField
                  container={TextField}
                  name="password"
                  placeholder="Password"
                  type="password"
                  autoComplete="new-country-area"
                  sx={{
                    width: {md:"20vw"},
                    "&::placeholder": {
                      color: "#728AB7",
                      letterSpacing: "0.2rem",
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>
              <Grid>
                <Typography
                  // variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    mb: "0.5rem",
                    color: "#728AB7",
                  }}
                >
               Confirm Password <Typography display="inline" sx={{color:"red"}}>*</Typography>
                </Typography>
                <FormTextField
                  container={TextField}
                  name="passwordConfirmation"
                  placeholder="Password"
                  type="password"
                  autoComplete="new-country-area"
                  sx={{
                    width: {md:"20vw"},
                    "&::placeholder": {
                      color: "#728AB7",
                      letterSpacing: "0.2rem",
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>
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
                      letterSpacing: "0.2rem",
                      fontSize: "1rem",
                    },
                  }}
                >
                 Reset password
                </Buttoncomponent>
              </Grid>
                          
            </Form>
          </Formik>
        </Grid>
        <Grid
          item
          md={5}
          sx={{
            display: {xs:"none",md:"flex"},
            justifyContent: "center",
            alignItems: "center",
            mt: 8,
          }}
        >
          <img
            src={login}
            alt="login"
            style={{
              width: "450px",
              height: "567px",
              //  top: "35px",
              // right: "20px",
              borderRadius: "13px",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
