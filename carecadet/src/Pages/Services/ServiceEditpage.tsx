import { useEffect, useState } from "react";
import { Paper, Grid, Box, Typography,Button, Collapse, Pagination,IconButton,TablePagination,TextField} from "@mui/material";
import axios from "axios";
import {
  GridRowsProp,
  GridValueSetterParams,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridValueFormatterParams,
  GridPreProcessEditCellProps,
  GridColumns,
  GridColTypeDef,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridActionsCellItem,
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
import { KeyboardArrowDown, KeyboardArrowUp ,Edit,Delete} from "@mui/icons-material";

interface forminitialValues {
  _id: string;
  SNo: string;
  ServiceCode: string;
  DiagnosisTestorServiceName: string;
  Organisationid?: string;
  OrganisationPrices: string;
  FacilityNPI?: string;
  FacilityName?: string,
  FacilityPrices: string;
  GridAlignment: "left" | "right" | "center";
}
interface rowProps{
  fac:any
  onButtonEdit: any;
  handleDelete:any
}






function TableRowRes({ fac, onButtonEdit ,handleDelete}: rowProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // console.log(fac, "facilityRow");
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<any>(fac);

  const editOnchange = (e: any) => {
    console.log(e.target.name, e.target.value);
    var editData = { ...data, [e.target.name]: e.target.value };
    setData(editData);

    
  };

  const onButton = () => {
    console.log("check")
    setEdit(false);
    console.log(data,"buttoncheck")
    console.log(edit,"testedit")
    onButtonEdit(data);
    console.log(onButtonEdit,"buttoncheck1")
  };
  const onClickDelete = async (deleteFac:any)=>{
    handleDelete(deleteFac)
    console.log("deletefac",deleteFac)
      }
  return (
    <Box>
      <Paper sx={{backgroundColor:"primary.light",padding:"0.3rem"}}>
        <Grid container>
          <Grid item xs={10} >
            <Box sx={{display:"flex",flexWrap:"nowrap",alignItems:"center"}}>
            <IconButton
           
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpen(!open)
                setEdit(false)
              }}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            <Typography>{fac.FacilityName}</Typography>
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
              onClick={()=>{onClickDelete(fac)}}
             
            />
          </Grid>
        </Grid>
      </Paper>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Paper
          sx={{
            backgroundColor:"primary.light",
            display: "flex",
            flexDirection: "column",
            mt: "0.2rem",
            padding: "1rem",
          }}
        >
      
          <Grid container>
          {edit ?
            <Grid item justifyContent={"flex-end"}> <Button onClick={onButton}  sx={{
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
            }}>save</Button></Grid> : null}
          </Grid>
          <Grid  container item xs={12}>
            <Grid item xs={6} >
            <Typography sx={{ color: "blue" }}>
              OrganizationID{" "}
            </Typography>
            </Grid>
            <Grid item xs={2} >
            <Typography sx={{ color: "blue" }}>
             :
            </Typography>
            </Grid>
            <Grid item xs={4} >
            <Typography >
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
export default function ServiceEditpage() {
  const [data, setData] = useState([] as any);
  const [pageSize, setPagesize] = useState(5);
  const [csvEdit, setcsvEdit] = useState([] as any);
  const [csvdel, setcsvDel] = useState([] as any);
  const [filename, setFilename] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;
  const [page1, setPage1] = useState(1);
  const dispatch = useAppDispatch();
  // const facilityid=useAppSelector((state)=>state.editFacility.service);
  // console.log("facilityid", facilityid);
  // const [totalPages, setTotalPages] = useState(10);
  const orgid = useAppSelector((state) => state.providerOrganization.orgEditData);
  const serviceinput = useAppSelector(
    (state: { providerService: { serviceData: any } }) =>
      state.providerService.serviceData
  );
  console.log(serviceinput, "serviceinput");
  const facilityinput = useAppSelector(    (state) => state.providerService.serviceData  );
  useEffect(() => {
    console.log("start");
    getData();
  }, []);
  const getData = async () => {
    const pricelistdetails = await axiosPrivate.get(
      `/service/getPriceListbyService?DiagnosisTestorServiceName=${serviceinput}&Organisationid=${orgid[0].organizationID}`
    );
    const data = pricelistdetails.data.data;
    // if (data.length == 0) {
    //   navigate("/pricelist");
    // } else {
    setData(pricelistdetails.data.data);
    // }

    console.log(pricelistdetails.data, "pricelist");
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    // setData(data.filter((row: any) => row._id !== id));
    // let store = data.filter((row: any) => row._id === id);
    // console.log(store, "store");
    // setcsvDel([...csvdel, store[0]._id]);
    // toast.success("Successfully delete the service. Kindly click SAVE to update in DB")
    setData(data.filter((row: any) => row._id !== id));
    console.log("data1",data)
    let store = data.filter((row: any) => row._id === id);
    console.log(store[0]._id, "store");
    setcsvDel([...csvdel, store[0]._id]);
    console.log(csvdel,"checkdel")
    toast.success("Successfully delete the service. Kindly click SAVE to update in DB")
  };

  const onCellEditCommit = async (cellData: any) => {
    const { id, field, value } = cellData;
    console.log(cellData);
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
      toast.success("Successfully Edit the service. Kindly click SAVE to update in DB")
    } else {
      setcsvEdit([...csvEdit, { ...d[0], [field]: value }]);
      toast.success("Successfully Edit the service. Kindly click SAVE to update in DB")
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
    e.preventDefault();
    // if(output){
    //    let formData = new FormData();
    //  formData.append("screenshot", output);
    let datacheck = { name: filename, PriceList: csvEdit };
    axiosPrivate
      .put(`/service/bulkupdate`, datacheck)
      .then((res) => {
        let datacheck1 = {data: { name: filename, PriceList: csvdel }};
        axiosPrivate
        
          .delete(
            `/service/bulkdelete`, datacheck1)
    
       
          .then((res) => {
            toast.success(res.data.message);
            console.log("Success ", res);
          })})
      .then((res) => {
       
       
        // dispatch(organizationEdit(orgdata))
        navigate("/provider/service/serviceview");
        // toast.success(res.data.message)
        // actions.resetForm({
        //   values: initialValues,
        // });
      });

    //  }
  };

  
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const usdPrice: GridColTypeDef = {
    type: "number",
    width: 300,
    // valueFormatter: ({ value }) => currencyFormatter.format(value),
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
    var editData=data.map((d:any)=>{
      if(d.facilityName===e.facilityName){
        return e
      }else{
        return d
      }
    })
  
    console.log(editData,"checkEdit")
    var findExistEdit= csvEdit.filter((dataCsv:any)=>dataCsv._id===e._id)
    // console.log(findExistEdit,"findExist")
    if(findExistEdit.length!==0){
      const mapEdit=csvEdit.map((dat:any,i:any)=>{
            if(dat._id===e._id){
              return e
            }else{
              return dat
            }
      })
      // console.log("mapEdit",mapEdit)
      setcsvEdit(mapEdit)
    }else{
      setcsvEdit([...csvEdit,e])
    }
    setData(editData)
      
    };


    const handleDelete= (e:any)  =>{
    
      console.log("check")
  
      console.log(e,"echeck")
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
    // {
    //   field: "DiagnosisTestorServiceName",
    //   headerName: "Diagnosis Test/Service Name",
    //   headerClassName: "super-app-theme--header",
    //   width: 450,
    //   editable: true,
    // },
    {
      field: "FacilityName",
      headerName: "Facility Name",
      headerClassName: "super-app-theme--header",
      // width: 220,
      flex:2,
    },
    // {
    //   field: "Organisationid",
    //   headerName: "Organisation ID",
    //   headerClassName: "super-app-theme--header",
    //   width: 200,
    // },
    {
      field: "FacilityNPI",
      headerName: "FacilityNPI",
      headerClassName: "super-app-theme--header",
      // width: 210,
      flex:1,
    },
    {
      field: "OrganisationPrices",
      headerName: "Organisation Prices",
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
      field: "FacilityPrices",
      headerName: "Facility Prices",
      headerClassName: "super-app-theme--header",
    
      // width: 100,
      flex:1,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const invalid = !Number(params.props.value);
            return { ...params.props, error: invalid };
      },
          align: "right",
      ...usdPrice,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      // width: 100,
      flex:1,
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
    navigate("/provider/service/PricelistUpload");
  };

  return (
    <>
      <Paper
        elevation={9}
        sx={{
          backgroundColor: "primary.light",
          padding: "1.5rem",
          borderRadius: "15px",
          height: "88.8vh",
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
          {serviceinput} Pricelist
        </Typography>
        {/* <Typography sx={{ fontSize: "1.5rem" }}>
          {" "}
          <div>{serviceinput}</div>
        </Typography> */}
        {/* <Grid container item xs={12} justifyContent="left">
          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              // dispatch(tabValueNav(1));
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
              onPageSizeChange={(newPageSize) => setPagesize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              onCellEditCommit={onCellEditCommit}
              sx={{
              maxWidth: "100%",display:{xs:"none",md:"block"}, mt:1 ,
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
          < Box
              sx={{
                
                display: { xs: "flex", md: "none" },
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              { (rowsPerPage > 0
              ? data.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : data
            ).map((fac: any, i: any) => (
              <>
                <TableRowRes
                  key={i}
                  fac={fac}
                  onButtonEdit={(e: any) => onButtonEdit(e)}
                  handleDelete={(e:any) => handleDelete(e)}
                />
                
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
          <Buttoncomponent
            type="submit"
            variant="contained"
            size="large"
            color="primary"
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
          </Buttoncomponent>
          {/* {JSON.stringify(csvEdit)}
          <br />

          {JSON.stringify(csvdel)} */}
        </>
      </Paper>
    </>
  );
}
