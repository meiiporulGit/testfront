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
  InputLabel,FormControl,
  Radio,
  RadioGroup,
  FormGroup,
  MenuItem,
  Menu,
  Paper,
  Grid,
  TextField,
  Select,
  Slider,
  Pagination,
  CircularProgress,
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
import {
  dataSearch,
  dataSearchTenMiles,
  dataSearchTwentyMiles,
  dataSearchThirtyMiles,
  dataQuery,
} from "../../Redux/ProviderRedux/HomeSlice";
import {
  ArrowDropDown,
  KeyboardArrowDown,
  KeyboardArrowUp

} from "@mui/icons-material";
import { values } from "lodash";
import SearchNav from "../../ProtectedRoutes/SearchNav";
import ClearIcon from '@mui/icons-material/Clear';

export default function ViewFacility() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [open3, setOpen3] = useState<boolean>(false);
  const [open4, setOpen4] = useState<boolean>(false);
  // const [checked, setChecked] = useState<boolean>(false);
 const [LoadingState ,setLoadingState] = useState<boolean>(true)
 const [LoadingSearch ,setLoadingSearch] = useState<boolean>(true)
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [distance, setDistance] = useState(30);
  const [facType, setFacType] = useState("");
  const [checkText, setCheckText] = useState<boolean>(false);
  const [checkFacText, setCheckFacText] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
 
  const [service, setService] = useState(false);
  const itemsPerPage = 5;
  
  const [search, setSearch] = useState<any>([]);
  const [page1, setPage1] = useState(1);
  const [noOfPages] = useState(Math.ceil(search.length / itemsPerPage));
  const [maxPrice, setMaxPrice] = useState<any>(100);
  const [minPrice, setMinPrice] = useState<any>(1);
  const [loading,setLoading] =useState<any>(false);

  const searchData = useAppSelector((state) => state.homeReducer.searchData);
  const QueryData=useAppSelector(state=>state.homeReducer.queryData)
  const [sort,setSort] =useState('');

  const [facilityType, setFacilityType] = useState<any>([]);
  const [facilityCheck, setFacilityCheck] = useState<any>("");
  const [value, setValue] = useState<number[]>([0, 0]);
  const [scoreValue, setScoreValue] = useState<number[]>([1, 5]);
  const [checkInfo, setCheckInfo] = useState<any>([])
  const OPTIONS_LIMIT = 10;
  const defaultFilterOptions = createFilterOptions();

   const filterOptions = (options: any, state: any) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  const [scoreType, setScoreType] = useState<any>("");
  const [qualityScoreCheck, setqualityScoreCheck] = useState<any>("");
  const dispatch = useAppDispatch();

  const[latitude,setLatitude] = useState<number>();
  const [longitude,setLongitude] = useState<any>();

  const q = QueryData.Service.trim()
  const locationQ = QueryData.Location.trim(); 
  console.log("scoreType",scoreType)
   

 function ratingHandleChange(event:any,value:any){

            setScoreType(event.target.value);}
            
         
         
  useEffect(() => {
   

    navigator.geolocation.getCurrentPosition((position) =>{
     setLatitude(position.coords.latitude);
     setLongitude(position.coords.longitude)
    })

console.log(latitude,'latitude');
console.log(longitude,'longitude');
        const postData = { q: q, location: locationQ };
    axiosPrivate
      .post(`/search`, postData)
      .then((res) => {
        setLoadingState(true)
        dispatch(dataSearch(res.data.data));
        setSearch(res.data.data);
        setLoadingState(false)


        const maxFilter = Math.max(
          ...res.data.data.map((fprice: any) => {
            if (fprice.priceType === "facilityPrice") {
              return fprice.FacilityPrices;
            } else {
              return fprice.cashPrice;
            }
          })
        );
        console.log(maxFilter, "....maxPrice");
        

        const minFilter = Math.min(
          ...res.data.data.map((fprice: any) => {
            if (fprice.priceType === "facilityPrice") {
              return fprice.FacilityPrices;
            } else {
              return fprice.cashPrice;
            }
          })
        );
        console.log(minFilter, "....minPrice");
        if(res.data.data.length!==0){
          setMaxPrice(maxFilter);
          setMinPrice(minFilter);
          setValue([minFilter, maxFilter]);
        }else{
          setMaxPrice(0);
          setMinPrice(0);
          setValue([0, 0]);
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
    getFacilityType();
  }, []);

  const handleSortChange = (event: any) => {
    setPage1(1)
    setSort(event.target.value);
  };

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
    
    const postData = { q: values.Service.trim(), location: values.Location.trim() };
    
    setLoading(true)
    axiosPrivate
      .post(`/search`, postData)
     
      .then((res) => {
       
        console.log(res.data);
        // setSearchqueryData(res.data.data)
        setCheckText(false);
        setCheckFacText(false);
        setPage1(1)
        setFacilityCheck("");
        setDistance(30);
        dispatch(dataSearch(res.data.data));
        
        
        setSearch(res.data.data);
        setLoading(false)
        dispatch(dataQuery(values))
        setSearchParams({ q: values.Service.trim(), location: values.Location.trim() });
        const maxFilter = Math.max(
          ...res.data.data.map((fprice: any) => {
            if (fprice.priceType === "facilityPrice") {
              return fprice.FacilityPrices;
            } else {
              return fprice.cashPrice;
            }
          })
        );
        console.log(maxFilter, "....maxPrice");
        

        const minFilter = Math.min(
          ...res.data.data.map((fprice: any) => {
            if (fprice.priceType === "facilityPrice") {
              return fprice.FacilityPrices;
            } else {
              return fprice.cashPrice;
            }
          })
        );
        console.log(minFilter, "....minPrice");
       
        if(res.data.data.length!==0){
          setMaxPrice(maxFilter);
          setMinPrice(minFilter);
          setValue([minFilter, maxFilter]);
        }else{
         
            setMaxPrice(0);
            setMinPrice(0);
            setValue([0, 0]);
       
        }
        // navigate("/patient/search");
        console.log("searchi", res);
      })
      .catch((err) => {
        toast.error(err.message);
setLoading(false) 

});
  };

  var pagination = {
    total:search.length,
    per_page:itemsPerPage,
    current_page:page1,
    last_page:Math.ceil(search.length / itemsPerPage),
    from: ((page1 -1) * itemsPerPage) + 1,
    to:page1*itemsPerPage<search.length ? page1*itemsPerPage : search.length
  }

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage1(value);
  };

 
  const filterFacilityType = (
    filter: any,
    dis?: any,
    type?: any,
    details?: any,
    range?: any,
    score?:any
  ) => {
    console.log(filter, dis, type, details, range,score, "axiosCheck");
 
    const noFacilityType = {
      q: details.Service,
      location: details.Location,
      distance: dis,
      
      ratingRange:score
    };
    const withFacilityType = {
      q: details.Service,
      location: details.Location,
      distance: dis,
      facilityType: type,
            ratingRange:score
    };
    const noFacAndDistance = { q: details.Service, location: details.Location };
    const noFacilityTypeAndRangeAndDistanceAndScore = {
      q: details.Service,
      location: details.Location,
      distance: dis,
      range: range,
      ratingRange:score
    };

    const withFacilityTypeAndDistanceAndRangeAndScore = {
      q: details.Service,
      location: details.Location,
      distance: dis,
      facilityType: type,
      range: range,
      ratingRange:score
    };

  

    switch (filter) {
     
      case "noFacilityType":
        return axiosPrivate.post(`/search`, noFacilityType);
      case "withFacilityType":
        return axiosPrivate.post(`/search`, withFacilityType);
      case "withFacilityTypeAndDistanceAndRangeAndScore":
        return axiosPrivate.post(`/search`, withFacilityTypeAndDistanceAndRangeAndScore);
      case "noFacilityTypeAndRangeAndDistanceAndScore":
        return axiosPrivate.post(`/search`,noFacilityTypeAndRangeAndDistanceAndScore);
        
      default:
        return axiosPrivate.post(`/search`, noFacAndDistance);
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
        value,
        scoreValue
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          setLoading(false)
     
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(maxFilter, "....maxPrice");

          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
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
        value,
        scoreValue
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          setLoading(false)
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(maxFilter, "....maxPrice");

          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
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
        "noFacilityTypeAndRangeAndDistanceAndScore",
        `${distance}mi`,
        facilityCheck,
        searchValues,
        newValue,
        scoreValue
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
        })
        .catch((e) => console.log(e));
    } else {
      filterFacilityType(
        "withFacilityTypeAndDistanceAndRangeAndScore",
        `${distance}mi`,
        facilityCheck,
        searchValues,
        newValue,
        scoreValue
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
        })
        .catch((e) => console.log(e));
    }
  }
  function sliderScoreChange(event: any, newValue: any, searchValues: any) {
    setService(true);
   
    console.log("newValue", newValue);
   

    if (facilityCheck === "") {
      filterFacilityType(
        "noFacilityType",
        `${distance}mi`,
        facilityCheck,
        searchValues,
        value,
        newValue
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(maxFilter, "....maxPrice");
          
  
          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(minFilter, "....minPrice");
          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(1);
          } else {
            setValue([minFilter, maxFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          }
        })
        .catch((e) => console.log(e));
    } else {
      filterFacilityType(
        "withFacilityType",
        `${distance}mi`,
        facilityCheck,
        searchValues,
        value,
        newValue
      )
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(maxFilter, "....maxPrice");

          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(minFilter, "....minPrice");
          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(1);
          } else {
            setValue([minFilter, maxFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          }
        })
        .catch((e) => console.log(e));
    }
  }
//   const pricesort=search.map((p:any)=> {
//     const price =[search.facilityPrice]
//     const cprice=[search.cashPrice]
//    price.push(search.cashPrice)
//     return price;
//     console.log(price, "price1")
//  })


//  function splitIntoSubArray(search:any, cashPrice:any) {
//    var newArray = [];
//    while (search.length > 0) {
//      newArray.push(search.splice(0, cashPrice)); 
//    }
//    return newArray;
//    console.log(newArray,"cash")
//  }
// // console.log(price, "price1")   

// function (){
  
// }
  function valuetext(userValue: number) {
    return `${userValue}$`;
  }

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
    
  ];

  const distanceSliderChange = (v: any, searchValue: any) => {
    setDistance(v);
    if (facilityCheck === "") {
      filterFacilityType("noFacilityType", `${v}mi`, facilityCheck, searchValue,value,scoreValue)
        .then((res) => {
         
          console.log(res.data.data, "checkDistance");
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );
          console.log(maxFilter, "....maxPrice");

          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
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
      filterFacilityType("withFacilityType", `${v}mi`, facilityCheck, searchValue,value,scoreValue)
        .then((res) => {
          // dispatch(dataSearch(res.data.data));
          setSearch(res.data.data);
          const maxFilter = Math.max(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );

          const minFilter = Math.min(
            ...res.data.data.map((fprice: any) => {
              if (fprice.priceType === "facilityPrice") {
                return fprice.FacilityPrices;
              } else {
                return fprice.cashPrice;
              }
            })
          );

          if (res.data.data.length === 0) {
            setValue([0, 0]);
            setMinPrice(0);
            setMaxPrice(1);
          } else {
            setValue([minFilter, maxFilter]);
            setMinPrice(minFilter);
            setMaxPrice(maxFilter);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  console.log(search, "searchcheck")

//   const sortprice = (
//    search.map((fprice: any) => {
//       return fprice.cashPrice || parseInt(fprice.FacilityPrices)
// setSearch(sortprice)

//     }
//     )
//   )
//   console.log("sortprice", sortprice)
// const asc =   [...sortprice].sort((a:any, b:any) => a - b);

// console.log("asc", asc)
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
            
            <Box 
            sx={{ display: "flex", justifyContent: "center"}}
            >
                     
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
                      setDistance(30);
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
                            setLoading(true);
                             
                            setDistance(sliderValue);
                           
                          }}
                          onChangeCommitted={(e, sliderValue) => {
                            
                            distanceSliderChange(sliderValue, values);
                            setLoading(false);      }}
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
                        onClick={() => setOpen2(!open2)}
                      >
                        {open2 ? (
                          <KeyboardArrowUp sx={{ color: "white" }} />
                        ) : (
                          <KeyboardArrowDown sx={{ color: "white" }} />
                        )}
                      </IconButton>
                      Quality Score
                    </Paper>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                      <Box sx={{ padding: "0 1rem" }}>
                       
                        <Slider
                          size="medium"
                          getAriaLabel={() => "Quality Score"}
                          value={scoreValue}
                          marks={[
                            { value: 1, label: 1 },
                            { value: 2, label: 2 },
                            { value: 3, label: 3 },
                            { value: 4, label: 4 },
                            { value: 5, label: 5 },
                          ]}
                          onChange={(e, sliderArray: any) => {
                            setScoreValue(sliderArray);
                            setLoading(true)
                          }}
                          onChangeCommitted={(event, v) =>{
                            sliderScoreChange(event, v, values)
                            setLoading(false)
                          }
                            
                          }
                          min={1}
                          max={5}
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
                      <Box>
                   {/* <RadioGroup sx={{display:"flex",flexDirection:"row"}}
                  value={scoreType}
                   onChange={ratingHandleChange}
                   >

      <FormControlLabel
        value="sortmax"
        control={<Radio 
          
          color="primary" />}
        label="Sort Max"
        labelPlacement="top"
        onClick={ ()=>setSearch( [...search].sort((a, b) => b.facilityDetails.rating - a.facilityDetails.rating))}          
      
      />
      <FormControlLabel
        value="sortmin"
        control={<Radio color="primary" />}
        label="Sort Min"
        labelPlacement="top"
        onClick={()=>setSearch([...search].sort((a, b) => a.facilityDetails.rating - b.facilityDetails.rating))}    
      />
    </RadioGroup>  */}
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
                        onClick={() => setOpen3(!open3)}
                      >
                        {open3 ? (
                          <KeyboardArrowUp sx={{ color: "white" }} />
                        ) : (
                          <KeyboardArrowDown sx={{ color: "white" }} />
                        )}
                      </IconButton>
                      Cash Rates
                    </Paper>
                    <Collapse in={open3} timeout="auto" unmountOnExit>
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
                            setLoading(true)
                             setValue(sliderArray);
                          }}
                          onChangeCommitted={(event, v) =>{
                            sliderChange(event, v, values)
                            setLoading(false)
                           } }
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
                        onClick={() => setOpen4(!open4)}
                      >
                        {open4 ? (
                          <KeyboardArrowUp sx={{ color: "white" }} />
                        ) : (
                          <KeyboardArrowDown sx={{ color: "white" }} />
                        )}
                      </IconButton>
                      Facility Type
                    </Paper>
                    <Collapse in={open4} timeout="auto" unmountOnExit>
                      <Grid item xs={12}>
                        <FormGroup
                    
                        >
                          
                          <RadioGroup name="length" value={facilityCheck}>
                         
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
                                      setLoading(true)
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

{/* mobile icons */}

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
                  > <MenuItem sx={{display:"flex",justifyContent:"right"}}>
                    
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
                                handleCloseNavMenu()
                              }}
                            />
                          </Box>
                        </Collapse>
                      </Box>
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
                          onClick={() => setOpen2(!open2)}
                        >
                          {open2 ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        
                        </IconButton>
                       Quality Score
                      
                       <Collapse in={open2} timeout="auto" unmountOnExit>
                       
                      <Box sx={{ padding: "0 1rem" }}>
                       
                        <Slider
                          size="medium"
                          getAriaLabel={() => "Quality Score"}
                          value={scoreValue}
                          marks={[
                            { value: 1, label: 1 },
                            { value: 2, label: 2 },
                            { value: 3, label: 3 },
                            { value: 4, label: 4 },
                            { value: 5, label: 5 },
                          ]}
                          onChange={(e, sliderArray: any) => {
                            setScoreValue(sliderArray);
                          }}
                          onChangeCommitted={(event, v) =>
                            sliderScoreChange(event, v, values)
                          }
                          min={1}
                          max={5}
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
                      <Box>
           <RadioGroup 
                  value={scoreType}
                   onChange={ratingHandleChange}>
                
      <FormControlLabel
        value="sortmax"
        control={<Radio color="primary" />}
        label="Sort Maximum"
        labelPlacement="top"
        onClick={()=>{[...search].sort((a:any,b:any)=>a.facilityDetails?.rating-b.facilityDetails?.rating)}}
       
      />
      <FormControlLabel
        value="sortmin"
        control={<Radio color="primary" />}
        label="Sort Minimum"
        labelPlacement="top"
        onClick={()=>{[...search].sort((a:any,b:any)=>b.facilityDetails?.rating-a.facilityDetails?.rating)}}
      />
    </RadioGroup>  
                      </Box>
                    </Collapse>
                      </Box>
                      
                    </MenuItem>

                    <MenuItem >
                    <Box sx={{display:'flex',flexDirection:"column"}}>
                      <Box sx={{display:'flex'}}>
                      <IconButton
                        sx={{ fontSize: "1rem" }}
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen3(!open3)}
                      >
                        {open3 ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                      <Typography 
                      // sx={{ fontSize: "1.25rem" }}
                      >Cash Rates</Typography>
                      
                      </Box>
                      <Collapse in={open3} timeout="auto" unmountOnExit>
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

                    <MenuItem sx={{ width: 250}}>
                      <Box>
                      
                        <IconButton
                          sx={{ fontSize: "1rem" }}
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpen4(!open4)}
                        >
                          {open4 ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                        Facility Type
                   
                        <Collapse in={open4} timeout="auto" unmountOnExit>
                      <Grid item xs={12}>
                        <FormGroup
                    
                        >
                          
                          <RadioGroup name="length" value={facilityCheck}>
                         
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
                    </MenuItem>
                  </Menu>
                  {/* <SearchNav/> */}
                </Box>
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
        

             <FormControl  sx={{ml:"42vw" , mb:"7vh", height:"3vh", width:"18vw"}} >
             <InputLabel   id="demo-simple-select-label">Sort by</InputLabel>
  <Select

  labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Sort by"
    onChange={handleSortChange}
  >


    <MenuItem value="ratinglowtohigh" onClick={ ()=>setSearch( [...search].sort((a, b) => b.facilityDetails.rating - a.facilityDetails.rating))}>Rating high to low</MenuItem>
    <MenuItem value="ratinghightolow" onClick={()=>setSearch([...search].sort((a, b) => a.facilityDetails.rating - b.facilityDetails.rating))} >Rating low to high</MenuItem>
    <MenuItem value="ratingnull" onClick={()=>setSearch(search.filter((a: any) => a.facilityDetails.rating === null))} >No Rating</MenuItem>
    <MenuItem value="pricehightolow" onClick={ ()=>setSearch([...search].sort((a,b)=>Math.round(b.price)-Math.round(a.price)))}>Price high to low</MenuItem>
    <MenuItem value="pricelowtohigh" onClick={()=>setSearch([...search].sort((a:any, b:any) =>Math.round(a.price)-Math.round(b.price)))} >Price lowtohigh</MenuItem>
     
     
      {/* // if (priceType === "facilityPrice") {
      //           return FacilityPrices;
      //         } else {
      //           return cashPrice;
      //         }
// console.log(a.FacilityPrices=== null ||a.FacilityPrices=== undefined ? Math.round(a.cashPrice) : Math.round(a.FacilityPrices) , b.FacilityPrices === null || b.FacilityPrices ===undefined? Math.round(b.cashPrice) : Math.round(b.FacilityPrices), "tttttttttttt")
// console.log(Math.round(a.FacilityPrices),Math.round(b.FacilityPrices),Math.round(a.cashPrice), Math.round(b.cashPrice),  "testtt")
      // return a.FacilityPrices=== null ||a.FacilityPrices=== undefined ? Math.round(a.cashPrice) : Math.round(a.FacilityPrices)- b.FacilityPrices === null || b.FacilityPrices ===undefined? Math.round(b.cashPrice) : Math.round(b.FacilityPrices)
            //  return Math.round(a.cashPrice)-Math.round(b.cashPrice) || Math.round(a.FacilityPrices)-Math.round(b.FacilityPrices)
            //  }
            //  ))}>Price high to low</MenuItem> */}
   
  </Select>
</FormControl>
           
              {search.length!==0?
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
                              {dsearch?.facilityDetails?.facilityName}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                color: "black",
                                mb: "20px",
                              }}
                            >
                              {dsearch.priceType === "facilityPrice"
                                ? dsearch.facilityDetails?.address
                                    ?.addressLine1 +
                                  "," +
                                  dsearch.facilityDetails?.address?.city +
                                  "," +
                                  dsearch.facilityDetails?.address?.state +
                                  " - " +
                                  dsearch.facilityDetails?.address?.zipCode
                                : dsearch.facilityDetails?.addressLine1 +
                                  "," +
                                  dsearch.facilityDetails?.city +
                                  "," +
                                  dsearch.facilityDetails?.state +
                                  " - " +
                                  dsearch.facilityDetails?.zipCode}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                color: "black",
                                mb: "10px",
                              }}
                            >
                              {dsearch.priceType === "facilityPrice"
                                ? dsearch.DiagnosisTestorServiceName
                                : dsearch.serviceName}
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
                                  padding: "0.8rem",
                                  // width: "100px",
                                  fontSize: "1.35rem",
                                  backgroundColor: "#1C3988",
                                  color: "white",
                                  mb: "10px",
                                  textAlign: "center",
                                }}
                              >
                                $
                                {dsearch.priceType === "facilityPrice"
                                  ? dsearch.FacilityPrices
                                  : dsearch.cashPrice.toFixed()} 
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: "15px",

                                  // width: "100px",
                                }}
                              >
                                {dsearch.priceType === "facilityPrice"
                                  ? "Average Price"
                                  : "Cash Price"}
                              </Typography>
                            </Grid>
                            <Grid
                              container
                              direction="row"
                              justifyContent="flex-end"
                              alignItems={"center"}
                              gap={"1rem"}
                            >
                              <Typography
                                sx={{
                                  fontSize: "1.25rem",
                                  color: "black",
                                  // mr: "60px",
                                }}
                              >
                                Rating :
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "1.5rem",
                                  color: "black",
                                  // mb: "15px",
                                }}
                              >
                                {dsearch?.facilityDetails?.rating === null?"N/A":dsearch?.facilityDetails?.rating
                                
                                }
                              </Typography>
                            </Grid>
                          </Grid>
                            
                        </Grid>
                      </Card>
                    </Paper>
                  </div>
                )):<Box sx={{display:"flex",justifyContent:'center',alignItems:"center",height:"10vh"}}><Typography>No results found</Typography></Box>}
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
             

             {/* mobilecard display */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "column",
              }}
            >
               {loading&&<LinearProgress/>}
              {search.length!==0?(itemsPerPage>0
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
                    {dsearch?.facilityDetails?.facilityName}
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
                                    {dsearch.priceType === "facilityPrice"
                                ? dsearch.facilityDetails?.address
                                    ?.addressLine1 +
                                  "," +
                                  dsearch.facilityDetails?.address?.city +
                                  "," +
                                  dsearch.facilityDetails?.address?.state +
                                  " - " +
                                  dsearch.facilityDetails?.address?.zipCode
                                : dsearch.facilityDetails?.addressLine1 +
                                  "," +
                                  dsearch.facilityDetails?.city +
                                  "," +
                                  dsearch.facilityDetails?.state +
                                  " - " +
                                  dsearch.facilityDetails?.zipCode}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            color: "black",
                            mb: "10px",
                          }}
                        >
                          {dsearch.priceType === "facilityPrice"
                                ? dsearch.DiagnosisTestorServiceName
                                : dsearch.serviceName}
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
                            $ {dsearch.priceType === "facilityPrice"
                                  ? dsearch.FacilityPrices
                                  : dsearch.cashPrice}
                          </Box>
                          <Typography
                            sx={{
                              fontSize: "10px",

                              // width: "100px",
                            }}
                          >
                           {dsearch.priceType === "facilityPrice"
                                  ? "Average Price"
                                  : "Cash Price"}
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-end"
                          alignItems={"center"}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.8rem",
                              color: "black",
                              // mr: "60px",
                              // mt: "30px",
                            }}
                          >
                            Rating :
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "black",
                              // mb: "15px",
                            }}
                          >
                            {dsearch?.facilityDetails?.rating === null?"N/A":dsearch?.facilityDetails?.rating
                                
                              }
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Collapse>
                </>
              )):<Box sx={{display:"flex",justifyContent:'center',alignItems:"center",height:"10vh"}}><Typography>No results found</Typography></Box>}
           
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
                // defaultPage=2
                color="primary"
                size="large"
                
                showFirstButton
                showLastButton
              />
                </Grid>
                </>  
         
            </Box>
            </>     
}     
    
</Form>
                       

  )}
      </Formik>
    </Box>
  );

}
