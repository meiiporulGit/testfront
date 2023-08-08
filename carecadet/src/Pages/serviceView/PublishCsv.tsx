import * as React from "react";
import { useState } from "react";
import { Grid, Typography, Button, Paper, Box, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router";

import {
  DataGrid,
  GridColTypeDef,
  GridValueFormatterParams,
  GridColumns,
} from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { axiosPrivate, baseURL } from "../../axios/axios";
// import { parse } from "csv-parse/browser/esm/sync";
import { orgid } from "../../Redux/ProviderRedux/orgSlice";
import { toast } from "react-toastify";
type cvsItem = {
  id: string;
  SNo: string;
  value: string;
  GridAlignment: "left" | "right" | "center";
};

export default function PublishCsv() {
  const [csvData, setCsvData] = useState<cvsItem[]>([]);
  const [filename, setFilename] = useState("");
  const [pageSize, setPagesize] = useState(5);
  const navigate = useNavigate();

  const data = useAppSelector(
    (state: { providerAuth: { login: any } }) => state.providerAuth.login
  );
  console.log(data, "dat");
  console.log(csvData, "checkd");
  // organizationID: select.organizationID,

  const orgid = useAppSelector(
    (state) => state.providerOrganization.orgEditData
  );
  console.log("orgid", orgid[0].organizationID);
  const facilityinput = useAppSelector(
    (state) => state.providerService.serviceData
  );
  console.log("facilitydetail", facilityinput);
  const onCellEditCommit = (cellData: any) => {
    const { id, field, value } = cellData;
    console.log(cellData);
    let r = csvData.map((data) => {
      if (data.SNo === id) {
        // if (field === "Sno") {
        //   return { ...data, value: value };
        // }
        return { ...data, [field]: value };
        // if (field === "Service Code") {
        //   return { ...data, ["Service Code"]: value };
        // }
        // if (field === "Diagnosis Test/Service Name") {
        //   return { ...data, ["Diagnosis Test/Service Name"]: value };
        // }
        // if (field === "Organisation Prices") {
        //   return { ...data, ["Organisation Prices"]: value };
        // }
        // if (field === "Facility 1 Prices") {
        //   return { ...data, ["Facility 1 Prices"]: value };
        // }
        // if (field === "Facility 2 Prices") {
        //   return { ...data, ["Facility 2 Prices"]: value };
        // }
        // if (field === "Facility 3 Prices") {
        //   return { ...data, ["Facility 3 Prices"]: value };
        // }
      }

      return data;
    });

    setCsvData(r);
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

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
      field: "SNo",
      headerName: "S.No",
      editable: true,
      width: 100,
    },
    {
      field: "ServiceCode",
      headerName: "Service Code",
      editable: true,
      width: 100,
    },
    {
      field: "DiagnosisTestorServiceName",
      headerName: "Diagnosis Test/Service Name",
      editable: true,
      width: 350,
    },
    {
      field: "Organisationid",
      headerName: "Organisation ID",
      editable: true,
      width: 100,
    },
    {
      field: "FacilityName",
      headerName: "FacilityName",
      editable: true,
      width: 100,
    },
    {
      field: "OrganisationPrices",
      headerName: "Organisation Prices",
      editable: true,
      width: 100,
      align: "right",
      ...usdPrice,
    },
    {
      field: "FacilityNPI",
      headerName: "FacilityNPI",
      editable: true,
      width: 100,
    },
    {
      field: "FacilityPrices",
      headerName: "Facility Prices",
      editable: true,
      width: 100,
      align: "right",
      ...usdPrice,
    },
  ];

  function csvJSON(csv: any) {
    console.log("csvdata");
    var lines = csv.split("\r\n");

    var result = [];

    var headers = lines[0].split(",");
    console.log(headers, "headers");
    // const facilityNPI = facilityinput.facilityNPI;
    // const facilityName = facilityinput.facilityName;
    for (var i = 1; i < lines.length - 1; i++) {
      var obj: any = {};
      var currentline = lines[i].split(",");
    //   obj["FacilityName"] = facilityName;
    //   obj["FacilityNPI"] = facilityNPI;
    //   obj["Organisationid"] = orgid[0].organizationID;
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
    //   console.log("facilityNPI", facilityNPI);

      result.push(obj);
      // data:{$push:[{result , facilityNPI}]}
    }
    // console.log(result,"res")
    setCsvData(result);
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);
    console.log("name", name);
    const reader = new FileReader();
    let j: any = [];
    reader.onload = () => {
      let text: any = reader.result;
      // alert(JSON.stringify(text))
      // console.log('CSV: ', text.substring(0, 100) + '...');

      //convert text to json here
      csvJSON(text);
    };
    // reader.onload = (evt) => {
    //   if (!evt?.target?.result) {
    //     return;
    //   }
    //   const { result } = evt.target;
    // alert(JSON.stringify(result))
    //   const records = parse(result as any, {
    //     columns: ["id", "value"],
    //     delimiter: ";",
    //     trim: true,
    //     skip_empty_lines: true
    //   });

    // };
    reader.readAsBinaryString(file);
    // reader.readAsText(file);

    console.log(csvData);
  };

  const upload = (e: any) => {
    console.log("emaildata", data);
    e.preventDefault();
    // if(output){
    //    let formData = new FormData();
    //  formData.append("screenshot", output);
    let datacheck = { name: filename, csv: csvData, emailData: data ,organizationID:orgid[0].organizationID};
    axiosPrivate
      .post(
        `/service/uploadPricelist`,
        datacheck
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      )
      .then((res) => {
        setCsvData([])
        toast.success(res.data.message)
        navigate("/provider/serviceView/serviceView");
        // alert("success");
      
      }).catch(err=>{
        console.log(err,"checkerror")
        toast.error(err.message)
     }) 
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    // if(output){
    //    let formData = new FormData();
    //  formData.append("screenshot", output);
    let datacheck = { name: filename, csv: csvData };
    axiosPrivate.post(
        `/service/publishPricelist`,datacheck)
      .then((res) => {
        console.log("Success ", res);
        // alert("success");
        navigate("/provider/serviceView/serviceView");
      }).catch(err=>{
         console.log(err,"checkerror")
         toast.error(err.data.message)
      }) 
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

          "&::-webkit-scrollbar": {
            width: 20,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "grey",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "secondary.dark",
            borderRadius: 2,
          },
          overflowX: "hidden",

          // height: "88.8vh",
        }}
      >
        <Typography
          variant="h6"
          textAlign={"right"}
          justifyItems={"right"}
          sx={{ color: "Black" }}
          margin={"15px"}
          marginBottom={"5px"}
        >
          Hello {data.userID},
        </Typography>
        <div
          style={{
            flex: 1,
            height: "3px",
            backgroundColor: "darkgray",
          }}
        />
        {/* <Grid container item xs={12} justifyContent="left">
          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              //dispatch(tabValueNav(1));
              navigate("/servicelanding");
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
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          Upload your facility's Pricelist
        </Typography>
        <br></br>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFileIcon />}
            sx={{
              mt: 2,
              backgroundColor: "secondary.dark",
              width: "15vw",
              color: "#fff",
              fontSize: "1rem",
              "&:hover": {
                color: "secondary.dark",
                border: "1px solid blue",
                fontSize: "1rem",
              },
            }}
          >
            Upload CSV
            <input
              type="file"
              accept=".csv"
              hidden
              onChange={handleFileUpload}
            />
          </Button>

          {/* service pricelist.csv in <i>src dir</i> */}
          <Box>{filename}</Box>
        </Box>
        <DataGrid
          autoHeight
          rows={csvData}
          columns={columns}
          getRowId={(row: any) => row.SNo}
          pagination={true}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize: number) => setPagesize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          onCellEditCommit={onCellEditCommit}
          // initialState={{
          //   pagination: {
          //     pageSize: 100
          //   }
          // }}
          // hideFooter
          sx={{ mt: 1 }}
        />
        <Box sx={{ display: "flex", gap: "1.5rem" }}>
          <Buttoncomponent
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            onClick={upload}
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
          {/* <Buttoncomponent
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
          </Buttoncomponent> */}
        </Box>
      </Paper>
    </>
  );
}
