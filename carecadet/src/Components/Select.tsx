import React from 'react'
import {Field, ErrorMessage} from 'formik'
import {TextField, FormControl, InputLabel, MenuItem, Select} from "@mui/material"
import ErrorProps from "./Errorprops"
interface props{
    selectData:selectprops[];
    name:string;
    label:string;
    sx?:any;
    container:any;
}

interface selectprops{
    value:string | number;
    item:string | number;
  
}

const SelectField= (props:props) => {
  return (
<FormControl sx={{ width: "100%" }}>
        <InputLabel sx={{letterSpacing:"0.2rem",fontSize:"0.8rem","&.MuiInputLabel-shrink": { letterSpacing:0 }}}>{props.label}</InputLabel>
        <Field as={props.container} name={props.name} label={props.label}    
         sx = {props.sx}
        inputProps={{
          sx: props.sx,
        }} 
         >
          {props.selectData.map((select, index) => (
            <MenuItem key={index + 1} value={select.value}>
              {select.item}
            </MenuItem>
          ))}
        </Field>
        <ErrorMessage name={props.name}>
          {(error) => (
            <ErrorProps >
                {error}
            </ErrorProps>
          )}
        </ErrorMessage>

     
      </FormControl>
  )}
export default SelectField