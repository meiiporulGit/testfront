import React,{useState,useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/Hook'
import { axiosPrivate, baseURL } from '../../axios/axios'

import { Buttoncomponent } from '../../Components/Buttoncomp'
import {Box,Paper,Grid,Collapse,IconButton,Typography,Button,TextField,TablePagination, Table, TableFooter, TableRow} from "@mui/material"
import {
    DataGrid,
    GridColTypeDef,
    GridValueFormatterParams,
    GridColumns,
  } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Edit, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

interface rowProps {
  fac: any;

}

function TableRowRes({ fac}: rowProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // console.log(fac, "facilityRow");
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<any>(fac);



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
               
              }}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            <Typography>{fac.DiagnosisTestorServiceName}</Typography>
            </Box>
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
          <Grid container rowGap={"0.5rem"}>
         
          <Grid  container item xs={12}>
            <Grid item xs={6} >
            <Typography sx={{ color: "blue" }}>
              OrganizationID{" "}
            </Typography>
            </Grid>
            <Grid item xs={1} >
            <Typography >
             :
            </Typography>
            </Grid>
            <Grid item xs={5} >
            <Typography >
            {fac.Organisationid}
            </Typography>
            </Grid>
          </Grid>
          <Grid  container item xs={12}>
            <Grid item xs={6} >
            <Typography sx={{ color: "blue" }}>
             Service Code
            </Typography>
            </Grid>
            <Grid item xs={1} >
            <Typography >
             :
            </Typography>
            </Grid>
            <Grid item xs={5} >
            <Typography >
            {fac.ServiceCode}
            </Typography>
            </Grid>
          </Grid>
          <Grid  container item xs={12}>
            <Grid item xs={6} >
            <Typography sx={{ color: "blue" }}>
              Facility NPI
            </Typography>
            </Grid>
            <Grid item xs={1} >
            <Typography >
             :
            </Typography>
            </Grid>
            <Grid item xs={5} >
            <Typography >
            {fac.FacilityNPI}
            </Typography>
            </Grid>
          </Grid>
          <Grid  container item xs={12}>
            <Grid item xs={6} >
            <Typography sx={{ color: "blue" }}>
              FacilityName
            </Typography>
            </Grid>
            <Grid item xs={1} >
            <Typography >
             :
            </Typography>
            </Grid>
            <Grid item xs={5} >
            <Typography >
            {fac.FacilityName}
            </Typography>
            </Grid>
          </Grid>
          <Grid  container item xs={12}>
            <Grid item xs={6} >
            <Typography sx={{ color: "blue" }}>
              Organization Price
            </Typography>
            </Grid>
            <Grid item xs={1} >
            <Typography >
             :
            </Typography>
            </Grid>
            <Grid item xs={5} >
            <Typography >
            {fac.OrganisationPrices}
            </Typography>
            </Grid>
          </Grid>
          <Grid  container item xs={12}>
            <Grid item xs={6} >
            <Typography sx={{ color: "blue" }}>
              Facility Price
            </Typography>
            </Grid>
            <Grid item xs={1} >
            <Typography >
             :
            </Typography>
            </Grid>
            <Grid item xs={5} >
            <Typography >
            {fac.FacilityPrices}
            </Typography>
            </Grid>
          </Grid>
        </Grid>
        </Paper>
      </Collapse>
    </Box>
  );
}

const PublishService = () => {

    const navigate=useNavigate()
    const orgID=useAppSelector(state=>state.providerOrganization.orgEditData)
    const viewData=useAppSelector(state=>state.providerServiceView.ViewData)
    const [csvData,setCsvData]=useState<any>([])
    const [pageSize, setPagesize] = useState(5);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
   

    useEffect(()=>{
      axiosPrivate.get(`/pathPricelist/check?file=${viewData.filePath.split("/")[2]}`).then(res=>{
       const resData=res.data
       console.log(res.data[0],"check")
      //  const set=Object.keys(res.data[0])
       setCsvData(resData)
    //  const check= set.map((data)=>(
    //   {
    //     field:data,
    //     headerName: data,
    //     editable: false,
    //     width: 100,
    //   }
    //  ))
    //   console.log(check)
    //   setColumns(check)
     
    //    csvJSON(resData)
  
      })
    },[])

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

    const usdPrice: GridColTypeDef = {
      type: "number",
      width: 130,
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
 
    const columns: GridColumns = [
      {
        field: "ServiceCode",
        headerName: "Service Code",
        editable: false,
        width: 100,
      },
      {
        field: "DiagnosisTestorServiceName",
        headerName: "Diagnosis Test/Service Name",
        editable: false,
        flex:1
      },
      {
        field: "Organisationid",
        headerName: "Organisation ID",
        editable: false,
        flex:1
      },
      {
        field: "FacilityName",
        headerName: "FacilityName",
        editable: false,
        flex:2
      },
      {
        field: "OrganisationPrices",
        headerName: "Organisation Prices",
        editable: false,
        flex:1,
        align: "right",
        ...usdPrice,
      },
      {
        field: "FacilityNPI",
        headerName: "FacilityNPI",
        editable: false,
        flex:1
      },
      {
        field: "FacilityPrices",
        headerName: "Facility Prices",
        editable: false,
        flex:1,
        align: "right",
        ...usdPrice,
      },
    ];
   

      const onSubmit = (e: any) => {
        e.preventDefault();
       let datacheck = { csv: csvData,emailData:{orgID:orgID[0].organizationID,file:viewData} };
        axiosPrivate.post(`/service/publishPricelist`, datacheck)
          .then((res) => {
            toast.success(res.data.message)
            navigate("/provider/serviceView/serviceView");
          }).catch(err=>{
            toast.error(err.message)
          })
      };


  return (
    <Box
    
    
  >
  
    
   {csvData.length!==0&& columns.length!==0?
   <>
   <DataGrid
      autoHeight
      rows={csvData}
      columns={columns}
      getRowId={(row: any) => row.SNo}
      pagination={true}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize: number) => setPagesize(newPageSize)}
      rowsPerPageOptions={[5, 10, 20]}
    //   onCellEditCommit={onCellEditCommit}
      // initialState={{
      //   pagination: {
      //     pageSize: 100
      //   }
      // }}
      // hideFooter
      sx={{ mt: 1, display: { xs: "none", md: "block" } }}
    />
     <Box
              sx={{
                
                display: { xs: "flex", md: "none" },
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              { (rowsPerPage > 0
              ? csvData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : csvData
            ).map((fac: any, i: any) => (
              <>
                <TableRowRes
                  key={i}
                  fac={fac}
                 
                />
                
                </>
              ))}
                 <Table><TableFooter><TableRow><TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={csvData.length}
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
                }}/></TableRow></TableFooter></Table> 
            </Box>
    <Box sx={{ display: "flex", gap: "1.5rem" }}>
     
      <Buttoncomponent
        type="submit"
        variant="contained"
        size="large"
        color="primary"
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
        onClick={onSubmit}
      >
        Publish
      </Buttoncomponent>
    </Box>
   </>:"loading"} 
    
  </Box>
  )
}

export default PublishService