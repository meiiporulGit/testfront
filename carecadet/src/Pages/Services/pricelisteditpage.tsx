import { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Box,
  Button,
  Typography,
  Collapse,
  IconButton,
  TablePagination,
  TextField,
  CircularProgress,
  Pagination
} from "@mui/material";
import axios from "axios";
import {
  GridRowsProp,
  GridValueSetterParams,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColumns,
  GridColTypeDef,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridActionsCellItem,
  GridValueFormatterParams,
  GridPreProcessEditCellProps,
  GridEventListener,
  GridRowId,
  GridRow,
} from "@mui/x-data-grid";
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomUpdatedDate,
//   randomId
// } from "@mui/x-data-grid-generator";
import {
  CheckBoxOutlineBlankSharp,
  ConstructionOutlined,
} from "@mui/icons-material";
import { Routes, Route, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import { axiosPrivate, baseURL } from "../../axios/axios";
import { toast } from "react-toastify";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Edit,
  Delete,
} from "@mui/icons-material";

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
interface rowProps {
  fac: any;
  onButtonEdit: any;
  handleDelete: any;
}

function TableRowRes({ fac, onButtonEdit, handleDelete }: rowProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // console.log(fac, "facilityRow");
  const [csvEdit, setcsvEdit] = useState([] as any);
  console.log(fac, "facilityRow");
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<any>(fac);

  const editOnchange = (e: any) => {
    console.log(e.target.name, e.target.value);
    var editData = { ...data, [e.target.name]: e.target.value };
    setData(editData);
  };

  const onButton = async (cellData: any) => {
    setEdit(false);
    onButtonEdit(data);
    console.log(data, "data11111");

    setcsvEdit(data);
    console.log(csvEdit, "csvEdit");
  };

  const onClickDelete = async (deleteFac: any) => {
    handleDelete(deleteFac);
    console.log("deletefac", deleteFac);
  };
  return (
    <Box>
      <Paper sx={{ backgroundColor: "primary.light", padding: "0.3rem" }}>
        <Grid container>
          <Grid item xs={10}>
            <Box
              sx={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}
            >
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => {
                  setOpen(!open);
                  setEdit(false);
                }}
              >
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
              <Typography>{fac.DiagnosisTestorServiceName}</Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Edit
              onClick={() => {
                setEdit(true);
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <Delete
              onClick={() => {
                onClickDelete(fac);
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Paper
          sx={{
            backgroundColor: "primary.light",
            display: "flex",
            flexDirection: "column",
            mt: "0.2rem",
            padding: "1rem",
          }}
        >
          <Grid container>
            {edit ? (
              <Grid item justifyContent={"flex-end"}>
                {" "}
                <Button onClick={onButton} sx={{
              mt: 2,
              backgroundColor: "secondary.dark",
              width: "10vw",
              color: "#fff",
              "&:hover": {
                color: "secondary.dark",
                border: "1px solid blue",
                letterSpacing: "0.2rem",
                fontSize: "1rem",
              },
            }}>save</Button>
              </Grid>
            ) : null}
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={6}>
              <Typography sx={{ color: "blue" }}>Organization ID </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ color: "blue" }}>:</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ color: "blue" }}>
                {fac.Organisationid}
              </Typography>
            </Grid>
          </Grid>

          <Grid  container item xs={12}>
            <Grid item xs={6} >
            

            <Typography sx={{ color: "blue" }}>ServiceCode </Typography> 
            </Grid>
            <Grid item xs={2} >
            <Typography sx={{ color: "blue" }}>
             :
            </Typography>
            </Grid>
            <Grid item xs={4} >
              <Typography>
            {fac.ServiceCode}
          </Typography>
        </Grid>
        </Grid>


                 <Grid  container item xs={12}>
        <Grid item xs={6} >
        
            <Typography sx={{ color: "blue" }}>FacilityNPI </Typography> </Grid>
            <Grid item xs={2} >
            <Typography sx={{ color: "blue" }}>
             :
            </Typography>
            </Grid>
            <Grid item xs={4} >
         <Typography >
            {fac.FacilityNPI}
          </Typography>
          </Grid>
          </Grid>
          <Grid  container item xs={12}>
        <Grid item xs={6} >
            <Typography sx={{ color: "blue" }}>FacilityName </Typography> </Grid>
            <Grid item xs={2} >
            <Typography sx={{ color: "blue" }}>
             :
            </Typography>
            </Grid>
            <Grid item xs={4} >
              <Typography>
            {fac.FacilityName}
          </Typography>
          </Grid>
          </Grid>
          <Grid  container item xs={12}>
        <Grid item xs={6} >
            <Typography sx={{ color: "blue" }}>
              Organisation Prices
            </Typography>
            </Grid>
            <Grid item xs={2} >
            <Typography sx={{ color: "blue" }}>
             :
            </Typography>
            </Grid>
            <Grid item xs={4} >
              <Typography>$
          
            {!edit ? (
              fac.OrganisationPrices
            ) : (
              <TextField
                value={data.OrganisationPrices}
                name="OrganisationPrices"
                onChange={(e) => editOnchange(e)}
              />
            )}
          </Typography>
          </Grid>
          </Grid>


         <Grid  container item xs={12}>
        <Grid item xs={6} >
            <Typography sx={{ color: "blue" }}>
              FacilityPrices{" "}
            </Typography> </Grid>
            <Grid item xs={2} >
            <Typography sx={{ color: "blue" }}>
             :
            </Typography>
            </Grid>
            <Grid item xs={4} >
              <Typography>$
            {!edit ? (
              fac.FacilityPrices
            ) : (
              <TextField
                value={data.FacilityPrices}
                name="FacilityPrices"
                onChange={(e) => editOnchange(e)}
                type="number"
              />
            )}
          </Typography>
          </Grid></Grid>
        </Paper>
      </Collapse>
    </Box>
  );
}
export default function PricelistEditpage() {
  const [data, setData] = useState([] as any);
  const [pageSize, setPagesize] = useState(5);
  const [csvEdit, setcsvEdit] = useState([] as any);
  const [csvdel, setcsvDel] = useState([] as any);
  const [filename, setFilename] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const itemsPerPage = 5;
  const [page1, setPage1] = useState(1);
  const dispatch = useAppDispatch();
  // const facilityid=useAppSelector((state)=>state.editFacility.service);
  // console.log("facilityid", facilityid);
  // const [totalPages, setTotalPages] = useState(10);
  const orgid = useAppSelector(
    (state) => state.providerOrganization.orgEditData
  );
  const facilityinput = useAppSelector(
    (state) => state.providerService.serviceData
  );
  console.log(facilityinput, "facip");
  const getData = async () => {
    setIsLoading(true);
    await axiosPrivate
      .get(
        `/service/getPriceListbyFacility?facilityNPI=${facilityinput.facilityNPI}&Organisationid=${orgid[0].organizationID}`
      )
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false)
      }).catch(err=>console.log(err))

    
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDeleteClick = (id: GridRowId) => () => {
    setData(data.filter((row: any) => row._id !== id));
    console.log("data1", data);
    let store = data.filter((row: any) => row._id === id);
    console.log(store[0]._id, "store");
    setcsvDel([...csvdel, store[0]._id]);
    console.log(csvdel, "checkdel");
    toast.success(
      "Successfully delete the service. Kindly click SAVE to update in DB"
    );
  };

  const onCellEditCommit = async (cellData: any) => {
    const { id, field, value } = cellData;
    console.log(cellData);
    console.log(data, "dataaa");
    console.log(csvEdit, "csvEdit");
    let d = data.filter((data1: any) => data1._id === id);

    let dd = csvEdit.filter((ddd: any) => ddd._id === id);

    if (dd.length !== 0) {
      let r = csvEdit.map((dd: any) => {
        if (dd._id === id) {
          return { ...dd, [field]: value };
        }

        return dd;
      });
      setcsvEdit(r);
      toast.success(
        "Successfully Edit the service. Kindly click SAVE to update in DB"
      );
    } else {
      setcsvEdit([...csvEdit, { ...d[0], [field]: value }]);
      toast.success(
        "Successfully Edit the service. Kindly click SAVE to update in DB"
      );
    }
  };

  function csvJSON(csv: any) {
    console.log("csvdata");
    var lines = csv.split("\r\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj: any = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    setData(result);
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
  const update = (e: any) => {
    setIsLoading(true)
    e.preventDefault();

    // if(output){
    //    let formData = new FormData();
    //  formData.append("screenshot", output);
    let datacheck = { name: filename, PriceList: csvEdit };
    axiosPrivate.put(`/service/bulkupdate`, datacheck).then((res) => {
      let datacheck1 = { data: { name: filename, PriceList: csvdel } };
      axiosPrivate

        .delete(`/service/bulkdelete`, datacheck1)

        .then((res) => {
          setIsLoading(false)
          toast.success(res.data.message);
          console.log("Success ", res);
          // alert("success");
        })
        .then((res) => {
          // alert("success");
          // dispatch(organizationEdit(orgdata))
         
          navigate("/provider/facility/pricelistlanding");
          // actions.resetForm({
          //   values: initialValues,
          // });
        });
    });
  };
  //   let datacheck1 = { name: filename, PriceList: csvdel };
  //   axios
  // .delete(
  //   "http://localhost:5200/bulkdelete", datacheck1

  // )
  // .then((res) => {
  //   console.log("Success ", res);
  //   alert("success");
  // });

  //  }
  // };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const usdPrice: GridColTypeDef = {
    type: "number",
    width: 250,
    // valueFormatter: ({ value }) => currencyFormatter.format(parseFloat(value)),
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (params.value == null) {
        return "";
      }

      const valueFormatted = Number(params.value).toLocaleString();
      return `$ ${valueFormatted} `;
    },
    cellClassName: "font-tabular-nums",
  };
  const onButtonEdit = (e: any) => {
    var editData = data.map((d: any) => {
      if (d.DiagnosisTestorServiceName === e.DiagnosisTestorServiceName) {
        return e;
      } else {
        return d;
      }
    });

    console.log(editData, "checkEdit");
    var findExistEdit = csvEdit.filter((dataCsv: any) => dataCsv._id === e._id);
    // console.log(findExistEdit,"findExist")
    if (findExistEdit.length !== 0) {
      const mapEdit = csvEdit.map((dat: any, i: any) => {
        if (dat._id === e._id) {
          return e;
        } else {
          return dat;
        }
      });
      // console.log("mapEdit",mapEdit)
      setcsvEdit(mapEdit);
    } else {
      setcsvEdit([...csvEdit, e]);
    }
    setData(editData);
  };

  const handleDelete = (e: any) => {
    console.log("check");

    console.log(e, "echeck");
    //       const facid=e._id;
    // console.log("facid",facid)
    setData(data.filter((row: any) => row._id !== e._id));
    let store = data.filter((row: any) => row._id === e._id);
    console.log(store, "store");
    setcsvDel([...csvdel, store[0]._id]);
    // var delData = { ...data, [e.target.name]: e.target.value };
    // setData(delData);
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage1(value);
  };
  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   page: number
  // ) => {
  //   setPage(page);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  const columns: GridColumns = [
    // {
    //   field: "SNo",
    //   headerName: "S.No",
    //   headerClassName: "super-app-theme--header",
    //   width: 90,
    //   editable: true,
    // },
    {
      field: "ServiceCode",
      headerName: "Service Code",
      headerClassName: "super-app-theme--header",
      width: 200,
      // editable: true,
    },
    {
      field: "DiagnosisTestorServiceName",
      headerName: "Diagnosis Test/Service Name",
      headerClassName: "super-app-theme--header",
      flex:2,
      // width: 400,
      // editable: true,
    },
    // {
    //   field: "Organisationid",
    //   headerName: "Organisation ID",
    //   headerClassName: "super-app-theme--header",
    //   width: 200,
    // },
    {
      field: "OrganisationPrices",
      headerName: "Organisation Prices",
      headerClassName: "super-app-theme--header",
      // width: 200,
      flex:1,
      editable: true,
      align: "right",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const invalid = !Number(params.props.value);
            return { ...params.props, error: invalid };
      },
      ...usdPrice,
    },
    // {
    //   field: "FacilityNPI",
    //   headerName: "FacilityNPI",
    //   headerClassName: "super-app-theme--header",
    //   width: 100,
    // },
    {
      field: "FacilityPrices",
      headerName: "Facility Prices",
      headerClassName: "super-app-theme--header",
      // width: 100,
      flex:1,
      editable: true,
      align: "right",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const invalid = !Number(params.props.value);
            return { ...params.props, error: invalid };
      },
      ...usdPrice,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      flex:1,
      // width: 130,
      cellClassName: "actions",
      getActions: (data: any) => {
        let id = data.id;

        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

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

  const navigate = useNavigate();

  const navigateToAdd = () => {
    // This will navigate to second component
    navigate("/provider/facility/PricelistUploadthrofacility");
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "primary.light",
          // padding: "1.5rem",
          borderRadius: "15px",
          height: "88.8vh",

          // height: "88.8vh",
        }}
      >
        <Typography
          mb={"0.5rem"}
          sx={{
            backgroundColor: "#B4C8FC",
            padding: "0.7rem",
            textAlign: "center",
            fontSize: "1.5rem",
          }}
        >
          {facilityinput.facilityName} Pricelist
        </Typography>
        {/* <Typography sx={{ fontSize: "1.5rem",}}> <div>{facilityinput.facilityName}</div></Typography> */}
        {/* <Grid container item xs={12} justifyContent="left">
          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              // dispatch(tabValueNav(1));
              navigate("/pricelistlanding");
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
            Service Info
          </Button>
        </Grid> */}
        <>
          <Box
            sx={{
              "& .super-app-theme--header": {
                backgroundColor: "#4D77FF",
              },
              // height: 400,
              width: 1,
              "& .odd": {
                bgcolor: "white",
              },
              "& .even": {
                bgcolor: "secondary.light",
              },
            }}
          >
            <DataGrid
              autoHeight
              autoPageSize
              getRowId={(row) => row._id}
              rows={data}
              columns={columns}
              pagination={true}
              pageSize={pageSize}
              loading={isLoading}
              onPageSizeChange={(newPageSize) => setPagesize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              onCellEditCommit={onCellEditCommit}
              sx={{
                maxWidth: "100%",
                display: { xs: "none", md: "block" },
                mt: 1,
                fontSize: "1rem",
                backgroundColor: "lightgray",
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "white",
                },
              }}
              components={{ Row: CustomRow }}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
              gap: "1rem",
            }}
          >
             {(itemsPerPage > 0
              ? data.slice((page1 - 1) * itemsPerPage, page1 * itemsPerPage)
              : data
            ).map((fac: any, i: any) => (
              <>
              {!isLoading?<TableRowRes
                  key={i}
                  fac={fac}
                  onButtonEdit={(e: any) => onButtonEdit(e)}
                  handleDelete={(e: any) => handleDelete(e)}
                />:  <Box
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
            ))}
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
          </Box>
          {isLoading?null:<Buttoncomponent
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            disable={isLoading}
            // onClick={onSave}
            onClick={(e) => update(e)}
            sx={{
              mt: 2,
              backgroundColor: "secondary.dark",
              width: "10vw",
              color: "#fff",
              "&:hover": {
                color: "secondary.dark",
                border: "1px solid blue",
                letterSpacing: "0.2rem",
                fontSize: "1rem",
              },
            }}
          >
            Save
          </Buttoncomponent>}
          
          {/* {JSON.stringify(csvEdit)}
          <br />

          {JSON.stringify(csvdel)} */}
        </>
      </Box>
    </>
  );
}
