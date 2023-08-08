import { useEffect, useState } from "react";
import { Paper, TextField, Box, Typography, Pagination, CircularProgress, Button, Grid,Divider } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

import { DataGrid, GridColumns, GridRow } from "@mui/x-data-grid";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { InputAdornment } from "@mui/material";
import { margin } from "@mui/system";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import Avatar from "@mui/material/Avatar";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { tabValueNav } from "../../Redux/ProviderRedux/LoginSlice";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import clsx from "clsx";
import { axiosPrivate } from "../../axios/axios";
import {
  serviceInfo,
  facilitynameInfo,
} from "../../Redux/ProviderRedux/serviceSlice";
import { BorderClear } from "@mui/icons-material";
import { facilityInfo } from "../../Redux/ProviderRedux/facilitySlice";
interface forminitialValues {
  _id: string;
  SNo: string;
  ServiceCode: string;
  DiagnosisTestorServiceName: string;
  Organisationid?: string;
  OrganisationPrices: string;
  FacilityNPI?: string;
  FacilityPrices: string;
  GridAlignment: "left" | "right" | "center";
}


export default function Servicelandingpage() {
  const [data, setData] = useState<any>([]);
  const [pageSize, setPagesize] = useState(5);
  const dispatch = useAppDispatch();
  const itemsPerPage = 5;
  const [page1, setPage1] = useState(1);
  // const facilityid=useAppSelector((state)=>state.editFacility.service);
  // console.log("facilityid", facilityid);
  // const [totalPages, setTotalPages] = useState(10);
  const [dataCheck,setDataCheck]=useState(false)
  const orgid = useAppSelector(
    (state) => state.providerOrganization.orgEditData
  );
  // const serviceinput = useAppSelector(
  //   (state: { editservice: { serviceInfo: any } }) => state.editservice.serviceInfo
  // );
  const facilityinput = useAppSelector(
    (state) => state.providerService.facilityData
  );

  console.log(facilityinput, "facip");
  const serviceinput = useAppSelector(
    (state: { providerService: { serviceData: any } }) =>
      state.providerService.serviceData
  );


  const navigate = useNavigate();
  useEffect(() => {
    console.log("start");
    getData();
  
  }, []);

  useEffect(() => {}, []);
  const getData = async () => {
    setDataCheck(true)
    axiosPrivate
      .get(`/service/getPricelistbyOrg?Organisationid=${orgid[0].organizationID}`)
      .then((resp) => {
        const d = resp.data.data;
        const dd = d.map((c: any) => c.DiagnosisTestorServiceName);
        const set = new Set<string>(dd);
        let ddd: string[] = [];
        set.forEach((s) => {
          ddd.push(s);
          console.log(ddd, "ddd");
        });
        console.log(ddd, "ddd");
        if (ddd.length == 0) {
          setDataCheck(false)
          navigate("/provider/service/pricelist");
        } else {
          setDataCheck(false)
          setData(ddd);
          // console.log("getpricedata", getpricedata);
        }
      });
    // const pricelistdetails = await axiosPrivate.get(`/getPriceList`);
    // const data1 = pricelistdetails.data.data;
    // const mappeddata = data1.map((val: any) => val.DiagnosisTestorServiceName);

    // let getpricedata = new Set(mappeddata);

    // const new1 = [...getpricedata];
    // console.log("mappeddata", mappeddata);
    // console.log("getPrice", getpricedata.size);

    // console.log(pricelistdetails.data, "pricelist");
  };

  // const columns: GridColumns = [
  // {
  //   field: "SNo",
  //   headerName: "S.No",
  //   headerClassName: "super-app-theme--header",
  //   width: 90,
  // },
  // {
  //   field: "ServiceCode",
  //   headerName: "Service Code",
  //   headerClassName: "super-app-theme--header",
  //   width: 150,
  // },
  // {
  //   field: "DiagnosisTestorServiceName",
  //   headerName: "Diagnosis Test/Service Name",
  //   headerClassName: "super-app-theme--header",
  //   width: 360,
  // },
  // {
  //   field: "Organisationid",
  //   headerName: "Organisation ID",
  //   headerClassName: "super-app-theme--header",
  //   width: 200,
  // },
  // {
  //   field: "OrganisationPrices",
  //   headerName: "Organisation Prices",
  //   headerClassName: "super-app-theme--header",
  //   width: 200,
  // },
  // {
  //   field: "FacilityNPI",
  //   headerName: "FacilityNPI",
  //   headerClassName: "super-app-theme--header",
  //   width: 170,
  // },
  // {
  //   field: "FacilityPrices",
  //   headerName: "Facility Prices",
  //   headerClassName: "super-app-theme--header",
  //   width: 170,
  // },
  // ];

  const navigateToAdd = () => {
    // This will navigate to second component
    // dispatch(editButton());
    navigate("/provider/service/Pricelist");
  };
  const navigateToEdit = () => {
    // This will navigate to second component
    navigate("/provider/service/PricelistEdit");
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage1(value);
  };
  function CustomRow(props: any) {
    const { className, index, ...other } = props;

    return (
      <GridRow
        index={index}
        className={clsx(className, index % 2 === 0 ? "odd" : "even")}
        {...other}
      />
    );
  }

  return (
    
      <Box
        // elevation={9}
        sx={{
          backgroundColor: "primary.light",
         
          borderRadius: "15px",
          // height: "76vh",
        }}
      >
        <>
          <Typography
            mb={"0.5rem"}
            sx={{
              backgroundColor: "#B4C8FC",
              padding: "0.7rem",
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            Service Pricelist
          </Typography>

          {/* <Grid container>
            <Button
            variant="outlined"
            type="button"
            onClick={() => {
             dispatch(tabValueNav(1));
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
            Facility Info
          </Button>
          </Grid> */}
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{
              gap: "2rem",
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                // backgroundColor: "secondary.dark",

                borderRadius: "100 100 100 100",

                color: "#fff",
                "&:hover": {
                  color: "secondary.dark",
                  // border: "1px solid blue",
                  letterSpacing: "0.2rem",
                  fontSize: "1rem",
                },
              }}
              onClick={navigateToAdd}
            >
              <AddIcon />
            </Avatar>
            {/* <Avatar
              sx={{
                // backgroundColor: "secondary.dark",

                borderRadius: "100 100 100 100",

                color: "#fff",
                "&:hover": {
                  color: "secondary.dark",
                  // border: "1px solid blue",
                  letterSpacing: "0.2rem",
                  fontSize: "1rem",
                },
              }}
              onClick={navigateToEdit}
            >
              <EditIcon />
            </Avatar> */}
          </Box>

          {/* <Buttoncomponent
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            // onClick={onSave}
            // onClick={(e) => upload(e)}
            sx={{
              justifycontent: "right",
              alignitems: "right",
              textalign: "right",
              backgroundColor: "secondary.dark",
              width: "10vw",
              mr: 2,
              color: "#fff",
              "&:hover": {
                color: "secondary.dark",
                border: "1px solid blue",

                fontSize: "0.9rem",
              },
            }}
            onClick={() => {
              // dispatch(editButton());
              dispatch(tabValueNav(1));
              navigate("/providerlanding");
            }}
          >
            Facilities info
          </Buttoncomponent> */}

          {/* <DataGrid
              autoHeight
              autoPageSize
              getRowId={(row) => row.SNo}
              rows={data}
              columns={columns}
              pagination={true}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPagesize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              sx={{
                fontSize: "1rem",
                backgroundColor: "lightgray",
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "white",
                },
              }}
              components={{ Row: CustomRow }}
            /> */}

          {/* {JSON.stringify(data)} */}
          {!dataCheck?    <Box style={{ display:"flex",flexDirection:"column",rowGap:"0.2rem" }}>
           
          { (itemsPerPage > 0
              ? data.slice(
                  page1 * itemsPerPage,
                  page1 * itemsPerPage + itemsPerPage
                )
              : data
            ).map((d: any, key: any) => {
                return (
                  <>
                  <button
                    style={{
                      // height: "35px",
                      // width: "1300px",
                      padding:"1rem",
                      border: "0",
                      // borderRadius: "5px",
                      fontSize: "1.2rem",
                      textAlign: "left",
                      backgroundColor:"#CDDBF8"
                    }}
                    key={key}
                    onClick={() => {
                    
                   
                      dispatch(serviceInfo(d));
                      navigate("/provider/service/serviceview");
                    }}
                  >
                    {d}{" "}
                  </button>
  
                  {/* <Divider sx={{backgroundColor:"blue"}}/> */}
                  </>
                );
              })}
                           <Box sx={{ mt: "2rem", }} component="span">
              <Pagination
                sx={{ display: "flex", justifyContent: "center"  }}
                //  count={data.length % 5 === 0 ? Math.ceil(data.length / 5) : Math.ceil(data.length / 5 + 1)}
        
                count={Math.ceil(data.length / itemsPerPage)}
                page={page1}
                onChange={handlePageChange}
                defaultPage={6}
                color="primary"
                // boundaryCount={3}
                siblingCount={0}
               
                showFirstButton
                showLastButton
              />
            </Box>
          </Box> : <Box
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
            </Box>}
        </>
      </Box>
    
  );
}
