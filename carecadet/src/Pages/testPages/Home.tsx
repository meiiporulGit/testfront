import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import healthcare from "../Images/healthcare.jpg";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../Redux/Hook";
import { pageUser } from "../../Redux/ProviderRedux/LoginSlice";

import { Buttoncomponent } from "../../Components/Buttoncomp";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const onRouteUser = (userType: string) => {
    localStorage.setItem("pageUserType", userType);
    // dispatch(pageUser(userType))

    navigation("/provider/login");
  };
  return (
    <Box
      sx={{
        width: "100%",
        mt: "-0.5vh",
        height: "95vh",
        backgroundColor: "primary.light",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={7}>
          <Grid
            container
            direction="column"
            // justifyContent="space-between"
            alignItems="center"
          >
            {/* <Typography variant="h3" sx={{mr:18,mb:2,mt:2,color:"#728AB7"}}  >
              HealthLens
            </Typography> */}
            <Typography
              variant="h3"
              sx={{ display: "flex", color: "#728AB7", fontWeight: "bold" }}
            >
              Care<Box sx={{ color: "#4D77FF" }}>Cadet</Box>
            </Typography>

            <Typography variant="h4" sx={{ margin: 2, color: "#728AB7" }}>
              Home to check the cost of <br></br> health care
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ margin: 2, color: "#728AB7" }} variant="h6">
              I am...
            </Typography>
            <Buttoncomponent
              href="/patient"
              size="medium"
              type="button"
              fullWidth={false}
              variant="contained"
              color="secondary"
              onClick={() => {
                onRouteUser("PATIENT");
              }}
              sx={{
                margin: 2,
                backgroundColor: "secondary.dark",
                width: "20vw",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "#728AB7",
                  active: "secondary.dark",
                  border: "1px solid blue",
                  letterSpacing: "0.2rem",
                  fontSize: "1rem",
                },
              }}
            >
              Patient
            </Buttoncomponent>

            <Buttoncomponent
              // href="/login"
              size="medium"
              type="button"
              fullWidth={false}
              variant="contained"
              color="secondary"
              onClick={() => {
                onRouteUser("PROVIDER");
              }}
              sx={{
                margin: 2,
                backgroundColor: "secondary.dark",
                width: "20vw",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "#728AB7",
                  active: "secondary.dark",
                  border: "1px solid blue",
                  letterSpacing: "0.2rem",
                  fontSize: "1rem",
                },
              }}
            >
              Provider
            </Buttoncomponent>

            <Buttoncomponent
              href="/payer"
              size="medium"
              type="button"
              fullWidth={false}
              variant="contained"
              color="primary"
              onClick={() => {
                onRouteUser("PAYER");
              }}
              sx={{
                margin: 2,
                backgroundColor: "secondary.dark",
                width: "20vw",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "white",
                  active: "secondary.dark",
                  border: "1px solid blue",
                  letterSpacing: "0.2rem",
                  fontSize: "1rem",
                },
              }}
            >
              Payer
            </Buttoncomponent>
          </Grid>
        </Grid>
        <Grid item md={5} sx={{ mt: 8 }}>
          <img
            src={healthcare}
            alt="Home"
            style={{
              width: "550px",
              height: "480px",
              //  top: "35px",
              // right: "60%",
              borderRadius: "13px",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
