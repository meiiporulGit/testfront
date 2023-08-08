import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Grid, Paper } from "@mui/material";
import axios from "axios";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//comp
import { Buttoncomponent } from "../../Components/Buttoncomp";
//redux store
import { useAppSelector, useAppDispatch } from "../../Redux/Hook";
import { facilityInfo } from "../../Redux/ProviderRedux/facilitySlice";
import {
  serviceInfo,
  facilitynameInfo,
} from "../../Redux/ProviderRedux/serviceSlice";
import { axiosPrivate, baseURL } from "../../axios/axios";
import {
  ArrowDropDown,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
// import {editButton} from "../../Redux/LoginSlice"

interface forminitialValues {
  providerID: string;
  facilityID: string;
  facilityNPI?: string;
  facilityName: string;
  facilityType: {
    MainfacilityType: string;
    OthersfacilityType: string;
  };
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: string;
  email: string;
}



interface facilityProps {
  FacilityDetails: any;
}

export default function ViewFacility() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [page1, setPage1] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(-1);
  const [view, setView] = useState<boolean>(false);
  const [data, setData] = useState([] as forminitialValues[]);
  console.log(data, "datinfo");
  const itemsPerPage = 5;
  const [noOfPages] = useState(Math.ceil(data.length / itemsPerPage));
  const dispatch = useAppDispatch();
  const getid = useAppSelector(
    (state: { providerAuth: { login: any } }) => state.providerAuth.login
  );

  const facilityinput = useAppSelector(
    (state: { providerFacility: { fData: any } }) =>
      state.providerFacility.fData
  );
  console.log(facilityinput, "viewinput");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // const facilityDetails = await axios.get('http://localhost:5200/facility/getFacilityList')
    const facilityDetails = await axiosPrivate.get(
      `/facility/getFacilityByProvider?providerID=${getid.userID}`
    );
    setData(facilityDetails.data.data);
    dispatch(facilitynameInfo(facilityDetails.data.data));
  };

  const Pointer = { cursor: "hand" };

  // const deleteFacility = async (event: any, id: number) => {
  //   //event.persist();
  //   await axiosPrivate
  //     .delete(
  //       `/facility/deleteFacility?facilityID=${facilityinput.facilityID}`,

  //       facilityinput
  //     )
  //     .then((data) => {
  //       getData();
  //     });
  // };

  //Table Pagination
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  function getFacilityType(id: any) {
    switch (id) {
      case "FACT-1":
        return "1-Primary Care";
      case "FACT-2":
        return "2-Urgent Care";
      case "FACT-3":
        return "3-Dentist Office";
      case "FACT-4":
        return "4-Imaging and Laboratory";
      case "FACT-5":
        return "5-Hospital";
      case "FACT-6":
        return "6-Others";
    }
  }

  

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {

  //   setPage(value);
  // };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage1(value);
  };
  interface facilityProps {
    forminitialValues: any;
  }

  return (
    // <Paper sx={{ backgroundColor: "primary.light" }}>
    <Grid container justifyContent="center" display="flex">
      <TableContainer
        component={Box}
        // elevation={3}
        sx={{
          //  m:"-20px 0px 0 -20px",
          width: "100%",
          backgroundColor: "primary.light",
          //  borderRadius: '10px',
          //  m: '0em 0 1em 0em',
          //  padding:"1rem 2.5rem 0 2.5rem"
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                padding: { md: "1.2rem" },
                textAlign: "left",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Facility List
            </Typography>
          </Grid>
          <Grid container item xs={12} sm={6} justifyContent={{ xs: "right" }}>
            <Link
              to="/provider/facility/addFacility"
              style={{ textDecoration: "none" }}
            >
              <Buttoncomponent
                fullWidth={false}
                variant="contained"
                type="button"
                // size="large"
                sx={{
                  backgroundColor: "secondary.dark",
                  width: { xs: "35vw", sm: "12vw" },
                  color: "#fff",
                  "&:hover": {
                    color: "secondary.dark",
                    border: "1px solid blue",
                  },
                  m: "1.5rem",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  // ml: { xs: 0 }
                }}
              >
                Add Facility
              </Buttoncomponent>
            </Link>
          </Grid>
        </Grid>

        <Grid item sx={{ justifyContent: "center" }}>
          <Table
            sx={{ maxWidth: "100%", display: { xs: "none", md: "block" } }}
          >
            <TableHead sx={{ backgroundColor: "secondary.light" }}>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Facility NPI
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textAlign: "center",

                    width: { md: "250px" },
                  }}
                >
                  Facility Name
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    width: { md: "200px" },
                  }}
                >
                  Facility Type
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    width: { md: "250px" },
                  }}
                >
                  Address
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Contact
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    width: { md: "250px" },
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((facility, i) => (
                <TableRow
                  key={facility.facilityNPI}
                  sx={{
                    backgroundColor: (i + 1) % 2 === 0 ? "#B4C8FC" : "white",
                  }}
                >
                  <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                    {facility.facilityNPI}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                    {facility.facilityName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                    {/* {(getFacilityType((facility.facilityType.MainfacilityType)))} */}
                    {/* {JSON.stringify(facility.facilityType.MainfacilityType)} */}
                     {((facility.facilityType.MainfacilityType !== null)) ? (getFacilityType(facility.facilityType.MainfacilityType)) : (getFacilityType(facility.facilityType.OthersfacilityType))}
                    {/* {(facility.facilityType.MainfacilityType !== null) ? facility.facilityType.MainfacilityType : facility.facilityType.OthersfacilityType} */}
                    {/* {(facility.facilityType.MainfacilityType === "_01") ? 
             "1-Primary Care" :(facility.facilityType.MainfacilityType === "_02")?
             "2-Urgent Care":(facility.facilityType.MainfacilityType === "_03")?
             "3-Dentist Office":(facility.facilityType.MainfacilityType === "_04")?
            "4- Imaging and Laboratory" : (facility.facilityType.MainfacilityType === "_05")?
          "5- Hospital":(facility.facilityType.MainfacilityType === "_06")? "6- Others" : facility.facilityType.OthersfacilityType } */}
                    {/* {(facility.facilityType.MainfacilityType !== null) ? facility.facilityType.OthersfacilityType : ""}  */}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                    <p style={{ margin: "0px" }}>
                      {facility.address.addressLine1}
                      <span style={{ marginLeft: "10px" }}>
                        {facility.address.addressLine2}
                      </span>{" "}
                    </p>
                    <p style={{ margin: "0px" }}>
                      {facility.address.city}
                      <span style={{ marginLeft: "10px" }}>
                        {facility.address.state}
                      </span>{" "}
                    </p>
                    <p style={{ margin: "0px " }}>{facility.address.zipCode}</p>
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                    {facility.contact}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                    {facility.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      marginLeft: "1rem",
                      borderBottom: "none",
                    }}
                  >
                    <IconButton
                      style={Pointer}
                      onClick={() => {
                        dispatch(facilityInfo(facility));
                        // dispatch(editButton())
                        navigate("/provider/facility/update");
                      }}
                    >
                      <EditIcon style={Pointer} />
                    </IconButton>
                    <IconButton
                      style={Pointer}
                      onClick={() => setView(true)}
                      // onClick={() => {
                      //   dispatch(facilityInfo({ facility }));
                      //   axiosPrivate
                      //     .delete(
                      //       `/facility/deleteFacility?facilityNPI=${facility.facilityNPI}`,
                      //       facilityinput
                      //     )
                      //     .then(() => {
                      //       toast.success("Successfully Deleted");
                      //       getData();
                      //     });
                      // }}
                    >
                      <DeleteIcon style={Pointer} />
                    </IconButton>

                    <Dialog
                      open={view}
                      sx={{
                        "& .MuiDialog-container": {
                          justifyContent: "flex-center",
                          alignItems: "flex-start",
                        },
                      }}
                      PaperProps={{
                        elevation: 0,

                        sx: {
                          border: "solid 1px gray",
                          backgroundColor: "#f44336",
                          m: 0,
                          top: 20,
                          left: 30,
                        },
                      }}
                      hideBackdrop
                      onClose={() => setView(false)}
                    >
                      <DialogContent sx={{ color: "#fff" }}>
                        Do you wish to confirm delete?
                      </DialogContent>

                      <DialogActions>
                        <Button
                          sx={{
                            backgroundColor: "#fff",
                            color: "#000",
                            "&:hover": {
                              backgroundColor: "#fff",
                              color: "#000",
                              border: "#fff",
                            },
                          }}
                          onClick={() => {
                            dispatch(facilityInfo({ facility }));
                            axiosPrivate
                              .delete(
                                `/facility/deleteFacility?facilityNPI=${facility.facilityNPI}`,
                                facilityinput
                              )
                              .then(() => {
                                toast.success("Successfully Deleted");
                                getData();
                              });
                            setView(false);
                          }}
                        >
                          Yes
                        </Button>
                        <Button
                          sx={{
                            backgroundColor: "#fff",
                            color: "#000",
                            "&:hover": {
                              backgroundColor: "#fff",
                              color: "#000",
                              border: "#fff",
                            },
                          }}
                          onClick={() => setView(false)}
                          autoFocus
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>

                    <IconButton
                      onClick={() => {
                        dispatch(serviceInfo(facility));
                        // dispatch(editButton())
                        navigate("/provider/facility/pricelistlanding");
                      }}
                    >
                      <MedicalServicesIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} of ${count !== -1 ? count : ` ${to}}`}`
                  }
                  backIconButtonProps={{
                    color: "secondary",
                  }}
                  nextIconButtonProps={{ color: "secondary" }}
                  showFirstButton={true}
                  showLastButton={true}
                  labelRowsPerPage={<span>Rows:</span>}
                  sx={{
                    ".MuiTablePagination-toolbar": {
                      backgroundColor: "primary.light",
                      // "rgba(100,100,100,0.5)"
                    },
                    ".MuiTablePagination-selectLabel, .MuiTablePagination-input":
                      {
                        fontWeight: "bold",
                        color: "#173A5E",
                      },
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
            }}
          >
            {(itemsPerPage > 0
              ? data.slice((page1 - 1) * itemsPerPage, page1 * itemsPerPage)
              : data
            ).map((facility, index) => (
              <>
                <Paper
                  sx={{ padding: "0.5rem", m: "0.2rem", fontSize: "0.9rem" }}
                >
                  <IconButton
                    onClick={() => setOpen(open === index ? -1 : index)}
                  >
                    <ArrowDropDown
                      sx={{
                        transform:
                          open === index ? "initial" : "rotate(-90deg)",
                      }}
                    />
                    {/* {open === index ? (<KeyboardArrowUp />) : (<KeyboardArrowDown />)} */}
                  </IconButton>
                  {facility.facilityName}
                </Paper>

                <Collapse in={open === index} timeout="auto" unmountOnExit>
                  <Paper
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mt: "0.2rem",
                      padding: "1rem",
                    }}
                  >
                    <Typography sx={{ display: "flex" }}>
                      <Typography sx={{ color: "blue", fontSize: "1rem" }}>
                        Facility NPI
                        <span style={{ margin: "0 1rem 0 1.5rem" }}>:</span>
                      </Typography>
                      <Typography sx={{ ml: "0.2rem", fontSize: "0.9rem" }}>
                        {facility.facilityNPI}
                      </Typography>
                    </Typography>
                    <Typography sx={{ display: "flex" }}>
                      <Typography sx={{ color: "blue", fontSize: "1rem" }}>
                        Facility Type
                        <span style={{ margin: "0 1.2rem 0 1rem" }}>:</span>
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.9rem", textAlign: "center" }}
                      >
                        {facility.facilityType.MainfacilityType !== null
                          ? getFacilityType(facility.facilityType.MainfacilityType)
                          : (getFacilityType(facility.facilityType.OthersfacilityType))}
                      </Typography>
                    </Typography>
                    <Typography
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <Typography sx={{ color: "blue", fontSize: "1rem" }}>
                        {" "}
                        Address
                        <span style={{ margin: "0 0rem 0 2.8rem" }}>:</span>
                      </Typography>
                      <Typography sx={{ ml: "1.5rem", fontSize: "0.9rem" }}>
                        {facility.address.addressLine1},<br></br>
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {facility.address.city}, {facility.address.state}
                        </Typography>
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {facility.address.zipCode}
                        </Typography>
                      </Typography>
                    </Typography>
                    <Typography sx={{ display: "flex" }}>
                      <Typography sx={{ color: "blue", fontSize: "1rem" }}>
                        Email
                        <span style={{ margin: "0 0.8rem 0 4rem" }}>:</span>
                      </Typography>
                      <Typography sx={{ ml: "0.7rem", fontSize: "0.9rem" }}>
                        {facility.email}
                      </Typography>
                    </Typography>
                    <Typography sx={{ display: "flex" }}>
                      <Typography sx={{ color: "blue", fontSize: "1rem" }}>
                        Contact
                        <span style={{ margin: "0 0.9rem 0 2.95rem" }}>:</span>
                      </Typography>
                      <Typography sx={{ ml: "0.5rem", fontSize: "0.9rem" }}>
                        {facility.contact}
                      </Typography>
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <IconButton
                        style={Pointer}
                        onClick={() => {
                          dispatch(facilityInfo(facility));
                          navigate("/provider/facility/update");
                        }}
                      >
                        <EditIcon style={Pointer} />
                      </IconButton>
                      <IconButton
                        style={Pointer}
                        onClick={() => {
                          dispatch(facilityInfo({ facility }));
                          axiosPrivate
                            .delete(
                              `/facility/deleteFacility?facilityNPI=${facility.facilityNPI}`,
                              facilityinput
                            )
                            .then(() => {
                              toast.success("Successfully Deleted");
                              getData();
                            });
                        }}
                      >
                        <DeleteIcon style={Pointer} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          dispatch(serviceInfo(facility));
                          navigate("/provider/facility/pricelistlanding");
                        }}
                      >
                        <MedicalServicesIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                </Collapse>
              </>
            ))}
            {/* <Stack spacing={2}>
              <Typography>Page: {page}</Typography>
              <Pagination sx={{ display: "flex", justifyContent: "center" }} count={10} page={page} onChange={handleChange} />
            </Stack> */}
            <Box sx={{ padding:"1rem" }} component="span">
              <Pagination
                sx={{ display: "flex", justifyContent: "center" }}
                //  count={data.length % 5 === 0 ? Math.ceil(data.length / 5) : Math.ceil(data.length / 5 + 1)}
                count={Math.ceil(data.length / itemsPerPage)}
                page={page1}
                siblingCount={0}
                onChange={handlePageChange}
                defaultPage={1}
                color="primary"
                size="small"
                showFirstButton
                showLastButton
              />
            </Box>
          </Box>
        </Grid>
      </TableContainer>
    </Grid>
    // </Paper>
  );
}

// import { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Collapse,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableFooter,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Typography,

// } from "@mui/material";
// import { Grid, Paper } from "@mui/material";
// import axios from "axios";

// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// //comp
// import { Buttoncomponent } from "../../Components/Buttoncomp";
// //redux store
// import { useAppSelector, useAppDispatch } from "../../Redux/Hook";
// import { facilityInfo } from "../../Redux/ProviderRedux/facilitySlice";
// import { serviceInfo, facilitynameInfo } from "../../Redux/ProviderRedux/serviceSlice";
// import { axiosPrivate, baseURL } from "../../axios/axios";
// import { ArrowDropDown, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
// // import {editButton} from "../../Redux/LoginSlice"

// interface forminitialValues {
//   providerID: string;
//   facilityID: string;
//   facilityNPI?: string;
//   facilityName: string;
//   facilityType: {
//     MainfacilityType: string;
//     OthersfacilityType: string;
//   };
//   address: {
//     addressLine1: string;
//     addressLine2?: string;
//     city: string;
//     state: string;
//     zipCode: string;
//   };
//   contact: string;
//   email: string;
// }
// interface facilityProps {
//   FacilityDetails: any;

// }

// export default function ViewFacility() {
//   const navigate = useNavigate();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [open, setOpen] = useState(-1)
//   const [view, setView] = useState<boolean>(false);
//   const [data, setData] = useState([] as forminitialValues[]);
//   console.log(data, "datinfo");
//   const dispatch = useAppDispatch();
//   const getid = useAppSelector(
//     (state: { providerAuth: { login: any } }) => state.providerAuth.login
//   );

//   const facilityinput = useAppSelector(
//     (state: { providerFacility: { fData: any } }) => state.providerFacility.fData
//   );
//   console.log(facilityinput, "viewinput");

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     // const facilityDetails = await axios.get('http://localhost:5200/facility/getFacilityList')
//     const facilityDetails = await axiosPrivate.get(
//       `/facility/getFacilityByProvider?providerID=${getid.userID}`
//     );
//     setData(facilityDetails.data.data);
//     dispatch(facilitynameInfo(facilityDetails.data.data))
//   };

//   const Pointer = { cursor: "hand" };

//   // const deleteFacility = async (event: any, id: number) => {
//   //   //event.persist();
//   //   await axiosPrivate
//   //     .delete(
//   //       `/facility/deleteFacility?facilityID=${facilityinput.facilityID}`,

//   //       facilityinput
//   //     )
//   //     .then((data) => {
//   //       getData();
//   //     });
//   // };

//   //Table Pagination
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

//   const handleChangePage = (
//     event: React.MouseEvent<HTMLButtonElement> | null,
//     page: number
//   ) => {
//     setPage(page);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//   interface facilityProps {
//     forminitialValues: any
//   }

//   return (
//     // <Paper sx={{ backgroundColor: "primary.light" }}>
//     <Grid container justifyContent='center' display='flex'>
//       <TableContainer
//         component={Box}
//         // elevation={3}
//         sx={{
//           //  m:"-20px 0px 0 -20px",
//           width: "100%",
//           backgroundColor: "primary.light",
//           //  borderRadius: '10px',
//           //  m: '0em 0 1em 0em',
//           //  padding:"1rem 2.5rem 0 2.5rem"
//         }}
//       >
//         <Grid container>
//           <Grid item xs={12} sm={6}>
//             <Typography
//               sx={{
//                 padding: { md: "1.2rem" },
//                 textAlign: "left",
//                 fontSize: "1.2rem",
//                 fontWeight: "bold",
//               }}
//             >
//               Facility List
//             </Typography>
//           </Grid>
//           <Grid container item xs={12} sm={6} justifyContent={{ xs: "right" }}>
//             <Link to="/provider/facility/addFacility" style={{ textDecoration: "none" }}>
//               <Buttoncomponent
//                 fullWidth={false}
//                 variant="contained"
//                 type="button"
//                 // size="large"
//                 sx={{
//                   backgroundColor: "secondary.dark",
//                   width: { xs: "35vw", sm: "12vw" },
//                   color: "#fff",
//                   "&:hover": {
//                     color: "secondary.dark",
//                     border: "1px solid blue",
//                   },
//                   m: "1.5rem",
//                   fontSize: { xs: "0.9rem", md: "1rem" }
//                   // ml: { xs: 0 }
//                 }}
//               >
//                 Add Facility
//               </Buttoncomponent>
//             </Link>
//           </Grid>
//         </Grid>

//         <Grid item sx={{ justifyContent: "center" }}>
//           <Table sx={{ maxWidth: "100%", display: { xs: "none", md: "block" } }}>
//             <TableHead sx={{ backgroundColor: "secondary.light" }}>
//               <TableRow>
//                 <TableCell
//                   sx={{
//                     fontSize: "1rem",
//                     fontWeight: "bold",
//                     textAlign: "center",
//                   }}
//                 >
//                   Facility NPI
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontSize: "1rem",
//                     fontWeight: "bold",
//                     textAlign: "center",

//                     width: { md: "250px" }
//                   }}
//                 >
//                   Facility Name
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontSize: "1rem",
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     width: { md: "200px" }
//                   }}
//                 >
//                   Facility Type
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontSize: "1rem",
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     width: { md: "250px" }
//                   }}
//                 >
//                   Address
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontSize: "1rem",
//                     fontWeight: "bold",
//                     textAlign: "center",

//                   }}
//                 >
//                   Contact
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontSize: "1rem",
//                     fontWeight: "bold",
//                     textAlign: "center",
//                   }}
//                 >
//                   Email
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontSize: "1rem",
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     width: { md: "250px" }
//                   }}
//                 >
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {(rowsPerPage > 0
//                 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 : data
//               ).map((facility, i) => (
//                 <TableRow key={facility.facilityNPI} sx={{ backgroundColor: (i + 1) % 2 === 0 ? "#B4C8FC" : "white" }}>
//                   <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
//                     {facility.facilityNPI}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
//                     {facility.facilityName}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
//                     {(facility.facilityType.MainfacilityType !== null) ? facility.facilityType.MainfacilityType : facility.facilityType.OthersfacilityType}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
//                     <p style={{ margin: "0px" }}>
//                       {facility.address.addressLine1}
//                       <span style={{ marginLeft: "10px" }}>
//                         {facility.address.addressLine2}
//                       </span>{" "}
//                     </p>
//                     <p style={{ margin: "0px" }}>
//                       {facility.address.city}
//                       <span style={{ marginLeft: "10px" }}>
//                         {facility.address.state}
//                       </span>{" "}
//                     </p>
//                     <p style={{ margin: "0px " }}>{facility.address.zipCode}</p>
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
//                     {facility.contact}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
//                     {facility.email}
//                   </TableCell>
//                   <TableCell sx={{ display: "flex", marginLeft: "1rem",borderBottom:"none" }}>
//                     <IconButton
//                       style={Pointer}
//                       onClick={() => {
//                         dispatch(facilityInfo(facility));
//                         // dispatch(editButton())
//                         navigate("/provider/facility/update");
//                       }}
//                     >
//                       <EditIcon style={Pointer} />
//                     </IconButton>
//                     <IconButton
//                       style={Pointer}
//                       onClick={() => setView(true)}
//                     // onClick={() => {
//                     //   dispatch(facilityInfo({ facility }));
//                     //   axiosPrivate
//                     //     .delete(
//                     //       `/facility/deleteFacility?facilityNPI=${facility.facilityNPI}`,
//                     //       facilityinput
//                     //     )
//                     //     .then(() => {
//                     //       toast.success("Successfully Deleted");
//                     //       getData();
//                     //     });
//                     // }}
//                     >
//                       <DeleteIcon style={Pointer} />
//                     </IconButton>

//                     <Dialog
//                       open={view}
//                       sx={{
//                         "& .MuiDialog-container": {
//                           justifyContent: "flex-center",
//                           alignItems: "flex-start"
//                         }
//                       }}
//                       PaperProps={{
//                         elevation: 0,

//                         sx: {
//                           border: "solid 1px gray",
//                           backgroundColor:"#f44336",
//                           m: 0,
//                           top: 20,
//                           left: 30
//                         }
//                       }}
//                       hideBackdrop

//                       onClose={() => setView(false)}
//                     >
//                       <DialogContent sx= {{color:"#fff"}}>
//                         Do you wish to confirm delete?
//                       </DialogContent>

//                       <DialogActions>
//                         <Button
//                          sx={{
//                            backgroundColor: "#fff",
//                           color: "#000",
//                           "&:hover": {
//                             backgroundColor: "#fff",
//                             color: "#000",
//                             border: "#fff",
//                           },
//                         }}
//                         onClick={() => {
//                           dispatch(facilityInfo({ facility }));
//                           axiosPrivate
//                             .delete(
//                               `/facility/deleteFacility?facilityNPI=${facility.facilityNPI}`,
//                               facilityinput
//                             )
//                             .then(() => {
//                               toast.success("Successfully Deleted");
//                               getData();
//                             });
//                           setView(false)
//                         }}>
//                           Yes
//                         </Button>
//                         <Button
//                          sx={{
//                           backgroundColor: "#fff",
//                          color: "#000",
//                          "&:hover": {
//                            backgroundColor: "#fff",
//                            color: "#000",
//                            border: "#fff",
//                          },
//                        }}
//                         onClick={() => setView(false)} autoFocus>
//                           Cancel
//                         </Button>
//                       </DialogActions>
//                     </Dialog>

//                     <IconButton
//                       onClick={() => {
//                         dispatch(serviceInfo(facility));
//                         // dispatch(editButton())
//                         navigate("/provider/facility/pricelistlanding");
//                       }}
//                     >
//                       <MedicalServicesIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//             <TableFooter>
//               <TableRow>
//                 <TablePagination
//                   rowsPerPageOptions={[5, 10, 25]}
//                   count={data.length}
//                   rowsPerPage={rowsPerPage}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                   labelDisplayedRows={({ from, to, count }) =>
//                     `${from}-${to} of ${count !== -1 ? count : ` ${to}}`}`
//                   }
//                   backIconButtonProps={{
//                     color: "secondary",
//                   }}
//                   nextIconButtonProps={{ color: "secondary" }}
//                   showFirstButton={true}
//                   showLastButton={true}
//                   labelRowsPerPage={<span>Rows:</span>}
//                   sx={{
//                     ".MuiTablePagination-toolbar": {
//                       backgroundColor: "primary.light",
//                       // "rgba(100,100,100,0.5)"
//                     },
//                     ".MuiTablePagination-selectLabel, .MuiTablePagination-input":
//                     {
//                       fontWeight: "bold",
//                       color: "#173A5E",
//                     },
//                   }}
//                 />
//               </TableRow>
//             </TableFooter>
//           </Table>

//           <Box sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column" }}>
//             {data.map((facility, index) => (
//               <><Paper sx={{ padding: "0.5rem", m: "0.2rem", fontSize: "0.9rem" }}>

//                 <IconButton onClick={() => setOpen(open === index ? -1 : index)}>
//                   <ArrowDropDown sx={{ transform: open === index ? 'initial' : 'rotate(-90deg)' }} />
//                   {/* {open === index ? (<KeyboardArrowUp />) : (<KeyboardArrowDown />)} */}
//                 </IconButton>

//                 {facility.facilityName}

//               </Paper>

//                 <Collapse in={open === index} timeout="auto" unmountOnExit >
//                   <Paper sx={{ display: "flex", flexDirection: "column", mt: "0.2rem", padding: "1rem" }}>
//                     <Typography sx={{ display: "flex" }}> <Typography sx={{ color: "blue", fontSize: "1rem", }}>Facility NPI </Typography><Typography sx={{ ml: "0.2rem", fontSize: "0.9rem" }}>:  {facility.facilityNPI}</Typography></Typography>
//                     <Typography sx={{ display: "flex", justifyContent: "flex-start", }}><Typography sx={{ color: "blue", fontSize: "1rem" }}>  Address </Typography><Typography sx={{ ml: "1.5rem", fontSize: "0.9rem" }}>: {facility.address.addressLine1},<br></br><Typography sx={{ ml: "0.5rem", fontSize: "0.9rem" }}>{facility.address.city},{facility.address.state}</Typography><Typography sx={{ ml: "0.5rem", fontSize: "0.9rem" }}>{facility.address.zipCode}</Typography></Typography></Typography>
//                     <Typography sx={{ display: "flex" }}><Typography sx={{ color: "blue", fontSize: "1rem" }}>  Email </Typography><Typography sx={{ ml: "0.7rem", fontSize: "0.9rem" }}>:  {facility.email}</Typography></Typography>
//                     <Typography sx={{ display: "flex" }}> <Typography sx={{ color: "blue", fontSize: "1rem" }}> Contact </Typography><Typography sx={{ ml: "0.5rem", fontSize: "0.9rem" }}>:  {facility.contact}</Typography></Typography>
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}><IconButton
//                       style={Pointer}
//                       onClick={() => {
//                         dispatch(facilityInfo(facility))
//                         navigate("/provider/facility/update");
//                       }}
//                     >
//                       <EditIcon style={Pointer} />
//                     </IconButton>
//                       <IconButton
//                         style={Pointer}
//                         onClick={() => {
//                           dispatch(facilityInfo({ facility }));
//                           axiosPrivate
//                             .delete(
//                               `/facility/deleteFacility?facilityNPI=${facility.facilityNPI}`,
//                               facilityinput
//                             )
//                             .then(() => {
//                               toast.success("Successfully Deleted");
//                               getData();
//                             });
//                         }}
//                       >
//                         <DeleteIcon style={Pointer} />
//                       </IconButton>
//                       <IconButton
//                         onClick={() => {
//                           dispatch(serviceInfo(facility));
//                           navigate("/provider/facility/pricelistlanding");
//                         }}
//                       >
//                         <MedicalServicesIcon />
//                       </IconButton></Box>
//                   </Paper>
//                 </Collapse></>

//             ))}

//           </Box>
//         </Grid>
//       </TableContainer>
//     </Grid>
//     // </Paper>
//   );
// }
