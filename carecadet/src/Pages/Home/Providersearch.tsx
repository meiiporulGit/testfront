import { useEffect, useState } from "react";
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
  Button,
  Card,
  Typography,
  Container,
  ListItemButton,
  ListItemIcon,
  Collapse,
  ListItemText,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormGroup,
  MenuItem,
  Menu,
  Paper,
  Grid,
  TextField,
  Slider,
 CircularProgress,
 Pagination,
 Autocomplete,
 AutocompleteRenderInputParams,
 createFilterOptions,
  
} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import { Formik, Form, ErrorMessage, Field } from "formik";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
//comp
import { Buttoncomponent } from "../../Components/Buttoncomp";
//redux store
import { useAppSelector, useAppDispatch } from "../../Redux/Hook";
import MenuIcon from "@mui/icons-material/Menu";
import * as Yup from "yup";

import { axiosPrivate } from "../../axios/axios";
// import {editButton} from "../../Redux/LoginSlice";
import FormTextField from "../../Components/Textfield";
import SelectField from "../../Components/Select";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import {
  dataSearch,
  dataSearchTenMiles,
  dataSearchTwentyMiles,
  dataSearchThirtyMiles,
  dataProviderSearch,

  dataQueryProvider,
} from "../../Redux/ProviderRedux/HomeSlice";
import {
  ArrowDropDown,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { ceil, range, values } from "lodash";
import SearchNav from "../../ProtectedRoutes/SearchNav";
import { type } from "os";

export default function Providersearch() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [open1, setOpen1] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [open3, setOpen3] = useState<boolean>(false);
  const [open4, setOpen4] = useState<boolean>(false);
  const [LoadingState ,setLoadingState] = useState<boolean>(true)
  const [openScore, setOpenScore] = useState<boolean>(false);
  const [openRate, setOpenRate] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [distance, setDistance] = useState(30);
  const [checkText, setCheckText] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([] as forminitialValues[]);
  const [service, setService] = useState(false);
  const [checkInfo, setCheckInfo] = useState<any>([])
  const searchData = useAppSelector(
    (state) => state.homeReducer.providerSearchData
  );
  const [loading,setLoading] =useState<any>(false);
  const providerDataQuery=useAppSelector(state=>state.homeReducer.providerDataQuery)
  const itemsPerPage = 5;


  const [page1, setPage1] = useState(1);

  // console.log(searchData, "searchdata");
  // const serviceValue = useAppSelector((state)=>state.homeReducer)
  // console.log('serviceValue',serviceValue)
  const [searchqueryData, setSearchqueryData] = useState(searchData);
  // console.log(searchqueryData, "searchquerydata");

  const [search, setSearch] = useState<any>([]);
  console.log("search",search)
  const [noOfPages] = useState(Math.ceil(search.length / itemsPerPage));
  const [facilityType, setFacilityType] = useState<any>([]);
  const [checkFacText, setCheckFacText] = useState<any>(false);
  const [facilityCheck, setFacilityCheck] = useState<any>("");

  const [insuranceDetails, setInsuranceDetails] = useState<any>([]);
  const [insuranceCheck, setInsuranceCheck] = useState<any>("INSP-1");
  const [checkInsText, setCheckInsText] = useState<any>(true);
  const [servicelocationType, setServiceLocationType] = useState<any>([]);
  const [checklocText, setCheckLocText] = useState<any>(true);
  const [locationCheck, setLocationCheck] = useState<any>("21");

  const [maxPrice, setMaxPrice] = useState<any>(100);
  const [minPrice, setMinPrice] = useState<any>(1);
  const [value, setValue] = useState<number[]>([0, 100]);
  const dispatch = useAppDispatch();

  const q = providerDataQuery.Service;
  const locationQ = providerDataQuery.Location;
  console.log("search",search)

   
  var pagination = {
    total:search.length,
    per_page:itemsPerPage,
    current_page:page1,
    last_page:Math.ceil(search.length / itemsPerPage),
    from: ((page1 -1) * itemsPerPage) + 1,
    to:page1*itemsPerPage<search.length ? page1*itemsPerPage : search.length
  }



  const OPTIONS_LIMIT = 10;
  const defaultFilterOptions = createFilterOptions();

  const filterOptions = (options: any, state: any) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  useEffect(() => {
    const postData = { q: q, location: locationQ,insuranceProvider:insuranceCheck,serviceCode:locationCheck };
   
    axiosPrivate
      .post(`/search/negotiatedSearch`, postData)
      .then((res) => {
        setLoadingState(true)
        dispatch(dataProviderSearch(res.data.data));
        
        setSearch(res.data.data);
        setLoadingState(false)
        const maxFilter = Math.max(
          ...res.data.data.map((fprice: any) => {

              return fprice.negotiatedRates.negotiated_rates
              ?.negotiated_prices?.negotiated_rate;
          
          })
        );
        console.log(maxFilter, "....maxPrice");
        

        const minFilter = Math.min(
          ...res.data.data.map((fprice: any) => {
           
              return fprice.negotiatedRates.negotiated_rates
              ?.negotiated_prices?.negotiated_rate;
            
          })
        );
        console.log(minFilter, "....minPrice");
        if(res.data.data.length!==0){
          setMaxPrice(maxFilter);
          setMinPrice(minFilter);
          setValue([minFilter, maxFilter]);
        }
      })
      .catch((e) => console.log(e));
    const getFacilityType = async () => {
      await axiosPrivate
        .get(`/FacilityType/findfacilityType`)
        .then((res) => {
          console.log(res.data, "facilityType");
          setFacilityType(res.data);
          // dispatch(facilityTypeInfo(res.data))
        })
        .catch((e) => console.log(e));
    
      };
      

    const getInsuranceProvider = async () => {
      await axiosPrivate
        .get(`/insuranceProvider/findinsuranceProvider`)
        .then((res) => {
          console.log(res.data, "insuranceprovider");
          setInsuranceDetails(res.data);

          // dispatch(facilityTypeInfo(res.data))
        })
        .catch((e) => console.log(e));
    };

    const getServiceLocation = async () => {
      await axiosPrivate
        .get(`/servicecode/findservicelocation`)
        .then((res) => {
          console.log(res.data, "Serviceloc");
          setServiceLocationType(res.data);
          // dispatch(facilityTypeInfo(res.data))
        })
        .catch((e) => console.log(e));
    };

    getFacilityType();
    getInsuranceProvider();
    getServiceLocation();
  }, []);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage1(value);
  };
  interface forminitialValues {
    Service: any;
    Location: any;
  }

  const initialValues: forminitialValues = {
    Service: q,
    Location: locationQ,
  };

  const validationSchema = Yup.object().shape({
    Service: Yup.string().required("Required"),
    Location: Yup.string().required("Required"),
  });
  const onSubmit = (values: forminitialValues, actions: any) => {
    const postData = { q: values.Service.trim(), location: values.Location.trim()};
    setLoading(true)
    axiosPrivate
      .post(`/search/negotiatedSearch`, postData)
      .then((res) => {
      
        console.log(res.data, "checkT");
        setCheckText(false);
        setCheckFacText(false);
        
        setFacilityCheck("");

        setLocationCheck("21");
        setInsuranceCheck("INSP-1");

        dispatch(dataProviderSearch(res.data.data));
        dispatch(dataQueryProvider(values))
       
        setSearch(res.data.data);
        setLoading(false)
        setSearchParams({ q: values.Service.trim(), location: values.Location.trim() });
        const maxFilter = Math.max(
          ...res.data.data.map((fprice: any) => {

              return fprice.negotiatedRates.negotiated_rates
              ?.negotiated_prices?.negotiated_rate;
          
          })
        );
        console.log(maxFilter, "....maxPrice");
        

        const minFilter = Math.min(
          ...res.data.data.map((fprice: any) => {
           
              return fprice.negotiatedRates.negotiated_rates
              ?.negotiated_prices?.negotiated_rate;
            
          })
        );
        console.log(minFilter, "....minPrice");
        if(res.data.data.length!==0){
          setMaxPrice(maxFilter);
          setMinPrice(minFilter);
          setValue([minFilter, maxFilter]);
        }
        console.log("searchpro", res);
      
      })
      .catch((err) => {
        toast.error(err.message);
setLoading(false)})
  };

  //Table Pagination
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;




  const filterFacilityType = (
    filter: any,
    dis?: any,
    type?: any,
    details?: any,
    insurance?: any,
    serviceLocation?: any,
    negotiatedRates?:any
  ) => {
    console.log(
      filter,
      dis,
      type,
      details,
      serviceLocation,
      negotiatedRates,
      insurance,
      "axiosCheck"
    );
    const noDistance = {
      q: details.Service.trim(),
      location: details.Location.trim(),
      facilityType: type,
     
      serviceCode: serviceLocation,
      insuranceProvider: insurance,
    };
    const noFacilityType = {
      q: details.Service.trim(),
      location: details.Location.trim(),
      distance: dis,
      
      serviceCode: serviceLocation,
      insuranceProvider: insurance,
    };
    const withFacilityType = {
      q: details.Service.trim(),
      location: details.Location.trim(),
      distance: dis,
      facilityType: type,
      
      serviceCode: serviceLocation,
      insuranceProvider: insurance,
    };

    const noFacilityTypeforNegotiatedrate ={
      q: details.Service.trim(),
      location: details.Location.trim(),
      distance: dis,
      
      serviceCode: serviceLocation,
      insuranceProvider: insurance,
      negotiatedRates:negotiatedRates
    };

    const withFacilityTypeforNegotiatedrate ={
      q: details.Service.trim(),
      location: details.Location.trim(),
      distance: dis,
      facilityType: type,
      serviceCode: serviceLocation,
      insuranceProvider: insurance,
      negotiatedRates:negotiatedRates

    };

    
    switch (filter) {
      case "noDistance":
        return axiosPrivate.post(`/search/negotiatedSearch`, noDistance);
      case "noFacilityType":
        return axiosPrivate.post(`/search/negotiatedSearch`, noFacilityType);
      case "withFacilityType":
        return axiosPrivate.post(`/search/negotiatedSearch`, withFacilityType);
      case "noFacilityTypeforNegotiatedrate":
        return axiosPrivate.post(`/search/negotiatedSearch`, noFacilityTypeforNegotiatedrate);
        case "withFacilityTypeforNegotiatedrate":
          return axiosPrivate.post(`/search/negotiatedSearch`, withFacilityTypeforNegotiatedrate);
       
   
      default:
        return axiosPrivate.post(
          `/search/negotiatedSearch`,
          noFacilityType
        );
    }
  };


  function handleTypeInputChange(event: any, searchValue: any) {
    var checkFacility = false;
    setLoading(true)
    if (event.target.value === facilityCheck) {
      setCheckFacText(false);
      setFacilityCheck("");
      checkFacility = false;
    } else {
      setCheckFacText(true);
      setFacilityCheck(event.target.value);
      checkFacility = true;
    }
    if (checkFacility) {
      filterFacilityType(
        "withFacilityType",
        `${distance}mi`,
        event.target.value,
        searchValue,
               insuranceCheck,
        locationCheck,
        value
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          setLoading(false)
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
      
                return fprice.negotiatedRates.negotiated_rates
                ?.negotiated_prices?.negotiated_rate;
           
            })
          );
          console.log(maxFilter, "....maxPrice");

          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
      
                return fprice.negotiatedRates.negotiated_rates
                ?.negotiated_prices?.negotiated_rate;
            
                
            })
           
          );
          console.log(minFilter, "....minPrice");
          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(0);
          } else {
            setValue([minFilter, maxFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          } 
          
        
        })
        .catch((e) => console.log(e));
    } else {
      filterFacilityType(
        "noFacilityType",
        `${distance}mi`,
        event.target.value,
        searchValue,
       
        insuranceCheck,
        locationCheck,
        value
      )
        .then((res) => {
          setLoading(false)
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
       
                return fprice.negotiatedRates.negotiated_rates
                ?.negotiated_prices?.negotiated_rate;
           
            })
            
          );
          console.log(maxFilter, "....maxPrice");
          
          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
     
                return fprice.negotiatedRates.negotiated_rates
                ?.negotiated_prices?.negotiated_rate;
     
            })
          );
          console.log(minFilter, "....minPrice");
          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(0);
          } else {
            setValue([minFilter, maxFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          }
        })
        .catch((e) => console.log(e));
    }
  }
  function sliderChange(event: any, newValue: any, searchValues: any) {
    setService(true);
    setValue(newValue as number[]);
    console.log("newValue", newValue);
   
    if (facilityCheck === "") {
      filterFacilityType(
        "noFacilityTypeforNegotiatedrate",
        `${distance}mi`,
        facilityCheck,
        searchValues,
        insuranceCheck,
        locationCheck,
        newValue
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          console.log("pricecheck",res.data.data)
        })
        .catch((e) => console.log(e));
    } else {
      filterFacilityType(
        "withFacilityTypeforNegotiatedrate",
        `${distance}mi`,
        facilityCheck,
        searchValues,
        insuranceCheck,
        locationCheck,
        newValue
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          console.log("pricecheck1",res.data.data)
        })
        .catch((e) => console.log(e));
    }
  }
  function valuetext(userValue: number) {
    return `${userValue}$`;
  }
  function handleInsuranceInputChange(event: any, searchValue: any) {
    setLoading(true)
    setInsuranceCheck(event.target.value);
    if (facilityCheck === "") {
      filterFacilityType(
        "noFacilityType",
        `${distance}mi`,
        facilityCheck,
        searchValue,
        
        event.target.value,
        locationCheck,
        value,
        
      )
        .then((res) => {
          setLoading(false)
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
        })
        .catch((e) => console.log(e));
    } else {
      filterFacilityType(
        "withFacilityType",
        `${distance}mi`,
        facilityCheck,
        searchValue,
       
        event.target.value,
        locationCheck,
        value
      )
        .then((res) => {
          setLoading(false)
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
          
                return fprice.negotiatedRates?.negotiated_rates
                ?.negotiated_prices?.negotiated_rate;
            
            })
          );
          console.log(maxFilter, "....maxPrice");

          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
        
                return fprice.negotiatedRates.negotiated_rates
                ?.negotiated_prices?.negotiated_rate;
             
            })
          );
          console.log(minFilter, "....minPrice");
          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(0);
          } else {
            setValue([minFilter, maxFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          }
        })
        .catch((e) => console.log(e));
    }

    
  }
  function handleServicelocationchange(event: any, searchValue: any) {
    setLoading(true)
    setLocationCheck(event.target.value);
    if(facilityCheck===""){
      filterFacilityType(
        "noFacilityType",
        `${distance}mi`,
        facilityCheck,
        searchValue,
       
        insuranceCheck,
        event.target.value,
        value
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setLoading(false)
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
          
                return fprice.negotiatedRates?.negotiated_rates
                ?.negotiated_prices?.negotiated_rate;
            
            })
          );
          console.log(maxFilter, "....maxPrice");

          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
        
                return fprice.negotiatedRates.negotiated_rates
                ?.negotiated_prices?.negotiated_rate;
             
            })
          );
          console.log(minFilter, "....minPrice");
          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(0);
          } else {
            setValue([minFilter, maxFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          }
        })
        .catch((e) => console.log(e));
    
    }else{
      filterFacilityType(
        "withFacilityType",
        `${distance}mi`,
        facilityCheck,
        searchValue,
     
        insuranceCheck,
        event.target.value,
        value
      )
        .then((res) => {
          setLoading(false)
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
          
                return fprice.negotiatedRates?.negotiated_rates
                ?.negotiated_prices?.negotiated_rate;
            
            })
          );
          console.log(maxFilter, "....maxPrice");

          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
        
                return fprice.negotiatedRates.negotiated_rates
                ?.negotiated_prices?.negotiated_rate;
             
            })
          );
          console.log(minFilter, "....minPrice");
          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(0);
          } else {
            setValue([minFilter, maxFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          }
        })
        .catch((e) => console.log(e));
    }
   }

  const distanceSliderChange = (v: any, searchValue: any) => {
    setDistance(v);
    if (facilityCheck === "") {
      filterFacilityType("noFacilityType", `${v}mi`, 
      facilityCheck, searchValue,insuranceCheck,locationCheck,
      value
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          console.log(res.data.data, "checkDistance");
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
          
                return fprice.negotiatedRates?.negotiated_rates
                ?.negotiated_prices?.negotiated_rate;
            
            })
          );
          console.log(maxFilter, "....maxPrice");

          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
        
                return fprice.negotiatedRates.negotiated_rates
                ?.negotiated_prices?.negotiated_rate;
             
            })
          );
          console.log(minFilter, "....minPrice");
          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(0);
          } else {
            setValue([minFilter, maxFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          }
        })
        .catch((e) => console.log(e));
    } else {
      filterFacilityType("withFacilityType", `${v}mi`, 
      facilityCheck, searchValue,
      insuranceCheck,locationCheck,
      value)
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
     
                return fprice.negotiatedRates.negotiated_rates
                ?.negotiated_prices?.negotiated_rate;
            
            })
          );

          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
    
                return fprice.negotiatedRates.negotiated_rates
                ?.negotiated_prices?.negotiated_rate;
            
            })
          );

          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(0);
          } else {
            setValue([minFilter, maxFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  const followersMarks = [
    {
      value: 10,

      label: "10mi",
    },

    {
      value: 50,

      label: "50mi",
    },

    {
      value: 100,

      label: "100mi",
    },
    //   {
    //     value:distance,
    //     label:`${distance}mi`
    //   }
  ];

  return (
    <Box sx={{ backgroundColor: "primary.light", padding: "1.8rem" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, setFieldValue, values }) => (
          <Form>
            {LoadingState?
            
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
          </Box>: 
            <>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Grid
                container
                columnSpacing={5}
                sx={{
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  background: "#6D90FE",
                  // height: "6em",
                  width: "80%",
                  rowGap:{xs:"0.4rem",md:"none"}
                }}
              >
                <Grid item md={6} xs={12}>
                <Field
                    label="Service Name"
                    name="Service"
                    component={Autocomplete}
                    options={checkInfo ?? []}
                    loading={checkInfo.length === 0}
                    //  PaperComponent={CustomPaper}
                    filterOptions={filterOptions}
                    freeSolo
                    onInputChange={(e: any, value: any) => {
                    const postData = { q:value }
                    console.log(value,'onchangevalue')
                    setCheckText(false);
                      setCheckFacText(false);
                      setFieldValue("Service", value);
                      setFacilityCheck("");
                      setLocationCheck("21");
                      setInsuranceCheck("INSP-1");
                   axiosPrivate.post(`/search/serviceNamesearch`, postData)
                      .then((res) => {
                        console.log(res.data.data, 'servicesearch')
                        setCheckInfo(res.data.data)
                      })
                      .catch((e) => console.log(e));

                    }}
                    value={values.Service}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <TextField
                        {...params}
                        name="Service"
                        // label="Search Service Name"
                        onChange={handleChange}
                        variant="outlined"

                        sx={{
                          
                          "& .MuiAutocomplete-popupIndicator": { transform: "none" },
                          ".MuiInputBase-input": {
                            background: "white",
                          },
                          ".MuiInputBase-root": {
                            background: "white"
                          },
                          borderRadius: 1,
                          "&::placeholder": {
                            fontSize: "1.1rem",
                            color: "black",
                          }      
                        
                        }}
                      />
                    )}
                  />
                 
                </Grid>
                <Grid item md={4} xs={12}>
                  <Field
                    as={TextField}
                    name="Location"
                    value={values.Location}
                    placeholder="Location"
                    type="text"
                    onChange={(e: any) => {
                      setCheckText(false);
                      setCheckFacText(false);
                      setFieldValue("Location", e.target.value);
                      setFacilityCheck("");
                      setLocationCheck("21");
                      setInsuranceCheck("INSP-1");
                    }}
                    fullWidth={true}
                    sx={{
                      borderRadius: 1,
                      "&::placeholder": {
                        fontSize: "1.1rem",
                        color: "black",
                      },
                      ".MuiInputBase-input": {
                        background: "white",
                      },
                      ".MuiFormLabel-root ": {
                        letterSpacing: "0.2rem",
                        fontSize: "0.8rem",
                      },
                      ".MuiInputLabel-shrink": {
                        letterSpacing: 0,
                      },
                    }}
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <Button
                    type="submit"
                    size="large"
                    fullWidth={false}
                    variant="contained"
                    disabled={loading}
                    // onClick={() => { setSelect("searchdata") }}
                    sx={{
                      // marginTop: "-100px",
                      // ml: "350px",
                      backgroundColor: "#1C3988",

                      height: "7.3vh",
                      // width: "20vw",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      // gap:"1.2rem",

                      "&:hover": {
                        color: "secondary.dark",
                        border: "1px solid blue",
                        // letterSpacing: "0.2rem",
                        // fontSize: "1rem",
                      },
                    }}
                  >
                   {loading && (
                   <CircularProgress size={14} />
                  )}
                      {loading && <span>searching</span> }
          {!loading &&<span ><SearchIcon  />Search</span>}  
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {/* </Grid> */}

            {/* </Box> */}

            <Grid container xs={12} columnGap={5} mt="20px">
              <Grid
                item
                xs={2.5}
                sx={{
                  display: { xs: "none", md: "flex" },
                  padding: "1rem",
                  backgroundColor: "primary.dark",

                  flexDirection: "column",
                  rowGap: "14rem",
                }}
              >
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography
                    variant="h6"
                    sx={{ mb: "30px", fontSize: "2rem" }}
                  >
                    Filters
                  </Typography>

                  <Box>
                    <Paper
                      sx={{
                        fontSize: "1rem",
                        borderRadius: "20px",
                        backgroundColor: "#687B9E",
                        color: "white",
                        mb: "10px",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        padding: "0.2rem",
                      }}
                    >
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? (
                          <KeyboardArrowUp sx={{ color: "white" }} />
                        ) : (
                          <KeyboardArrowDown sx={{ color: "white" }} />
                        )}
                      </IconButton>
                      Distance
                    </Paper>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      
                      <Box sx={{ padding: "1rem 1rem 0 1rem" }}>
                        <Slider
                          value={distance}
                          valueLabelDisplay="on"
                          step={1}
                          marks={followersMarks}
                          min={10}
                          max={100}
                          onChange={(e, sliderValue: any) => {
                            setLoading(true)
                            setDistance(sliderValue);
                          }}
                          onChangeCommitted={(e, sliderValue) => {
                            distanceSliderChange(sliderValue, values);
                            setLoading(false)
                          }}
                        />
                      </Box>
                    </Collapse>
                  </Box>
                  <Box>
                    <Paper
                      sx={{
                        fontSize: "1rem",
                        borderRadius: "20px",
                        backgroundColor: "#687B9E",
                        color: "white",
                        mb: "10px",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        padding: "0.2rem",
                      }}
                    >
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenScore(!openScore)}
                      >
                        {openScore ? (
                          <KeyboardArrowUp sx={{ color: "white" }} />
                        ) : (
                          <KeyboardArrowDown sx={{ color: "white" }} />
                        )}
                      </IconButton>
                      Quality Score
                    </Paper>
                 
                  </Box>
                  <Box>
                    <Paper
                      sx={{
                        fontSize: "1rem",
                        borderRadius: "20px",
                        backgroundColor: "#687B9E",
                        color: "white",
                        mb: "10px",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        padding: "0.2rem",
                      }}
                    >
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenRate(!openRate)}
                      >
                        {openRate ? (
                          <KeyboardArrowUp sx={{ color: "white" }} />
                        ) : (
                          <KeyboardArrowDown sx={{ color: "white" }} />
                        )}
                      </IconButton>
                      Negotiated Rate
                    </Paper>
                    <Collapse in={openRate} timeout="auto" unmountOnExit>
                      <Box sx={{ padding: "0 1rem" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography>Min</Typography>
                          <Typography>Max</Typography>
                        </Box>

                        <Slider
                          size="medium"
                           getAriaLabel={(index) =>
          index === 0 ? "Minprice" : "Maxprice"
        }
                          track="normal"
                          value={value}
                          marks={[
                            { value: value[0], label: value[0] },
                            { value: value[1], label: value[1] },
                          ]}
                          onChange={(e, sliderArray: any) => {
                            setLoading(true)
                            setValue(sliderArray);
                          }}
                          onChangeCommitted={(event, v) =>{
                            sliderChange(event, v, values)
                            setLoading(false)
                          }}
                          min={minPrice}
                          max={maxPrice}
                          step={1}
                          valueLabelDisplay="auto"
                          getAriaValueText={valuetext}
                          
                          
                          sx={{
                            ".MuiSlider-thumb": {
                              height: 15,
                              width: 15,
                              
                              backgroundColor: "#fff",
                              border: "2px solid #687B9E",
                              boxShadow: "0px 0px 5px  #687B9E",
                              "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible":
                                {
                                  boxShadow: "0px 0px 5px  #687B9E",
                                },
                              "&:before": {
                                display: "none",
                              },
                              // "&.second-thumb": {
                              //   border: "2px dashed purple"
                              // },
                              // "& .MuiSlider-track": {
                              //   height: 3
                              // }
                            },
                                                       
                            color: "#687B9E",
                          }}
                        />
                      </Box>
                    </Collapse>
                  </Box>
                  <Box>
                    <Paper
                      sx={{
                        fontSize: "1rem",
                        borderRadius: "20px",
                        backgroundColor: "#687B9E",
                        color: "white",
                        mb: "10px",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        padding: "0.2rem",
                      }}
                    >
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen1(!open1)}
                      >
                        {open1 ? (
                          <KeyboardArrowUp sx={{ color: "white" }} />
                        ) : (
                          <KeyboardArrowDown sx={{ color: "white" }} />
                        )}
                      </IconButton>
                      Insurance Name
                    </Paper>

                    <Collapse in={open1} timeout="auto" unmountOnExit>
                      <Grid item xs={12}>
                        <FormGroup
                        // name="distancefilter"
                        // value={distance}
                        >
                          {/* {JSON.stringify(insuranceDetails)} */}

                          <RadioGroup name="length" value={insuranceCheck}>
                            {/* {JSON.stringify(insuranceCheck)} */}
                            {insuranceDetails.map((ins: any, i: any) => (
                              <FormControlLabel
                                key={i}
                                value={ins.insuranceProviderID}
                                control={
                                  <Radio
                                    checked={
                                      insuranceCheck ===
                                        ins.insuranceProviderID && checkInsText
                                    }
                                    onClick={(e: any) => {
                                      handleInsuranceInputChange(e, values);
                                    }}
                                  />
                                }
                                label={ins.insuranceProvider}
                                labelPlacement="end"
                              />
                            ))}
                          </RadioGroup>
                        </FormGroup>
                      </Grid>
                    </Collapse>
                  </Box>
                  <Box>
                    <Paper
                      sx={{
                        fontSize: "1rem",
                        borderRadius: "20px",
                        backgroundColor: "#687B9E",
                        color: "white",
                        mb: "10px",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        padding: "0.2rem",
                      }}
                    >
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen2(!open2)}
                      >
                        {open2 ? (
                          <KeyboardArrowUp sx={{ color: "white" }} />
                        ) : (
                          <KeyboardArrowDown sx={{ color: "white" }} />
                        )}
                      </IconButton>
                      Facility Type
                    </Paper>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                      <Grid item xs={12}>
                        <FormGroup
                       
                        >
                          {/* {JSON.stringify(facilityType)} */}
                          <RadioGroup name="length" value={facilityCheck}>
                            {/* {JSON.stringify(facilityCheck)} */}
                            {facilityType.map((type: any, i: any) => (
                              <FormControlLabel
                                key={i}
                                value={type.facilityTypeId}
                                control={
                                  <Radio
                                    checked={
                                      facilityCheck === type.facilityTypeId &&
                                      checkFacText
                                    }
                                    onClick={(e: any) => {
                                      handleTypeInputChange(e, values);
                                    }}
                                 
                                  />
                                }
                                label={type.item.split("-")[1]}
                                labelPlacement="end"
                              />
                            ))}
                          </RadioGroup>
                          
                        </FormGroup>
                      </Grid>
                    </Collapse>
                  </Box>
                  <Box>
                    <Paper
                      sx={{
                        fontSize: "1rem",
                        borderRadius: "20px",
                        backgroundColor: "#687B9E",
                        color: "white",
                        mb: "10px",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        padding: "0.2rem",
                      }}
                    >
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen3(!open3)}
                      >
                        {open3 ? (
                          <KeyboardArrowUp sx={{ color: "white" }} />
                        ) : (
                          <KeyboardArrowDown sx={{ color: "white" }} />
                        )}
                      </IconButton>
                      Service Location
                    </Paper>
                    <Collapse in={open3} timeout="auto" unmountOnExit>
                      <Grid item xs={12}>
                        <FormGroup
                        // name="distancefilter"
                        // value={distance}
                        >
                          {/* {JSON.stringify(facilityType)} */}
                          <RadioGroup name="length" value={locationCheck}>
                            {servicelocationType.map((type: any, i: any) => (
                              <>
                                {/* {JSON.stringify(
                                    checklocText)} */}
                                <FormControlLabel
                                  key={i}
                                  value={type.service_code}
                                  control={
                                    <Radio
                                      checked={
                                        locationCheck === type.service_code
                                      }
                                      onClick={(e: any) => {
                                        handleServicelocationchange(e, values);
                                        // e.target.value
                                      }}
                                    />
                                  }
                                  label={type.serviceLocationName}
                                  labelPlacement="end"
                                />
                              </>
                            ))}
                          </RadioGroup>
                        </FormGroup>
                      </Grid>
                    </Collapse>
                  </Box>
                  {/* </Box> */}
                </Box>
                <Grid item sx={{ display: { xs: "none" } }}>
                  <Box
                    sx={{
                      backgroundColor: "#D9D9D9",
                      height: "35vh",
                      width: "250px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "2rem" }} textAlign={"center"}>
                      Map Place holder
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            
              <Grid
                item
                md={9}
                sx={{
                  display: { xs: "none", md: "block" },
                  backgroundColor: "#E5EEF7",
                  
                }}
              >


{loading&&<LinearProgress/>}
             <Box sx={{mt:"2rem", padding: "0 4rem 4rem 4rem"}}>
              {
              
              search.length!==0?
                  (itemsPerPage>0
                    ?search.slice((page1 - 1) * itemsPerPage, page1 * itemsPerPage):
                    search)        
                
    .map((dsearch: any, i: any) => (            
                  <div key={i}>
                    <Paper elevation={3}>
                      <Card
                        raised
                        sx={{
                          backgroundColor: "#CDDBF8",
                          padding: "15px",

                          mb: "2rem",
                        }}
                      >
                        <Grid container direction="row">
                          <Grid xs={9}>
                            <Typography
                              sx={{
                                fontSize: "1.40rem",
                                color: "black",
                                mb: "20px",
                              }}
                            >
                              {dsearch.FacilityName}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                color: "black",
                                mb: "20px",
                              }}
                            >
                              {dsearch.facilityDetails?.address?.addressLine1 +
                                "," +
                                dsearch.facilityDetails?.address?.city +
                                "," +
                                dsearch.facilityDetails?.address?.state +
                                " - " +
                                dsearch.facilityDetails?.address?.zipCode}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                color: "black",
                                mb: "10px",
                              }}
                            >
                              {dsearch.DiagnosisTestorServiceName}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                color: "blue",
                                mb: "10px",
                              }}
                            >
                              Distance: {dsearch.distance} miles
                            </Typography>
                          </Grid>
                          <Grid xs={3}>
                            <Grid
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                                padding: "10px",
                              }}
                            >
                              <Box
                                sx={{
                                  borderRadius: "0.5rem",
                                  padding: "0.5rem",
                                  width: "100px",
                                  fontSize: "1.1rem",
                                  backgroundColor: "#1C3988",
                                  color: "white",
                                  mb: "10px",
                                  textAlign: "center",
                                }}
                              >
                                ${" "}
                                {
                                  dsearch?.negotiatedRates?.negotiated_rates
                                    ?.negotiated_prices?.negotiated_rate
                                }
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: "15px",

                                  // width: "100px",
                                }}
                              >
                                Negotiated price
                              </Typography>
                            </Grid>
                            <Grid
                              container
                              direction="row"
                              justifyContent="flex-end"
                            >
                              <Typography
                                sx={{
                                  fontSize: "1.25rem",
                                  color: "black",
                                  mr: "60px",
                                }}
                              >
                                eCQMscore:
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "2rem",
                                  color: "black",
                                  mb: "15px",
                                }}
                              >
                                {dsearch.eCQMscore}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Card>
                    </Paper>
                  </div>
                ))
                :
            <Box sx={{display:"flex",justifyContent:'center',alignItems:"center",height:"10vh"}}><Typography>No results found</Typography></Box>
                              }
            
              
     {search.length!==0?
      <>
      <Grid container  sx={{ display: "flex", justifyContent: "center" }}>
     <Typography sx={{padding:"10px"}} >
         Displaying items: {pagination.from}-{pagination.to}<span> </span>of<span> </span>{pagination.total}
          
     </Typography>
               <Pagination
              
              
 count={Math.ceil(search.length / itemsPerPage)}  
                page={page1}
                siblingCount={0}
                onChange={handleChangePage}
                defaultPage={1}
                color="primary"
                size="large"
                
                showFirstButton
                showLastButton
              />
                </Grid>
                </>  
              :null} 
            
                </Box>
              </Grid>
            </Grid>

            {/* mobilecards display */}
         {/* Mobile icon view */}

              <Grid container sx={{ display: { xs: "block", md: "none" } }}>
                <Box>
                  <IconButton
                    size="large"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
               >
                    <MenuItem sx={{display:"flex",justifyContent:"right"}}>
                    <ClearIcon
        
                    onClick={handleCloseNavMenu}/>
                    </MenuItem>
                    <MenuItem
                      // onClick={handleCloseNavMenu}
                      sx={{ width: 250 }}
                    >
                      <Box>
                 
                        <IconButton
                          sx={{ fontSize: "1rem" }}
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpen(!open)}
                        >
                          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                        Distance
                    
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Box sx={{ padding: "1rem 1rem 0 1rem" }}>
                            <Slider
                              value={distance}
                              valueLabelDisplay="on"
                              step={1}
                              marks={followersMarks}
                              min={10}
                              max={100}
                              onChange={(e, sliderValue: any) => {
                                setDistance(sliderValue);
                              }}
                              onChangeCommitted={(e, sliderValue) => {
                                distanceSliderChange(sliderValue, values);
                                handleCloseNavMenu();
                              }}
                            />
                          </Box>
                        </Collapse>
                      </Box>
                    </MenuItem>
                    {/* <MenuItem
                      // onClick={handleCloseNavMenu}
                      sx={{ width: 250, fontSize: "1.25rem" }}
                    >
                  
                    </MenuItem> */}

                    {/* <MenuItem 
                    // onClick={handleCloseNavMenu} 
                    sx={{ width: 250 }}>
                      <Typography
                        sx={{
                          // color: location === "facility" ? "#4D77FF" : "default",
                          fontSize: "1.1rem",
                          // borderBottom: location === "facility" ? "3px solid blue" : "none",
                          // padding: "0.3rem",

                          cursor: "pointer",
                        }}
                      >
                     check
                      </Typography>
                    </MenuItem> */}

                    <MenuItem 

                    // onClick={handleCloseNavMenu} 
                    sx={{ width: 250 }}>
                        <Box>
                        <IconButton
                          sx={{ fontSize: "1rem" }}
                          aria-label="expand row"
                          size="small"
                          onClick={() =>setOpenRate(!openRate)}
                        >
                          {openRate ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                         Negotiated Rate
                      <Collapse in={openRate} timeout="auto" unmountOnExit>
                      <Box sx={{ padding: "0 1rem" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography>Min</Typography>
                          <Typography>Max</Typography>
                        </Box>

                        <Slider
                          size="medium"
                          getAriaLabel={() => "Price range"}
                          value={value}
                          marks={[
                            { value: value[0], label: value[0] },
                            { value: value[1], label: value[1] },
                          ]}
                          onChange={(e, sliderArray: any) => {
                            setValue(sliderArray);
                          }}
                          onChangeCommitted={(event, v) =>
                            sliderChange(event, v, values)
                          }
                          min={minPrice}
                          max={maxPrice}
                          step={1}
                          valueLabelDisplay="auto"
                          getAriaValueText={valuetext}
                          sx={{
                            ".MuiSlider-thumb": {
                              height: 15,
                              width: 15,
                              backgroundColor: "#fff",
                              border: "2px solid #687B9E",
                              boxShadow: "0px 0px 5px  #687B9E",
                              "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible":
                                {
                                  boxShadow: "0px 0px 5px  #687B9E",
                                },
                              "&:before": {
                                display: "none",
                              },
                            },
                            color: "#687B9E",
                          }}
                        />
                      </Box>
                    </Collapse>
                      </Box>
                    </MenuItem>
                    <MenuItem 
                    // onClick={handleCloseNavMenu} 
                    sx={{ width: 250 }}>
                      <Box>
                        <IconButton
                          sx={{ fontSize: "1rem" }}
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpen1(!open1)}
                        >
                          {open1 ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                        Insurance Name
                        <Collapse in={open1} timeout="auto" unmountOnExit>
                          <Grid item xs={12}>
                            <FormGroup>
                              <RadioGroup name="length" value={insuranceCheck}>
                                {insuranceDetails.map((ins: any, i: any) => (
                                  <FormControlLabel
                                    key={i}
                                    value={ins.insuranceProviderID}
                                    control={
                                      <Radio
                                        checked={
                                          insuranceCheck ===
                                            ins.insuranceProviderID &&
                                          checkInsText
                                        }
                                        onClick={(e: any) => {
                                          handleInsuranceInputChange(e, values);
                                          handleCloseNavMenu();
                                        }}
                                      />
                                    }
                                    label={ins.insuranceProvider}
                                    labelPlacement="end"
                                  />
                                ))}
                              </RadioGroup>
                            </FormGroup>
                          </Grid>
                        </Collapse>
                      </Box>
                    </MenuItem>

                    <MenuItem 
                    // onClick={handleCloseNavMenu} 
                    sx={{ width: 250 }}>
                      <Box>
                        {/* <Paper sx={{
                    fontSize: "1rem",
                    borderRadius: "20px",
                    backgroundColor: "#CDDBF8",
                    mb: "10px"
                  }}> */}
                        <IconButton
                          sx={{ fontSize: "1rem" }}
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpen2(!open2)}
                        >
                          {open2 ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                        Facility Type
                        {/* </Paper> */}
                        <Collapse in={open2} timeout="auto" unmountOnExit>
                          <Grid item xs={12}>
                            <FormGroup
                            // name="distancefilter"
                            // value={distance}
                            >
                              {/* {JSON.stringify(facilityType)} */}
                              <RadioGroup name="length" value={facilityCheck}>
                                {/* {JSON.stringify(facilityCheck)} */}
                                {facilityType.map((type: any, i: any) => (
                                  <FormControlLabel
                                    key={i}
                                    value={type.facilityTypeId}
                                    control={
                                      <Radio
                                        checked={
                                          facilityCheck ===
                                            type.facilityTypeId && checkFacText
                                        }
                                        onClick={(e: any) => {
                                          handleTypeInputChange(e, values);
                                          handleCloseNavMenu();
                                        }}
                   
                                      />
                                    }
                                    label={type.item.split("-")[1]}
                                    labelPlacement="end"
                                  />
                                ))}
                              </RadioGroup>
                          
                            </FormGroup>
                          </Grid>
                        </Collapse>
                      </Box>
                    </MenuItem>
                    <MenuItem 
                    // onClick={handleCloseNavMenu} 
                    sx={{ width: 250 }}>
                      <Box>
                        {/* <Paper sx={{
                    fontSize: "1rem",
                    borderRadius: "20px",
                    backgroundColor: "#CDDBF8",
                    mb: "10px"
                  }}> */}
                        <IconButton
                          sx={{ fontSize: "1rem" }}
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpen3(!open3)}
                        >
                          {open3 ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                        Service Location
                        {/* </Paper> */}
                        <Collapse in={open3} timeout="auto" unmountOnExit>
                        <Grid item xs={12}>
                        <FormGroup
                        // name="distancefilter"
                        // value={distance}
                        >
                          {/* {JSON.stringify(facilityType)} */}
                          <RadioGroup name="length" value={locationCheck}>
                            {servicelocationType.map((type: any, i: any) => (
                              <>
                                {/* {JSON.stringify(
                                    checklocText)} */}
                                <FormControlLabel
                                  key={i}
                                  value={type.service_code}
                                  control={
                                    <Radio
                                      checked={
                                        locationCheck === type.service_code
                                      }
                                      onClick={(e: any) => {
                                        handleServicelocationchange(e, values);
                                        // e.target.value
                                      }}
                                    />
                                  }
                                  label={type.serviceLocationName}
                                  labelPlacement="end"
                                />
                              </>
                            ))}
                          </RadioGroup>
                        </FormGroup>
                      </Grid>
                        </Collapse>
                      </Box>
                    </MenuItem>
                  </Menu>
                 
                </Box>
              </Grid>
           <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "column"
              }}
            >
            { search.length!==0?
                  (itemsPerPage>0
                    ?search.slice((page1 - 1) * itemsPerPage, page1 * itemsPerPage):
                    search)        
                
    .map((dsearch: any, i: any) => (
                <>
                  <Paper
                    sx={{ padding: "0.5rem", m: "0.2rem", fontSize: "0.9rem" }}
                  >
                    <IconButton onClick={() => setOpen(open === i ? -1 : i)}>
                      <ArrowDropDown
                        sx={{ transform: open === i ? "i" : "rotate(-90deg)" }}
                      />
                      {open === i ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                    {dsearch.FacilityName}
                  </Paper>

                  <Collapse in={open === i} timeout="auto" unmountOnExit>
                    <Paper
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mt: "0.2rem",
                        padding: "1rem",
                      }}
                    >
                      <Grid xs={8}>
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            color: "black",
                            mb: "10px",
                          }}
                        >
                          {dsearch.facilityDetails?.address?.addressLine1 +
                            "," +
                            dsearch.facilityDetails?.address?.city +
                            "," +
                            dsearch.facilityDetails?.address?.state +
                            " - " +
                            dsearch.facilityDetails?.address?.zipCode}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            color: "black",
                            mb: "10px",
                          }}
                        >
                          {dsearch.DiagnosisTestorServiceName}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.9rem", color: "blue", mb: "10px" }}
                        >
                          Distance: {dsearch.distance} miles
                        </Typography>
                      </Grid>
                      <Grid xs={4}>
                        <Grid
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            // padding: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "0.5rem",
                              padding: "0.5rem",
                              width: "100px",
                              fontSize: "0.8rem",
                              backgroundColor: "#1C3988",
                              color: "white",
                              // mb: "10px",
                              textAlign: "center",
                            }}
                          >
                            ${" "}
                            {
                              dsearch?.negotiatedRates?.negotiated_rates
                                ?.negotiated_prices.negotiated_rate
                            }
                          </Box>
                          <Typography
                            sx={{
                              fontSize: "10px",

                              // width: "100px",
                            }}
                          >
                            Negotiated price
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-end"
                        >
                          <Typography
                            sx={{
                              fontSize: "0.8rem",
                              color: "black",
                              mr: "60px",
                              mt: "30px",
                            }}
                          >
                            eCQMscore:
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "2rem",
                              color: "black",
                              mb: "15px",
                            }}
                          >
                            {dsearch.eCQMscore}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Collapse>
                 
                </>
              ))     :
              <Box sx={{display:"flex",justifyContent:'center',alignItems:"center",height:"10vh"}}><Typography>No results found</Typography></Box>
                                }
 
  {search.length!==0?

<>
<Grid container  sx={{ display: "flex", justifyContent: "center" }}>
<Typography sx={{padding:"10px"}} >
   Displaying items: {pagination.from}-{pagination.to}<span> </span>of<span> </span>{pagination.total}
    
</Typography>
         <Pagination
        
        
count={Math.ceil(search.length / itemsPerPage)}  
          page={page1}
          siblingCount={0}
          onChange={handleChangePage}
          defaultPage={1}
          color="primary"
          size="large"
          
          showFirstButton
          showLastButton
        />
          </Grid>
          </>  
         :null} 
           
            </Box> 
                   
       </>
        }
          </Form>
       
        )}
      </Formik>
    </Box>
  );
}
