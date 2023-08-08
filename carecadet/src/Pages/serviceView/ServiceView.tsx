import React, { useState, useEffect } from "react";
import { axiosPrivate } from "../../axios/axios";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";

import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Grid,
  Paper,
  Collapse,
} from "@mui/material";
import { toast } from "react-toastify";
import { ViewInfo } from "../../Redux/ProviderRedux/serviceViewSlice";
import { useNavigate } from "react-router-dom";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import { dataSearch } from "../../Redux/ProviderRedux/HomeSlice";
import { InsertDriveFile, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

interface rowProps {
  fac: any;
}
function TableRowRes({ fac }: rowProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // console.log(fac, "facilityRow");
  const [open, setOpen] = useState<boolean>(false);

  const viewOnClick = (path: any) => {
    if (path.status === "Pending") {
      toast.error("not verified");
    } else if (path.status === "published") {
      toast.error("already published");
    } else {
      dispatch(ViewInfo(path));
      navigate("/provider/serviceView/publishservice");
    }
  };
  return (
    <Paper elevation={5}>
      {/* <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton> */}

      <Typography
        textAlign={"justify"}
        sx={{
          backgroundColor: "#E4ECF7",
          // color: "blue",
          padding: "0.3rem",
          border:
            fac.status === "verified"
              ? "3px solid  orange"
              : "1px solid  green",
          "&:hover": {
            color: "secondary.dark",
            border: "1px solid blue",
          },
        }}
        onClick={() => {
          viewOnClick(fac);
          // dispatch(facilityInfo(facility));
          // dispatch(editButton())
          // navigate("/provider/facility/update");
        }}
      >
        {fac.filePath.split("/")[2]}{" "}
      </Typography>
    </Paper>
  );
}

const ServiceView = () => {
  const [pathData, setPathData] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const providerID = useAppSelector((state) => state.providerAuth.login.userID);
  const orgID = useAppSelector(
    (state) => state.providerOrganization.orgEditData
  );
  useEffect(() => {
    getData();
  }, []);
  // setInterval(() => {
  //   getData();
  // }, 60000);
  const getData = () => {
    axiosPrivate
      .get(
        `/pathPricelist/getPathByProvider?providerID=${providerID}&OrganizationID=${orgID[0].organizationID}`
      )
      .then((res) => {
        var resData = res.data.data;
        // const filterData = resData.filter(
        //   (d: any) => d.fileFormat !== "Non-Standard"
        // );
        setPathData(resData);
        console.log(res.data);
      });
  };
  const viewOnClick = (path: any) => {
    if (path.status === "Pending") {
      toast.error("not verified");
    } else if (path.status === "published") {
      toast.error("already published");
    } else {
      dispatch(ViewInfo(path));
      navigate("/provider/serviceView/publishservice");
    }
  };
  const onPublish = () => {
    navigate("/provider/serviceView/publishcsv");
  };
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
  return (
    <Box>
      {/* <Grid container item justifyContent={"flex-end"} mb={"1rem"}>
        <Buttoncomponent type="button"  variant="contained"
        size="large"
        color="primary"
        onClick={onPublish}
        sx={{
          mt: 2,
          backgroundColor: "secondary.dark",
          width: "10vw",
          color: "#fff",
          "&:hover": {
            color: "secondary.dark",
            border: "1px solid blue",
           
          },
        }}>
          Publish CSV
        </Buttoncomponent>
      </Grid> */}
      {/* {pathData.map((path: any, i: any) => (
        <Paper
          elevation={3}
          key={i}
       
          sx={{ backgroundColor: "primary.light", padding: "1.8rem" }}
          onClick={() => {viewOnClick(path)}}
        >
          <Typography>{path.providerID}</Typography>
          <Typography>{path.filePath.split("/")[2]}</Typography>
          <Typography>{path.status}</Typography>
        </Paper>
      ))} */}
      <Grid container item sx={{ justifyContent: "center" }}>
        {pathData.length !== 0 ? (
          <>
            <Table
              sx={{ maxWidth: "100%", display: { xs: "none", md: "table" } }}
            >
              <TableHead sx={{ backgroundColor: "#4D77FF" }}>
                <TableRow>
                  {/* <TableCell
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                providerID
              </TableCell> */}
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    File Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                  ? pathData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : pathData
                ).map((dataPath: any, i: any) => (
                  <TableRow
                    key={i}
                    sx={{
                      backgroundColor: (i + 1) % 2 === 0 ? "#B4C8FC" : "white",
                    }}
                  >
                    {/* <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                  {dataPath.providerID}
                </TableCell> */}
                    <TableCell sx={{ fontSize: "0.8rem", textAlign: "center" }}>
                      {dataPath.filePath.split("/")[2]}
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      <Buttoncomponent
                        type="button"
                        disable={
                          dataPath.status === "verified"
                            ? false
                            : dataPath.status === "published"
                            ? false
                            : true
                        }
                        variant="contained"
                        size="large"
                        sx={{
                          backgroundColor: "#E4ECF7",
                          border: "1px solid blue",
                          width: "12vw",
                          color:
                            dataPath.status === "verified" ? "orange" : "green",
                          "&:hover": {
                            color: "secondary.dark",
                            border: "1px solid blue",
                          },
                        }}
                        onClick={() => {
                          viewOnClick(dataPath);
                          // dispatch(facilityInfo(facility));
                          // dispatch(editButton())
                          // navigate("/provider/facility/update");
                        }}
                      >
                        {dataPath.status}
                      </Buttoncomponent>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={pathData.length}
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
                gap: "1rem",
              }}
            >
              {pathData.map((fac: any, i: any) => (
                <TableRowRes key={i} fac={fac} />
              ))}
            </Box>
          </>
        ) : (
          <Box
            sx={{
              padding:"2rem",
              height: "5vh",
              backgroundColor: "white",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap:"0.5rem"
            }}
          >
            <InsertDriveFile fontSize="large"/>
            <Typography> No Files</Typography>
           
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default ServiceView;
