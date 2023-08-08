import React from "react";

import { Box, Grid, Typography, Paper, Container } from "@mui/material";

import { axiosPrivate, baseURL } from "../../axios/axios";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import ViewFacility from "../Facility/ViewFacility";
import {
  organizationEdit,
  organizationImage,
} from "../../Redux/ProviderRedux/orgSlice";
// import { editButton } from "../../Redux/LoginSlice";
import { Navigate, useNavigate } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ContactsIcon from "@mui/icons-material/Contacts";
import DefaultUserPic from "../../Images/DefaultUserpic.jpg";
import icon from "../../Images/icon.jpg";
// interface Props {
//   data: any;
// }

const OrganizationLandingView = () => {
  const [popUp, setPopUp] = React.useState<boolean>(false);
  const userID = useAppSelector((state) => state.providerAuth.login.userID);
  const data=useAppSelector(state=>state.providerOrganization.orgEditData)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const typo = "1.2rem";
  console.log(userID);

  return (
    <>
      {data.length !== 0 ? (
        // <Grid container >
        <Box>
          {/* <Box sx={{ display: "flex", width:"20%"}}> */}
          <Paper
            
            square
            sx={{
              padding:{xs:0,md:"1.5rem"} ,
              backgroundColor:{xs:"transparent",md:"primary.light"} ,
              boxShadow:{xs:"none",md:5} 
              // borderRadius: "15px",
              //  m: "0em 1em 1em 0em",
              //  width:"19%"
              // m:"1rem 2rem 1rem 2rem"
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {/* <Grid item xs={3} sx={{ display: "flex", flexDirection: "column"}}> */}
              {/* <Typography
                noWrap
                sx={{
                  padding: "1rem 1rem 1rem 2rem",
                  textAlign: "left",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Organization Detail
              </Typography> */}
               <Typography sx={{  m: "0 0 0 0.5rem",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    textAlign:"center"
                    // letterSpacing: "0.2rem" 
                  }}>
                {data[0].organizationName}
              </Typography>
              <Box>
                <img
                  src={
                    data[0].orgImg
                      ? `${baseURL}/${data[0].orgImg}`
                      : icon
                  }
                  style={{
                    width: "157px",
                    height: "157px",
                    position: "relative",
                    left: "21%",
                    border: "2px solid white",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", m: "0.5rem" }}>
                <PlaceIcon />
                <Typography
                  sx={{
                    m: "0 0 0 0.5rem",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    letterSpacing: "0.2rem",
                  }}
                >
                  Location
                </Typography>
              </Box>
              {/* <Typography sx={{ ml: "2.5rem" }}>
                {data[0].organizationName}
              </Typography> */}
              <Typography sx={{ ml: "2.5rem" }}>
                <Box sx={{ display: "flex" }}>
                  {data[0].address.addressLine1}
                  
                </Box>
                <Box >
                    {data[0].address.addressLine2}
                  </Box>
                <Box sx={{ display: "flex" }}>
                  {data[0].address.city} 
                  <Box sx={{ ml: "0.5rem" }}>{data[0].address.state}</Box>                
                </Box>
                
                  <Box sx={{  mb: "0.5rem" }}>{data[0].address.zipCode}</Box>
              </Typography>
              <Box sx={{ display: "flex", m: "0.3rem" }}>
                <PhoneIcon />
                <Typography sx={{ m: "0 0 0.5rem 0.5rem" }}>
                  {data[0].contact}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", m: "0.3rem" }}>
                <EmailIcon />
                <Typography sx={{ ml: "0.5rem" }}>{data[0].email}</Typography>
              </Box>

              <Box
                sx={{ display: "flex", flexDirection: "column", mt: "1.5rem" }}
              >
                <Box sx={{ display: "flex", m: "0.5rem" }}>
                  <ContactsIcon />
                  <Typography
                    sx={{
                      ml: "0.5rem",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      letterSpacing: "0.2rem",
                    }}
                  >
                    Contact Person
                  </Typography>
                </Box>
                <Typography sx={{ ml: "2.5rem" }}>
                  <Box sx={{ display: "flex" }}>
                    {data[0].contactPerson.firstName}
                    <Box sx={{ ml: "0.5rem" }}>
                      {data[0].contactPerson.lastName}
                    </Box>
                  </Box>
                </Typography>

                <Typography
                  sx={{ display: "flex", ml: "2.5rem", mb: "0.5rem" }}
                >
                  {data[0].contactPerson.role}
                </Typography>

                <Box sx={{ display: "flex", m: "0.3rem" }}>
                  <PhoneIcon />
                  <Typography sx={{ m: "0 0 0.5rem 0.5rem" }}>
                    {data[0].contactPerson.contact}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", m: "0.3rem 0 0.5rem 0" }}>
                  <EmailIcon />
                  <Typography sx={{ ml: "0.5rem" }}>
                    {" "}
                    {data[0].contactPerson.email}
                  </Typography>
                </Box>
              </Box>
              <Grid container item justifyContent="right">
                <Buttoncomponent
                  type="submit"
                  size="large"
                  fullWidth={false}
                  variant="contained"
                  onClick={() => {
                    // dispatch(organizationEdit({ ...data[0] }));
                    dispatch(organizationImage(data[0].orgImg));
                    // dispatch(editButton())
                    navigate("/provider/editOrg");
                  }}
                  sx={{
                    fontSize: "0.8rem",
                    mt: "0.5rem",
                    backgroundColor: "secondary.dark",
                    width: "10vw",
                    color: "#fff",
                    "&:hover": {
                      color: "secondary.dark",
                      border: "1px solid blue",
                      // letterSpacing: "0.2rem",
                      fontSize: "1rem",
                    },
                  }}
                >
                  Edit
                </Buttoncomponent>
              </Grid>
              {/* </Grid> */}
            </Box>
          </Paper>
          {/* </Box> */}
          {/* <Grid item xs={9}> */}
          {/* <Box sx={{  width:"80%"}}>
            <ViewFacility />
            </Box> */}
          {/* </Grid> */}
          {/* </Grid> */}
        </Box>
      ) : null
      // navigate("/org")
      }
    </>
  );
};

export default OrganizationLandingView;

// import React from "react";

// import { Box, Grid, Typography,Paper } from "@mui/material";

// import { axiosPrivate } from "../../axios/axios";
// import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
// import { Buttoncomponent } from "../../Components/Buttoncomp";

// import { organizationEdit } from "../../Redux/orgSlice";
// // import { editButton } from "../../Redux/LoginSlice";
// import { Navigate, useNavigate } from "react-router-dom";

// type Props = {};

// const OrganizationLandingView = (props: Props) => {
//   const [data, setData] = React.useState<any>([]);
//   const [popUp, setPopUp] = React.useState<boolean>(false);
//   const userID = useAppSelector((state) => state.auth.login.userID);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const typo="1.2rem"
//   console.log(userID);
//   React.useEffect(() => {
//     axiosPrivate
//       .get(`/organization/getOrganizationByProvider?providerID=${userID}`)
//       .then((res) => {
//         setData(res.data.data);
//         console.log(res.data.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <>
//       {data.length !== 0 ? (
//         <Box display={"flex"} justifyContent="center">
//           <Paper elevation={5} sx={{padding:"2rem",backgroundColor: "primary.light", maxWidth: '78vw', borderRadius: '15px'}}>
//         <Grid container justifyContent={"center"} >
//           <Grid container item justifyContent="right">
//             <Buttoncomponent
//               type="submit"
//               size="large"
//               fullWidth={false}
//               variant="contained"
//               onClick={() => {
//                 dispatch(organizationEdit({ ...data[0] }));
//                 // dispatch(editButton())
//                 navigate("/editOrg");
//               }}

//               sx={{
//                 fontSize:"1rem",
//                 mb:"0.5rem",
//                 backgroundColor: "secondary.dark",
//                 width: "15vw",
//                 color: "#fff",
//                 "&:hover": {
//                   color: "secondary.dark",
//                   border: "1px solid blue",
//                   // letterSpacing: "0.2rem",
//                   fontSize: "1rem",
//                 },
//               }}
//             >
//               Edit
//             </Buttoncomponent>
//           </Grid>

//           <Grid container rowGap="1rem" >

//             <Grid item xs={12}>
//               <Typography mb={"0.5rem"} sx={{
//                   backgroundColor: "#B4C8FC",
//                   padding: "0.3rem",
//                   textAlign: "center",
//                   fontSize: "2rem",
//                 }}>Organization Detail</Typography>
//             </Grid>

//             <Grid item xs={3} >
//               <Typography fontSize={typo}>Orgainzation ID</Typography>
//             </Grid>
//             <Grid item xs={1}>
//               <Typography fontSize={typo}>:</Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography fontSize={typo}>{data[0].organizationID}</Typography>
//             </Grid>
//             <Grid item xs={3}>
//               <Typography fontSize={typo}>Orgainzation Name</Typography>
//             </Grid>
//             <Grid item xs={1}>
//               <Typography fontSize={typo}>:</Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography fontSize={typo}>{data[0].organizationName}</Typography>
//             </Grid>
//             <Grid item xs={3}>
//               <Typography fontSize={typo}>Email</Typography>
//             </Grid>
//             <Grid item xs={1}>
//               <Typography fontSize={typo}>:</Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography fontSize={typo}>{data[0].email}</Typography>
//             </Grid>
//             <Grid item xs={3}>
//               <Typography fontSize={typo}>Address</Typography>
//             </Grid>
//             <Grid item xs={1}>
//               <Typography fontSize={typo}>:</Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography fontSize={typo}>
//                 {data[0].address.addressLine1}, {data[0].address.addressLine2}, {data[0].address.city}, {data[0].address.state}, {data[0].address.zipCode}
//               </Typography>
//             </Grid>
//             <Grid item xs={3}>
//               <Typography fontSize={typo}>Contact</Typography>
//             </Grid>
//             <Grid item xs={1}>
//               <Typography fontSize={typo}>:</Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography fontSize={typo}>{data[0].contact}</Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography mb={"0.5rem"} sx={{
//                   backgroundColor: "#B4C8FC",
//                   padding: "0.3rem",
//                   textAlign: "center",
//                   fontSize: "2rem",
//                 }}>Contact Person Detail</Typography>
//             </Grid>

//             <Grid item xs={3}>
//               <Typography fontSize={typo}>Name</Typography>
//             </Grid>
//             <Grid item xs={1}>
//               <Typography fontSize={typo}>:</Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography fontSize={typo}>{data[0].contactPerson.firstName} {data[0].contactPerson.lastName}</Typography>
//             </Grid>
//             <Grid item xs={3}>
//               <Typography fontSize={typo}>Role</Typography>
//             </Grid>
//             <Grid item xs={1}>
//               <Typography fontSize={typo}>:</Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography fontSize={typo}>{data[0].contactPerson.role}</Typography>
//             </Grid>
//             <Grid item xs={3}>
//               <Typography fontSize={typo}>Email</Typography>
//             </Grid>
//             <Grid item xs={1}>
//               <Typography fontSize={typo}>:</Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography fontSize={typo}>{data[0].contactPerson.email}</Typography>
//             </Grid>
//             <Grid item xs={3}>
//               <Typography fontSize={typo}>Contact No</Typography>
//             </Grid>
//             <Grid item xs={1}>
//               <Typography fontSize={typo}>:</Typography>
//             </Grid>
//             <Grid item xs={8}>
//               <Typography fontSize={typo}>{data[0].contactPerson.contact}</Typography>
//             </Grid>

//           </Grid>

//         </Grid>
//         </Paper>
//         </Box>
//       ) : (
//         navigate("/org")
//       )}
//     </>
//   );
// };

// export default OrganizationLandingView;
