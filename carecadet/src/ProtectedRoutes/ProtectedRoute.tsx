import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Paper,
  CircularProgress,
} from "@mui/material";

import OrganizationLandingView from "../Pages/Organization/OrganizationLandingView";
import { useAppSelector, useAppDispatch } from "../Redux/Hook";
import { axiosPrivate } from "../axios/axios";
import { organizationEdit } from "../Redux/ProviderRedux/orgSlice";
import OrganizationNav from "./OrganizationNav";

interface Props {
  children: JSX.Element;
  getData: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//   };
// }

const ProtectedRoute = ({ children, getData }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const userID = useAppSelector((state) => state.providerAuth.login.userID);
  const authUser = useAppSelector((state) => state.providerAuth);

  const [data, setData] = React.useState<any>([]);
  const [value, setValue] = React.useState(false);

  const path = location.pathname.split("/")[1];

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  //   if (newValue === 0) {
  //     navigate("/viewFacility");
  //   }
  //   if (newValue === 1) {
  //     navigate("/listService");
  //   }
  // };

  React.useEffect(() => {
    var previouslocation = location.state !== null ? true : false;
    if (data.length === 0 || previouslocation) {
      setValue(true);
      axiosPrivate
        .get(`/organization/getOrganizationByProvider?providerID=${userID}`)
        .then((res) => {
          const resData = res.data.data;
          if (resData.length === 0) {
            navigate("/provider/org");
          } else {
            dispatch(organizationEdit(resData));
            setData(res.data.data);
            setValue(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [getData]);

  let isAuth =
    path === "provider" &&
    authUser.login.userType === "PROVIDER" &&
    (authUser.login.token !== null || undefined || "") &&
    authUser.providerLogoutButton;

  return isAuth ? (
    <Grid container columnSpacing={"1rem"} sx={{}}>
      {!value && data.length !== 0 ? (
        <>
          <Grid
            item
            md={4}
            lg={2.5}
            sx={{
              display: { xs: "none", md: data.length === 0 ? "none" : "block" },
            }}
          >
            <OrganizationLandingView />
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={data.length === 0 ? 12 : 8}
            lg={data.length === 0 ? 12 : 9.5}
          >
            {getData !== "org" && getData !== "editOrg" ? (
              // <Box sx={{ m: 0, p: 0 }}>
              //   <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              //     <Tabs value={value} onChange={handleChange}>
              //       <Tab label="Facility " {...a11yProps(0)} />
              //       <Tab label="Services" {...a11yProps(1)} />
              //     </Tabs>
              //   </Box>

              //   {value === 0 ? (
              //     <TabPanel value={value} index={0}>
              //       {children}
              //     </TabPanel>
              //   ) : (
              //     <TabPanel value={value} index={1}>
              //       {children}
              //     </TabPanel>
              //   )}
              // </Box>

              <Grid
                container
                item
                xs={12}
                display={"flex"}
                flexDirection="column"
                gap={{ xs: "0.5rem", md: "0.5rem" }}
              >
                <OrganizationNav />
                <Divider />
                <Paper
                  elevation={5}
                  sx={{
                    backgroundColor: "primary.light",
                    padding: { xs: "0.5rem", md: "1.8rem" },
                    // ml:{xs:"1.6rem",md:"0"},
                    height: { xs: "83.5vh", md: "83.5vh" },
                    // width:{xs:"300px",sm:"100%"},
                    "&::-webkit-scrollbar": {
                      width: { xs: 0, md: 15 },
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: { md: "grey" },
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: { md: "#AAC9DD" },
                      borderRadius: { md: 2 },
                    },
                    overflowX: { xs: "hidden" },
                  }}
                >
                  {children}
                </Paper>
              </Grid>
            ) : (
              <>{children}</>
            )}
          </Grid>
        </>
      ) : (
        <Grid item xs={12}>
          {getData !== "org" ? (
            <Box
              sx={{
                backgroundColor:"primary.light",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "84vh",
              }}
            >
              <Box>
                <CircularProgress color="inherit" size={50} />
                <Typography>Loading</Typography>
              </Box>
            </Box>
          ) : (
            <>{children}</>
          )}
        </Grid>
      )}
    </Grid>
  ) : (
    <Navigate to="/provider/home" replace />
  );
};

export default ProtectedRoute;
